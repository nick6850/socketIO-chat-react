import React, { useState } from "react";

function Chat({ sendMessage, allMessages, handleTyping, typingData, userID }) {
  const [userMessage, setUserMessage] = useState("");

  return (
    <div className="chat">
      <div className="messages">
        {allMessages.map((message, index) => {
          return (
            <div
              className={message.userID === userID ? "sent" : "received"}
              key={message + index}
            >
              <span className="username">{message.username}: </span>
              <span className="message">{message.message}</span>
            </div>
          );
        })}
      </div>
      <div>{typingData}</div>
      <div className="sendMessage" value={userMessage}>
        <input
          type="text"
          required
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button
          type="button"
          onClick={() => {
            sendMessage(userMessage);
            setUserMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
