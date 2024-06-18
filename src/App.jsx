import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import LoginRegister from "./page/pagelogin/login";
import Adminhomepage from "./page/pagemanagement/adminhomepage";
import Userhomepage from "./page/pagemanagement/userpagehome";
import Category from "./page/pagenovel/Category";
import PrivateRoute from "./cacklogin/ceaklogin";
import Appbar from "./Appbar";
import Profile from "./page/pageprofile/profile";
import Bookshelf from "./page/pagenovel/Bookshelf";
import Suggestions from "./page/pagenovel/Suggestions";
function App() {

  return (
    <>
      <div>
        <Router>
        <Appbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/novel-category" element={<Category />} />
            <Route path="/admin" element={<PrivateRoute element={<Adminhomepage/>} path="/admin" />} />
            <Route path="/user" element={<PrivateRoute element={<Userhomepage/>} path="/user" />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile/>} path="/profile" />} />
            <Route path="/my-bookshelf" element={<PrivateRoute element={<Bookshelf/>} path="/my-bookshelf" />}  />
            <Route path="/suggestions" element={<PrivateRoute element={<Suggestions/>} path="/suggestions" />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
