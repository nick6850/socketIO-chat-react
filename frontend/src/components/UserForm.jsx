import React, { useState } from "react";

function UserForm({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username && room) {
      setIsLoggedIn(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Your username:</label>
      <input
        type="text"
        id="username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="room">Room you want to join:</label>
      <input
        type="text"
        id="room"
        required
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button>Join the room</button>
    </form>
  );
}

export default UserForm;
