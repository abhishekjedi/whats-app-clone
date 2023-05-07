import React from "react";
import SidebarHeader from "./SidebarHeader";
import "./Sidebar.scss";
import SidebarSearch from "./SidebarSearch";
import ChatGroups from "./ChatGroups";
import { collection, getDocs, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Sidebar: React.FC<{ signOut: () => void }> = ({ signOut }) => {
  const reload = useSelector<RootState>((state) => state.reload.reload);
  const [searchedUser, setSearchedUser] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  interface user {
    fullName: string;
    email: string;
    photoURL: string;
  }
  interface friend {
    fullName: string;
    email: string;
    photoURL: string;
    message: string;
  }
  const [allUsers, setAllUsers] = useState<user[]>([]);
  const [friendList, setFriendList] = useState<friend[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const collectionRef = collection(db, "user");
      const dataArray: user[] = [];
      const docSnap = await getDocs(collectionRef);
      docSnap.forEach((doc) => {
        if (doc.data().email !== currentUser.email) {
          const tempUser: user = {
            fullName: doc.data().fullName,
            email: doc.data().email,
            photoURL: doc.data().photoURL,
          };
          dataArray.push(tempUser);
        }
      });
      setAllUsers(dataArray);
    };
    const getAllfriends = async () => {
      const collectionRef2 = collection(db, "friendlist");
      const docRef = doc(collectionRef2, currentUser.email);
      const collectionRef3 = collection(docRef, "list");
      const dataArray2: friend[] = [];

      const docSnap = await getDocs(collectionRef3);
      docSnap.forEach((doc) => {
        const tempFriend: friend = {
          fullName: doc.data().fullName,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          message: doc.data().message,
        };
        dataArray2.push(tempFriend);
      });
      setFriendList(dataArray2);
    };
    getAllUsers();
    getAllfriends();
  }, [reload]);
  return (
    <div className="Sidebar">
      <SidebarHeader signOut={signOut} />
      <SidebarSearch
        onSearch={(value: string) => {
          setSearchedUser(value);
        }}
      />
      {allUsers.length > 0 &&
        searchedUser !== "" &&
        allUsers
          .filter((userInfo) => {
            if (
              userInfo.fullName
                .toLowerCase()
                .includes(searchedUser.toLowerCase())
            ) {
              return userInfo;
            }
          })
          .map((userInfo) => {
            return (
              <ChatGroups
                groupName={userInfo.fullName}
                lastmessage=""
                photoURL={userInfo.photoURL}
                email={userInfo.email}
              />
            );
          })}
      {friendList.length > 0 &&
        searchedUser === "" &&
        friendList.map((userInfo) => {
          return (
            <ChatGroups
              key={Math.random().toString()}
              groupName={userInfo.fullName}
              lastmessage={userInfo.message}
              photoURL={userInfo.photoURL}
              email={userInfo.email}
            />
          );
        })}
    </div>
  );
};
export default Sidebar;
