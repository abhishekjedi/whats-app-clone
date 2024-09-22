import { AuthContextType, AuthManagerProps, User } from "./auth.manager.types";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../Firebase";
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const dummyUser = {
          fullName: user?.displayName || "",
          email: user?.email || "",
          photoURL: user?.photoURL || "",
        };
        setUser(dummyUser);
      }
    });
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
  };

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthManager;
