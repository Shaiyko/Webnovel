import { Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

//ມັນແດງປົກກະຕິ
// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ element, path }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    return <Navigate to="/login" />;
  } else if (path === "/admin" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  }else if (path === "/report/novel" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/report/author" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  }else if (path === "/report/reortview" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  }else if (path === "/report/user" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  }else if (path === "/report/suggestions" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/user" && loggedInUser.status !== "user") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/author" && loggedInUser.status !== "author") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (
    path === "/profile" &&
    loggedInUser.status !== "author" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/manage/ttag" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/manage/ttype" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/manage/tadmin" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/manage/tauthor" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (path === "/manage/tuser" && loggedInUser.status !== "admin") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (
    path === "/manage/tnovel" &&
    loggedInUser.status !== "admin" &&
    loggedInUser.status !== "author"
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (
    path === "/my-bookshelf" &&
    loggedInUser.status !== "author" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else if (
    path === "/suggestions" &&
    loggedInUser.status !== "author" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return <Typography variant="h4">404 Not Found</Typography>;
  } else if (
    path === "/suggestionreport" &&
    loggedInUser.status !== "author" &&
    loggedInUser.status !== "user" &&
    loggedInUser.status !== "admin"
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  } else {
    return element;
  }
}
