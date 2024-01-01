import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import Chat from "./components/Chat";
import { socket } from "./socket";

function App() {
  const [allMessages, setAllMessages] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: "", room: "" });

  function handleUserData(e) {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  useEffect(() => {
    if (isLoggedIn) {
      socket.connect();
      socket.emit("joinRoom", userData);
    }

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn]);

  useEffect(() => {
    socket.on("newMessage", (newMsg) => {
      setAllMessages((prevMsgs) => [...prevMsgs, newMsg]);
    });
  }, []);

  function sendMessage(message) {
    socket.emit("sendMessage", { message, ...userData });
  }

  if (!isLoggedIn) {
    return (
      <UserForm
        setIsLoggedIn={setIsLoggedIn}
        userData={userData}
        handleUserData={handleUserData}
      />
    );
  }

  return <Chat sendMessage={sendMessage} allMessages={allMessages} />;
}

export default App;
