import { useRef, useContext, useMemo } from "react";
import "./style.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/auth";
import { messageStructure } from "./ChatBody.types";
import useFirestoreCollection from "../../../hooks/useFirestore";
const Chatbody = () => {
  const { user: loggedInUser } = useContext(AuthContext);

  const parms = useParams();

  const collectionKeys: [string, ...string[]] = useMemo(
    () => ["chats", parms.emailId || "", "messages"],
    [parms.emailId]
  );

  const { data: messages } =
    useFirestoreCollection<messageStructure>(collectionKeys);
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
                  ele.senderEmail === loggedInUser?.email
                    ? "row-reverse"
                    : "row",
              }}
            >
              <div
                className="messages"
                style={{
                  backgroundColor:
                    ele.senderEmail === loggedInUser?.email
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

export default Chatbody;
