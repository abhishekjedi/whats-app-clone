import React from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.scss";
import { collection, setDoc, doc } from "firebase/firestore";
const Login: React.FC<{
  setUser: (value: {
    fullName: string | null;
    email: string | null;
    photoURL: string | null;
  }) => void;
}> = ({ setUser }) => {
  const SignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const newUser1 = {
      fullName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    };
    localStorage.setItem("user", JSON.stringify(newUser1));
    setUser(newUser1);
    const userRef = collection(db, "user");
    await setDoc(doc(userRef, newUser1.email!), newUser1);
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png"
          alt=""
        />
        <p className="login-name">WhatsApp Web</p>
        <button className="login-btn" onClick={SignInWithGoogle}>
          <img
            src="https://w7.pngwing.com/pngs/8/502/png-transparent-google-logo-google-logo-google-now-google-search-google-plus-search-engine-optimization-trademark-logo.png"
            alt="login with google"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
