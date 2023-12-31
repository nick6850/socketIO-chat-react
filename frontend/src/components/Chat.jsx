import React, { useState } from "react";

function Chat() {
  const [userMessage, setUserMessage] = useState("");

  return (
    <div className="chat">
      <div className="messages"></div>
      <div
        className="sendMessage"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      >
        <input type="text" required />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Chat;
