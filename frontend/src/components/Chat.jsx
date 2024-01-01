import React, { useState } from "react";

function Chat({ sendMessage, allMessages }) {
  const [userMessage, setUserMessage] = useState("");

  return (
    <div className="chat">
      <div className="messages">
        {allMessages.map((message) => {
          return (
            <div>
              <span>{message.username}: </span>
              <span>{message.message}</span>
            </div>
          );
        })}
      </div>
      <div className="sendMessage" value={userMessage}>
        <input
          type="text"
          required
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button type="button" onClick={() => sendMessage(userMessage)}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
