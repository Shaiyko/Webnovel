
import "./style/App.css";

export default function Home() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  let userData = null;

  if (loggedInUser && loggedInUser.status === "user") {
    userData = JSON.parse(localStorage.getItem("userP"));
  } else if (loggedInUser && loggedInUser.status === "admin") {
    userData = JSON.parse(localStorage.getItem("admin"));
  }


  console.log("data", userData);

  return (
    <>
      <div className="bg">
        {userData ? (
          <div className="bg">
            <p>
              Welcome, {userData.user_name} ({userData.status})
            </p>
            <p>Gender: {userData.gender}</p>
            <p>Email: {userData.gmail}</p>
            <p>Year: {userData.date_of_birth}</p>
            <p>Status: {userData.status}</p>
            <p>
              Avatar: <img src={userData.avatar} alt="Avatar" />
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}
