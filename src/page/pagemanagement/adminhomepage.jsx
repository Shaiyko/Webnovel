import axios from "axios";
import { useEffect } from "react";

export default function Adminhomepage() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const storeAdminInLocalStorage = (admin) => {
    try {
      localStorage.setItem("admin", JSON.stringify(admin));
      console.log("Admin stored in localStorage:", admin);
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  useEffect(() => {
    adminGet();
  }, []);

  const adminGet = () => {
    axios
      .get("https://dex-api-novel.onrender.com/view/admin/" + loggedInUser.id)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          
        storeAdminInLocalStorage(data[0]);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => console.log("error", error));
      
  };
  const loggedInAdmin = JSON.parse(localStorage.getItem("admin"));

  console.log("admin page ",loggedInAdmin);
  return (
    <>
      <div className="bg">
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
