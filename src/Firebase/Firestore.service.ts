import { db as firestore } from "./index";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const addItem = <T extends { [key: string]: any }>(
  collectionName: [string, ...string[]],
  data: T
) => {
  const colRef = collection(firestore, ...collectionName);
  return addDoc(colRef, data);
};

export const getItems = async <T extends { [key: string]: any }>(
  collectionName: [string, ...string[]]
) => {
  const colRef = collection(firestore, ...collectionName);
  const docSnap = await getDocs(colRef);
  const docData = docSnap.docs.map((doc) => doc.data() as T);
  return docData;
};

export const getItem = async <T extends { [key: string]: any }>(
  collectionName: [string, ...string[]]
) => {
  const colRef = doc(firestore, ...collectionName);
  const data = await getDoc(colRef);
  return data.data() as T;
};

export const setItem = <T extends { [key: string]: any }>(
  collectionName: [string, ...string[]],
  docId: string,
  data: T
) => {
  const docRef = doc(firestore, ...collectionName, docId);
  return setDoc(docRef, data);
};

export const deleteItem = (
  collectionName: [string, ...string[]],
  docId: string
) => {
  const docRef = doc(firestore, ...collectionName, docId);
  return deleteDoc(docRef);
};

export const listenToCollection = <T>(
  collectionName: [string, ...string[]],
  callback: (data: Array<T & { id: string }>) => void,
  errorCallback?: (error: Error) => void
) => {
  const colRef = collection(firestore, ...collectionName);
  return onSnapshot(
    colRef,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const items: Array<T & { id: string }> = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      }));
      callback(items);
    },
    errorCallback
  );
};
