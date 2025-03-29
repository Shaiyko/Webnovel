import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Box } from "@mui/material";
import PrivateRoute from "./cacklogin/ceaklogin";
import Appbar from "./Appbar";

const Home = lazy(() => import("./home"));
const LoginRegister = lazy(() => import("./page/pagelogin/login"));
const Adminhomepage = lazy(() => import("./page/pagemanagement/adminhomepage"));
const Userhomepage = lazy(() => import("./page/pagemanagement/userpagehome"));
const Category = lazy(() => import("./page/pagenovel/Category"));
const Profile = lazy(() => import("./page/pageprofile/profile"));
const Bookshelf = lazy(() => import("./page/pagenovel/Bookshelf"));
const TableAdmin = lazy(() => import("./page/pagemanagement/Admin/Admin"));
const TableUse = lazy(() => import("./page/pagemanagement/User/User"));
const TableAuthor = lazy(() => import("./page/pagemanagement/Author/Author"));
const EnhancedTable = lazy(() => import("./page/pagemanagement/Tag/TAgnovel"));
const TypeEnhancedTable = lazy(() =>
  import("./page/pagemanagement/Type/TypeNovel")
);
const Register = lazy(() => import("./page/pagelogin/Register"));
const SearchNovel = lazy(() => import("./Search/SearchNovel"));
const SearchAuthor = lazy(() => import("./Search/SearchAuthor"));
const ViewNovel = lazy(() => import("./page/pagenovel/ViewNovel/Viewnovel"));
const TableNovel = lazy(() => import("./page/pagemanagement/novel/Tablenovel"));
const ViewAndChapter = lazy(() =>
  import("./page/pagemanagement/novel/ViewNovelAdd")
);
const ContentNovel = lazy(() =>
  import("./page/pagemanagement/novel/contentNovel/CreateContent")
);
const CreateContentAdd = lazy(() =>
  import("./page/pagemanagement/novel/contentNovel/CreateContentAdd")
);
const UpdateContent = lazy(() =>
  import("./page/pagemanagement/novel/contentNovel/UpdateConent")
);
const ViewContent = lazy(() =>
  import("./page/pagenovel/ViewNovel/ViewContent")
);
const SearchTag = lazy(() => import("./Search/SearchTag"));
const SearchType = lazy(() => import("./Search/SearchType"));
const SuggestionReport = lazy(() =>
  import("./page/pagenovel/Suggestionreposrt")
);
const SuggestionForm2 = lazy(() => import("./page/pagenovel/SuggestionForm"));
const NovelReport = lazy(() =>
  import("./page/pagemanagement/Report/ReportNovel")
);
const ReportAuthor = lazy(() =>
  import("./page/pagemanagement/Report/ReportAuthor")
);
const ReportUsers = lazy(() =>
  import("./page/pagemanagement/Report/ReportUsers")
);
const ReportSuggestions = lazy(() =>
  import("./page/pagemanagement/Report/ReportSuggestions")
);
const ReportReading = lazy(() =>
  import("./page/pagemanagement/Report/ReportReading")
);
const TableSuggestions = lazy(() =>
  import("./page/pagemanagement/Report/Suggestions/TableSuggestions")
);
const Directory = lazy(() => import("./page/pagenovel/ViewNovel/Directory"));
const Footer = lazy(() => import("./Footerweb"));
const ResponsiveSlider = lazy(() => import("./Test/test"));
const TableNovelAdmin = lazy(() =>
  import("./page/pagemanagement/TablenovelAddmin")
);
const Account = lazy(() => import("./page/pageprofile/account"));
const ForgotPassword = lazy(() => import("./page/pagelogin/ForgotPassword"));
const ChangePassword = lazy(() =>
  import("./page/pageprofile/UpdateAccount/ChangePassword")
);
const ChangeData = lazy(() =>
  import("./page/pageprofile/UpdateAccount/ChangeData")
);
const Applytobeanauthor = lazy(() =>
  import("./page/pageprofile/UpdateAccount/Applytobeanauthor")
);
const Ser = lazy(() => import("./ser"));
function App() {
  return (
    <Box
      sx={{
        background: "#e0e0e0",
        height: "auto",
        width: "100%",
        "@media only screen and (min-width:992px) and (min-width:1199px)": {
          background: "#e0e0e0",
          width: "100%",
        },
        "@media (max-width:767px)": {
          background: "#f5f5f5",
          width: "100%",
        },
      }}
    >
      <Router>
        <Appbar />
        <Box sx={{ width: "100%", marginTop: 2 }}>
          <Routes>
            <Route path="/test" element={<ResponsiveSlider />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ms" element={<Ser />} />
            <Route path="/applytobeanauthor" element={<Applytobeanauthor />} />
            <Route path="/changedata" element={<ChangeData />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {
              <Route
                path="/profile"
                element={<PrivateRoute element={<Account />} path="/profile" />}
              />
            }
            {/** */}
            {
              <Route
                path="/manage/tnovel/:id_author"
                element={
                  <PrivateRoute
                    element={<TableNovel />}
                    path="/manage/tnovel/:id_author"
                  />
                }
              />
            }
            {
              <Route
                path="/manage/tnovel"
                element={
                  <PrivateRoute
                    element={<TableNovelAdmin />}
                    path="/manage/tnovel"
                  />
                }
              />
            }

            <Route
              path="/manage/ttag"
              element={
                <PrivateRoute element={<EnhancedTable />} path="/manage/ttag" />
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
                <PrivateRoute element={<TableAdmin />} path="/manage/tadmin" />
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
                <PrivateRoute
                  element={<TableSuggestions />}
                  path="/manage/tuser"
                />
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
            <Route path="/contenttable/:id_novel" element={<ContentNovel />} />
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
              element={<PrivateRoute element={<Userhomepage />} path="/user" />}
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
                <PrivateRoute
                  element={<SuggestionReport />}
                  path="/suggestionreport/:id_novel"
                />
              }
            />
            <Route
              path="/suggestions"
              element={
                <PrivateRoute
                  element={<SuggestionForm2 />}
                  path="/suggestions"
                />
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
                <PrivateRoute
                  element={<ReportAuthor />}
                  path="/report/author"
                />
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
                <PrivateRoute
                  element={<ReportSuggestions />}
                  path="/report/suggestions"
                />
              }
            />
            <Route
              path="/report/reortview"
              element={
                <PrivateRoute
                  element={<ReportReading />}
                  path="/report/reortview"
                />
              }
            />
          </Routes>
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
