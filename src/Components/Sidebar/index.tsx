import React, { useContext, useMemo } from "react";
import SidebarHeader from "./SidebarHeader";
import "./style.scss";
import SidebarSearch from "./SidebarSearch";
import ChatGroups from "./ChatGroups";
import { useState, useEffect } from "react";
import { AuthContext } from "../../Context/auth";
import { Friend, User } from "../../Context/auth/auth.manager.types";
import { getItems } from "../../Firebase/Firestore.service";
import useFirestoreCollection from "../../hooks/useFirestore";

export const Sidebar: React.FC<{
  signOut: () => void;
}> = ({ signOut }) => {
  const { user } = useContext(AuthContext);
  const [searchedUser, setSearchedUser] = useState("");
  const currentUser = user;
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // const [friendList, setFriendList] = useState<Friend[]>([]);

  const friendCollectionRef: [string, ...string[]] = useMemo(
    () => ["friendlist", `${currentUser?.email}`, "list"],
    [currentUser?.email]
  );

  const { data: friendList } =
    useFirestoreCollection<Friend>(friendCollectionRef);

  console.log(friendList);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getItems<User>(["user"]);
      setAllUsers(users);
    };

    // const getAllFriends = async () => {
    //   const friends = await getItems<Friend>([
    //     "friendlist",
    //     `${currentUser?.email}`,
    //     "list",
    //   ]);

    //   setFriendList(friends);
    // };

    getAllUsers();
    // getAllFriends();
  }, [currentUser?.email]);

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
              return true;
            } else {
              return false;
            }
          })
          .map((userInfo) => {
            return (
              <ChatGroups
                groupName={userInfo.fullName}
                lastmessage=""
                photoURL={userInfo.photoURL}
                email={userInfo.email}
                time=""
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
              time={userInfo.timeStamp?.toDate()?.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            />
          );
        })}
    </div>
  );
};
export default Sidebar;
