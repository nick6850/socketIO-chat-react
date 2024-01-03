import React, { useState } from "react";

function UserForm({ setIsLoggedIn, userData, handleUserData }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (userData.username && userData.room) {
      setIsLoggedIn(true);
    }
  }

  return (
    <form className="userForm" onSubmit={handleSubmit}>
      <label htmlFor="username">Your username:</label>
      <input
        type="text"
        id="username"
        required
        value={userData.username}
        onChange={handleUserData}
      />
      <label htmlFor="room">Room you want to join:</label>
      <input
        type="text"
        id="room"
        required
        value={userData.room}
        onChange={handleUserData}
      />
      <button>Join the room</button>
    </form>
  );
}

export default UserForm;
