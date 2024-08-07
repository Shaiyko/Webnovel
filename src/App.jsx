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
import TableNovel from "./page/pagemanagement/novel/Tablenovel";
import ViewAndChapter from "./page/pagemanagement/novel/ViewNovelAdd";
import ContentNovel from "./page/pagemanagement/novel/contentNovel/CreateContent";
import CreateContentAdd from "./page/pagemanagement/novel/contentNovel/CreateContentAdd";
import UpdateContent from "./page/pagemanagement/novel/contentNovel/UpdateConent";
import ViewContent from "./page/pagenovel/ViewNovel/ViewContent";
import SearchTag from "./page/pagemanagement/Search/SearchTag";
import SearchType from "./page/pagemanagement/Search/SearchType";
import SuggestionReport from "./page/pagenovel/Suggestionreposrt";
import SuggestionForm2 from "./page/pagenovel/SuggestionForm";
import NovelReport from "./page/pagemanagement/Report/ReportNovel";
import ReportAuthor from "./page/pagemanagement/Report/ReportAuthor";
import ReportUsers from "./page/pagemanagement/Report/ReportUsers";
import ReportSuggestions from "./page/pagemanagement/Report/ReportSuggestions";
import ReportReading from "./page/pagemanagement/Report/ReportReading";
import TableSuggestions from "./page/pagemanagement/Report/Suggestions/TableSuggestions";
import Directory from "./page/pagenovel/ViewNovel/Directory";
function App() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          "@media only screen and (min-width:992px) and (min-width:1199px)": {
            backgroundColor: "white",
            width: "100%",
          },
          "@media (max-width:767px)": {
            backgroundColor: "white",
            width: "100%",
          },
        }}
      >
        <Router>
          <Appbar />
          <Box sx={{ width: "100%", marginTop: 3 }}>
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
              {
                <Route
                  path="/manage/tnovel/:id_author"
                  element={<TableNovel />}
                />
              }

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
                    path="/manage/ttype"
                  />
                }
              />
              <Route
                path="/manage/tadmin"
                element={
                  <PrivateRoute
                    element={<TableAdmin />}
                    path="/manage/tadmin"
                  />
                }
              />
              <Route
                path="/manage/tuser"
                element={
                  <PrivateRoute element={<TableUse />} path="/manage/tuser" />
                }
              />
                <Route
                path="/manage/suggestions"
                element={
                  <PrivateRoute element={<TableSuggestions />} path="/manage/tuser" />
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

              <Route path="/content/:id_novel" element={<ViewAndChapter />} />
              <Route path="/content/updata/:id" element={<UpdateContent />} />
              <Route
                path="/contenttable/:id_novel"
                element={<ContentNovel />}
              />
              <Route
                path="/contentnew/:id_novel"
                element={<CreateContentAdd />}
              />

              {/*  */}
              <Route path="/novel-category/:id" element={<Category />} />
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
                path="/suggestionreport/:id_novel"
                element={
                  <PrivateRoute element={<SuggestionReport />} path="/suggestionreport/:id_novel" />
                }
              />
                 <Route
                path="/suggestions"
                element={
                  <PrivateRoute element={<SuggestionForm2 />} path="/suggestions" />
                }
              />
              {/* Search */}
              <Route path="/searchn/:searchN" element={<SearchNovel />} />
              <Route path="/selecttag/:searchTag" element={<SearchTag />} />
              <Route path="/selecttype/:searchType" element={<SearchType />} />
              <Route path="/author/:searchA" element={<SearchAuthor />} />
              {/* Search */}
              <Route path="/novel/:id_novel" element={<ViewNovel />} />
              <Route path="/novel/:id_novel/directory" element={<Directory />} />
              <Route path="/novel/:id_novel/:id" element={<ViewContent />} />
                 {/* Report */}
                 <Route
                path="/report/novel"
                element={
                  <PrivateRoute element={<NovelReport />} path="/report/novel" />
                }
                />
                <Route
                path="/report/author"
                element={
                  <PrivateRoute element={<ReportAuthor />} path="/report/author" />
                }
              />
               <Route
                path="/report/user"
                element={
                  <PrivateRoute element={<ReportUsers />} path="/report/user" />
                }
              />
               <Route
                path="/report/suggestions"
                element={
                  <PrivateRoute element={<ReportSuggestions />} path="/report/suggestions" />
                }
              />
                <Route
                path="/report/reortview"
                element={
                  <PrivateRoute element={<ReportReading />} path="/report/reortview" />
                }
              />
            </Routes>
          </Box>
        </Router>
      </Box>
    </>
  );
}

export default App;
