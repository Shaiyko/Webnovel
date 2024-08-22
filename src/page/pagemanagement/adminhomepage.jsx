// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Adminhomepage() {
  
  const loggedInAdmin = JSON.parse(localStorage.getItem("admin"));

  console.log("admin page ",loggedInAdmin);
  return (
    <>
      <div className="bg" style={{height:"500px"}}>
        {loggedInAdmin ? (
          <div className="bg">
            <p>
              Welcome, {loggedInAdmin.user_name} ({loggedInAdmin.status})
            </p>
            <p>Gender: {loggedInAdmin.gender}</p>
            <p>Email: {loggedInAdmin.gmail}</p>
            <p>Year: {loggedInAdmin.date_of_birth}</p>
            <p>Status: {loggedInAdmin.status}</p>
            <p>
              Avatar: <img src={loggedInAdmin.avatar} alt="Avatar" />
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}
