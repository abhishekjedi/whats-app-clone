import React from "react";
import SidebarHeader from "./SidebarHeader";
import "./Sidebar.scss";
import SidebarSearch from "./SidebarSearch";
import AddNewGroup from "./AddNewGroup";
import ChatGroups from "./ChatGroups";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";

export const Sidebar: React.FC<{ signOut: () => void }> = ({ signOut }) => {
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
    const getDataFromFirebase = async () => {
      const collectionRef = collection(db, "user");
      const docData = await getDocs(collectionRef);
      const dataArray: user[] = [];
      // onSnapshot(collectionRef, (docs) => {
      //   docs.forEach((doc) => {
      //     if (doc.data().email !== currentUser.email) {
      //       const user1: user = {
      //         fullName: doc.data().fullName,
      //         email: doc.data().email,
      //         photoURL: doc.data().photoURL,
      //       };
      //       dataArray.push(user1);
      //     }
      //   });
      // });
      docData.forEach((doc) => {
        if (doc.data().email !== currentUser.email) {
          const user1: user = {
            fullName: doc.data().fullName,
            email: doc.data().email,
            photoURL: doc.data().photoURL,
          };
          dataArray.push(user1);
        }
      });
      setAllUsers(dataArray);
      console.log(allUsers);
      const collectionRef2 = collection(db, "friendlist");
      const docRef = doc(collectionRef2, currentUser.email);
      const collectionRef3 = collection(docRef, "list");
      const friendData = await getDocs(collectionRef3);
      const dataArray2: friend[] = [];

      //  onSnapshot(collectionRef3, (docs) => {
      //   docs.forEach((doc) => {
      //     const friend: friend = {
      //       fullName: doc.data().fullName,
      //       email: doc.data().email,
      //       photoURL: doc.data().photoURL,
      //       message: doc.data().message,
      //     };
      //     dataArray2.push(friend);
      //   });
      // });

      friendData.forEach((doc) => {
        const friend: friend = {
          fullName: doc.data().fullName,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          message: doc.data().message,
        };
        dataArray2.push(friend);
      });

      setFriendList(dataArray2);
    };
    getDataFromFirebase();
  }, []);
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
