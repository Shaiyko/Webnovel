import { Navigate } from "react-router-dom";

//ມັນແດງປົກກະຕິ
// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ element, path }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    return <Navigate to="/login" />;
  } else if (path === "/admin" && loggedInUser.status !== "admin") {
    return <Navigate to="/" />;
  } else if (path === "/user" && loggedInUser.status !== "user") {
    return <Navigate to="/" />;
  } else if (path === "/writer" && loggedInUser.statuse !== "writer") {
    return <Navigate to="/" />;
  } else if (
    path === "/profile" &&
    loggedInUser.statuse !== "writer" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return <Navigate to="/" />;
  }else if (
    path === "/my-bookshelf" &&
    loggedInUser.statuse !== "writer" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return <Navigate to="/" />;
  }else if (
    path === "/suggestions" &&
    loggedInUser.statuse !== "writer" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return <Navigate to="/" />;
  } else {
    return element;
  }
}
