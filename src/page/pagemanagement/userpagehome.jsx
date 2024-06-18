// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./css/App1.css";
import axios from "axios";

export default function Userhomepage() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const storeUserpageInLocalStorage = (userP) => {
    try {
      localStorage.setItem("userP", JSON.stringify(userP));
      console.log("userP stored in localStorage:", userP);
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    axios
      .get("https://dex-api-novel.onrender.com/view/user/" + loggedInUser.id)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          storeUserpageInLocalStorage(data[0]);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => console.log("error", error));
  };
  console.log("data", loggedInUserP);

  return (
    <>
      <div className="bg">
        {loggedInUserP ? (
          <div className="bg">
            <p>
              Welcome, {loggedInUserP.user_name} ({loggedInUserP.status})
            </p>
            <p>Gender: {loggedInUserP.gender}</p>
            <p>Email: {loggedInUserP.gmail}</p>
            <p>Year: {loggedInUserP.year}</p>
            <p>Status: {loggedInUserP.status}</p>
            <p>
              Avatar: <img src={loggedInUserP.avatar} alt="Avatar" />
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}
