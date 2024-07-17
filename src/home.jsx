
import { useEffect } from "react";
import Pagenovel from "./page/pagenovel/novelhome";
import "./style/App.css";

export default function Home() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  let userData = null;

  if (loggedInUser && loggedInUser.status === "user") {
    userData = JSON.parse(localStorage.getItem("userP"));
  } else if (loggedInUser && loggedInUser.status === "admin") {
    userData = JSON.parse(localStorage.getItem("admin"));
  } else if (loggedInUser && loggedInUser.status === "author") {
    userData = JSON.parse(localStorage.getItem("author"));
  }


  console.log("data", userData);

  return (
    <>
      <Pagenovel/>
    </>
  );
}
