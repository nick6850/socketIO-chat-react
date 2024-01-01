import React, { useState } from "react";

function Chat({ sendMessage, allMessages, handleTyping, typingData }) {
  const [userMessage, setUserMessage] = useState("");

  return (
    <div className="chat">
      <div className="messages">
        {allMessages.map((message, index) => {
          return (
            <div key={message + index}>
              <span className="username">{message.username}: </span>
              <span className="message">{message.message}</span>
            </div>
          );
        })}
        <div>{typingData}</div>
      </div>
      <div className="sendMessage" value={userMessage}>
        <input
          type="text"
          required
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button type="button" onClick={() => sendMessage(userMessage)}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
