// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./css/App1.css";
export default function Userhomepage() {
  const [userget,setUserGet] = useState()
  const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
  console.log("User page ",userget);
  useEffect(() => {
    setUserGet(loggedInUserP);
  }, []);
  return (
    <>
      <div className="bg" style={{height:"500px"}}>
        {userget ? (
          <div className="bg">
            <p>
              Welcome, {userget.user_name} ({userget.status})
            </p>
            <p>Gender: {userget.gender}</p>
            <p>Email: {userget.gmail}</p>
            <p>Year: {userget.year}</p>
            <p>Status: {userget.status}</p>
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
