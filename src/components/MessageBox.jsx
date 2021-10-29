import React, { useRef, useEffect } from "react";
import Message from "./Message";

const MessageBox = ({ messages }) => {
  const endDiv = useRef(null);
  useEffect(() => {
    endDiv.current.scrollIntoView();
  });
  return (
    <div className="chats">
      {messages
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((message) => {
          return <Message message={message} key={message.id} />;
        })}
      <div style={{ float: "right", clear: "both" }} ref={endDiv}></div>
    </div>
  );
};

export default MessageBox;
