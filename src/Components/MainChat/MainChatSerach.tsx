import React from "react";
import "./MainChatSearch.scss";
import { EmojiEmotionsOutlined } from "@mui/icons-material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
const MainChatSerach: React.FC<{
  onSend: (value: string) => void;
}> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [isShown, setIsShown] = useState(false);
  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (message === "") return;
    onSend(message);
    setMessage("");
  };
  return (
    <form className="main-chat-search" onSubmit={submitHandler}>
      <EmojiEmotionsOutlined
        onClick={() => {
          setIsShown((prev) => !prev);
        }}
      />
      {isShown && (
        <div className="emoji-picker">
          <EmojiPicker
            onEmojiClick={(emojiData: EmojiClickData, event: MouseEvent) => {
              setMessage((prev) => prev + emojiData.emoji);
            }}
          />
        </div>
      )}
      <input
        type="text"
        placeholder="Message"
        className="main-chat-search__input"
        value={message}
        onChange={inputChangeHandler}
      />
      <button className="main-chat-search__btn">Submit</button>
      <div>
        <MicNoneIcon />
      </div>
    </form>
  );
};

export default MainChatSerach;
