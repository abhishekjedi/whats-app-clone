import { AuthContextType, AuthManagerProps, User } from "./auth.manager.types";
import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../helpers/Firebase";
import { useState, createContext, useEffect } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import CONSTANTS from "../../Constants/constants";

const dummyContextValues: AuthContextType = {
  user: null,
  login: () => {},
  logOut: () => {},
};

export const AuthContext = createContext(dummyContextValues);

const AuthManager = ({ children }: AuthManagerProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);

  const login = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user: User = {
      fullName: result?.user?.displayName || "",
      email: result?.user?.email || "",
      photoURL: result?.user?.photoURL || "",
    };
    setUser(user);
    const userRef = collection(db, CONSTANTS.COLLECTION_NAMES.USER);
    await setDoc(doc(userRef, user.email), user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .then(() => localStorage.removeItem("user"))
      .catch((err) => alert(err.message));
  };

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthManager;
