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
import TableAdmin from "./page/pagemanagement/Admin/Admin";
import TableUse from "./page/pagemanagement/User/User";
import TableAuthor from "./page/pagemanagement/Author/Author";
import EnhancedTable from "./page/pagemanagement/Tag/TAgnovel";
import TypeEnhancedTable from "./page/pagemanagement/Type/TypeNovel";
import Register from "./page/pagelogin/Register";
import { Box } from "@mui/material";
import SearchNovel from "./page/pagemanagement/Search/SearchNovel";
import SearchAuthor from "./page/pagemanagement/Search/SearchAuthor";
import ViewNovel from "./page/pagenovel/ViewNovel/Viewnovel";
function App() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Router>
          <Appbar />
          <Box sx={{ width: "100%", marginTop: 10 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/register" element={<Register />} />
              <Route path="/madmin" element={<LoginRegister />} />
              <Route path="/mauthor" element={<LoginRegister />} />
              <Route path="/muser" element={<LoginRegister />} />
              <Route path="/mtag" element={<LoginRegister />} />
              <Route path="/mtype" element={<LoginRegister />} />
              {/** */}
              {/* <Route path="/tcreatenovel" element={<TableNovel />} />*/}
              {/** */}
              <Route
                path="/manage/ttag"
                element={
                  <PrivateRoute
                    element={<EnhancedTable />}
                    path="/manage/ttag"
                  />
                }
              />
              <Route
                path="/manage/ttype"
                element={
                  <PrivateRoute
                    element={<TypeEnhancedTable />}
                    path="//manage/ttype"
                  />
                }
              />
              <Route
                path="/manage/tadmin"
                element={
                  <PrivateRoute
                    element={<TableAdmin />}
                    path="//manage/tadmin"
                  />
                }
              />
              <Route
                path="/manage/tuser"
                element={
                  <PrivateRoute element={<TableUse />} path="//manage/tuser" />
                }
              />
              <Route
                path="/manage/tauthor"
                element={
                  <PrivateRoute
                    element={<TableAuthor />}
                    path="//manage/tauthor"
                  />
                }
              />

              {/******** 
           * 
           <Route path="/content/:id_novel" element={<ViewAndChapter />} />
           <Route path="/contenttable/:id_novel" element={<ContentNovel />} />
           <Route path="/contentnew/:id_novel" element={<CreateContentAdd />} />
           */}
              {/*  */}
              <Route path="/novel-category" element={<Category />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute element={<Adminhomepage />} path="/admin" />
                }
              />
              <Route
                path="/user"
                element={
                  <PrivateRoute element={<Userhomepage />} path="/user" />
                }
              />
              <Route
                path="/profile"
                element={<PrivateRoute element={<Profile />} path="/profile" />}
              />
              <Route
                path="/my-bookshelf"
                element={
                  <PrivateRoute element={<Bookshelf />} path="/my-bookshelf" />
                }
              />
              <Route
                path="/suggestions"
                element={
                  <PrivateRoute element={<Suggestions />} path="/suggestions" />
                }
                />
                {/* Search */}
                 <Route path="/searchn/:searchN" element={<SearchNovel />} />
                 
                 <Route path="/author/:searchA" element={<SearchAuthor />} />
                  {/* Search */}
                  <Route path="/novel/:id_novel" element={<ViewNovel />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </>
  );
}

export default App;
