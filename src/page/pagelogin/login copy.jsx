// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./style/css_login.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
export default function LoginRegister() {
  const [isLoginActive, setIsLoginActive] = useState(location.state?.isLoginActive || true);

  const handleOpen = () => setIsLoginActive(true);
  const handleClose = () => setIsLoginActive(false);
  const [username, handleLoginChangeuser] = useState("");
  const [password, handleLoginChangepass] = useState("");
  const [registeruser, handleRegisterChangeUser] = useState("");
  const [registerpass, handleRegisterChangePass] = useState("");
  const [registeremail, handleRegisterChangeEmail] = useState("");
  const statusem = "user";
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  // ฟังก์ชันการเก็บข้อมูลใน Local Storage
  const storeUserInLocalStorage = (user) => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User stored in localStorage:", user);
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  // ฟังก์ชันการเข้าสู่ระบบ
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .get("https://dex-api-novel.onrender.com/login")
      .then((response) => {
        const loggedInUser = response.data.find(
          (user) => user.user_name === username && user.password === password
        );

        if (loggedInUser) {
          setUser(loggedInUser);
          console.log("Logged in as:", loggedInUser.status);
          storeUserInLocalStorage(loggedInUser); // เรียกใช้ฟังก์ชันที่นี่

          if (loggedInUser.status === "admin") {
            navigate("/admin");
          } else if (loggedInUser.status === "user") {
            navigate("/user");
          } else {
            navigate("/");
          }
        } else {
          console.log("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed");
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://api.sheety.co/45e1622fdf6106e2755e21800d53f542/em/employee",
        {
          employee: {
            username: registeruser,
            email: registeremail,
            password: registerpass,
            statusem: statusem,
          },
        }
      )
      .then((response) => {
        console.log("Register succeeded", response.data);
        alert("Register succeeded");
      })
      .catch((error) => {
        console.error("Error registering:", error);
        alert("Failed to register");
      });
  };
  //ຖ້າລອກອີນຢູ່ແລ້ວມັນຈະປັບໄປຫນ້າລົງທະບຽນ ແຕ່ຖ້າບັງຄັບໄປໜເາລອກອີນມິນຈະຂື້ນ alert
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (loggedInUser && isLoginActive === true) {
    Swal.fire({
      icon: "info",
      title: "Something went wrong?",
      text: "Your friend should logout first!",
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      } else {
        navigate("/");
      }
    });
  }
  return (
    <section className="forms-section">
      <h1 className="section-title">Form Login</h1>
      <div className="forms">
        <div className={`form-wrapper ${isLoginActive ? "is-active" : ""}`}>
          <button
            type="button"
            className="switcher switcher-login"
            onClick={handleOpen}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login" onSubmit={handleLoginSubmit}>
            <fieldset>
              <legend>Please, enter your User and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">User</label>
                <input
                  onChange={(e) => handleLoginChangeuser(e.target.value)}
                  id="login-email"
                  type="text"
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  data-type="password"
                  onChange={(e) => handleLoginChangepass(e.target.value)}
                  type="password"
                  required
                />
              </div>
            </fieldset>
            <Button type="submit" className="btn-login">
              Login
            </Button>
          </form>
        </div>
        <div className={`form-wrapper ${!isLoginActive ? "is-active" : ""}`}>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={handleClose}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form className="form form-signup" onSubmit={handleRegisterSubmit}>
            <fieldset>
              <legend>
                Please, enter your User, password and password confirmation for
                sign up.
              </legend>
              <div className="input-block">
                <label htmlFor="signup-email">User</label>
                <input
                  id="signup-email"
                  type="text"
                  required
                  onChange={(e) => handleRegisterChangeUser(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  data-type="password"
                  onChange={(e) => handleRegisterChangePass(e.target.value)}
                  type="password"
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">Email</label>
                <input
                  id="signup-email"
                  onChange={(e) => handleRegisterChangeEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>
            </fieldset>
            <Button type="submit" className="btn-signup">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
