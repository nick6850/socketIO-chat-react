import React, { useEffect, useState, useRef } from "react";
import UserForm from "./components/UserForm";
import Chat from "./components/Chat";
import { socket } from "./socket";

function App() {
  const [allMessages, setAllMessages] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    room: "",
    userID: "",
  });
  const [typingData, setTypingData] = useState("");

  function handleUserData(e) {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleTyping() {
    socket.emit("userTyping", userData);
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

    socket.on("setTyping", (data) => {
      setTypingData(data);
    });

    socket.on("setID", (userID) => {
      setUserData((prev) => ({ ...prev, userID }));
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

  return (
    <Chat
      sendMessage={sendMessage}
      allMessages={allMessages}
      typingData={typingData}
      handleTyping={handleTyping}
      userID={userData.userID}
    />
  );
}

export default App;
