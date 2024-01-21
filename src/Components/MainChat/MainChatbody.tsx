import { useState, useRef } from "react";
import "./MainChatbody.scss";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
const MainChatbody = () => {
  interface messageStructure {
    senderEmail: string;
    recieverEmail: string;
    message: string;
    time: string | null;
  }
  const [messages, setMessages] = useState<messageStructure[]>();

  const parms = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "");
  useEffect(() => {
    const getAllMessages = async () => {
      const colRef = collection(db, "chats");
      const docRef = doc(colRef, parms.emailId);
      const colRef2 = collection(docRef, "messages");
      const q = query(colRef2, orderBy("timeStamp", "asc"));

      onSnapshot(q, (doc) => {
        const dummyMessages1: messageStructure[] = [];
        doc.forEach((ele) => {
          const tempData = ele.data();
          if (
            (tempData.timeStamp &&
              tempData.senderEmail === loggedInUser.email) ||
            tempData.recieverEmail === loggedInUser.email
          ) {
            const tempEle: messageStructure = {
              senderEmail: tempData.senderEmail,
              recieverEmail: tempData.recieverEmail,
              message: tempData.message,
              time: tempData.timeStamp
                ?.toDate()
                ?.toLocaleTimeString([], { timeStyle: "short" }),
              // ?.match(/\d{2}:\d{2}|[AMP]+/g)
              // ?.join(" "),
            };
            dummyMessages1.push(tempEle);
          }
        });
        setMessages(dummyMessages1);
      });
    };

    getAllMessages();
  }, [loggedInUser.email, parms.emailId]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="main-chat-body">
      {messages &&
        messages.length > 0 &&
        messages.map((ele) => {
          return (
            <div
              key={Math.random()}
              className="messages-div"
              style={{
                flexDirection:
                  ele.senderEmail === loggedInUser.email
                    ? "row-reverse"
                    : "row",
              }}
            >
              <div
                className="messages"
                style={{
                  backgroundColor:
                    ele.senderEmail == loggedInUser.email
                      ? "#343a40"
                      : "#443f8f",
                }}
              >
                <p className="message">
                  {ele.message}
                  <span className={"time-span"}>{ele.time}</span>
                </p>
              </div>
            </div>
          );
        })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MainChatbody;
