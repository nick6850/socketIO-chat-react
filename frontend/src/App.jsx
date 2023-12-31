import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import Chat from "./components/Chat";
import { socket } from "./socket";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("connecting");
      socket.connect();
      console.log("Socket connected!");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <UserForm setIsLoggedIn={setIsLoggedIn} />;
  }

  return <Chat />;
}

export default App;
