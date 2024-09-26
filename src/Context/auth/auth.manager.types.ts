import { Timestamp } from "firebase/firestore";

export type AuthManagerProps = {
  children: React.ReactNode;
};

export type User = {
  fullName: string;
  email: string;
  photoURL: string;
};

export type AuthContextType = {
  user: User | null;
  login: () => void;
  logOut: () => void;
};

export type Friend = {
  fullName: string;
  email: string;
  photoURL: string;
  message: string;
  timeStamp: Timestamp;
};
