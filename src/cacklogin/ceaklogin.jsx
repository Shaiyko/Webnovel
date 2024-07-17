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
  } else if (path === "/author" && loggedInUser.statuse !== "author") {
    return <Navigate to="/" />;
  } else if (
    path === "/profile" &&
    loggedInUser.statuse !== "author" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return <Navigate to="/" />;
  } else if (path === "/manage/ttag" && loggedInUser.status !== "admin") {
    return <Navigate to="/" />;
  } else if (path === "/manage/ttype" && loggedInUser.status !== "admin") {
    return <Navigate to="/" />;
  } else if (path === "/manage/tadmin" && loggedInUser.status !== "admin") {
    return <Navigate to="/" />;
  } else if (path === "/manage/tauthor" && loggedInUser.status !== "admin") {
    return <Navigate to="/" />;
  } else if (path === "/manage/tuser" && loggedInUser.status !== "admin") {
    return <Navigate to="/" />;
  } else if (
    path === "/manage/tnovel" &&
    loggedInUser.status !== "admin" &&
    loggedInUser.statuse !== "author"
  ) {
    return <Navigate to="/" />;
  } else if (
    path === "/my-bookshelf" &&
    loggedInUser.statuse !== "author" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return <Navigate to="/" />;
  } else if (
    path === "/suggestions" &&
    loggedInUser.statuse !== "author" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return <Navigate to="/" />;
  } else {
    return element;
  }
}
