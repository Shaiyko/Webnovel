// eslint-disable-next-line no-unused-vars
import { Button } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react"; 

function Logoutpage() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้ใน localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("userP");
    localStorage.removeItem("author");
    // ส่งผู้ใช้กลับไปยังหน้าล็อกอิน
    window.location.href = "/login";
  };
  if (!loggedInUser) {
    return (
      <Button
        onClick={handleLogout}
        style={{ backgroundColor: "blue", width: 100, color: "white" }}
      >
        Login
      </Button>
    );
  } else if (loggedInUser) {
    return (
      <>
        
        <Button
          onClick={handleLogout}
          style={{ backgroundColor: "red", width: 100, color: "white" }}
        >
          Loguot
        </Button>
      </>
    );
  }
}

export default Logoutpage;
