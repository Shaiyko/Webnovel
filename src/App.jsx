import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";

const Home = lazy(() => import("./home"));
const LoginRegister = lazy(() => import("./page/pagelogin/login"));
const Adminhomepage = lazy(() => import("./page/pagemanagement/adminhomepage"));
const Userhomepage = lazy(() => import("./page/pagemanagement/userpagehome"));
const Category = lazy(() => import("./page/pagenovel/Category"));
const Appbar = lazy(() => import("./Appbar"));
const Profile = lazy(() => import("./page/pageprofile/profile"));
const Bookshelf = lazy(() => import("./page/pagenovel/Bookshelf"));
const TableAdmin = lazy(() => import("./page/pagemadmin/Admin"));
const TableUse = lazy(() => import("./page/pagemanagement/User/User"));
const TableAuthor = lazy(() => import("./page/pagemauthor/Author"));
const EnhancedTable = lazy(() => import("./page/pagemanagement/Tag/TAgnovel"));
const TypeEnhancedTable = lazy(() =>
  import("./page/pagemanagement/Type/TypeNovel")
);
const Register = lazy(() => import("./page/pagelogin/Register"));
const SearchNovel = lazy(() => import("./Search/SearchNovel"));
const SearchAuthor = lazy(() => import("./Search/SearchAuthor"));
const ViewNovel = lazy(() => import("./page/pagenovel/Viewnovel"));
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
const ViewContent = lazy(() => import("./page/pagenovel/ViewContent"));
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
const Directory = lazy(() => import("./page/pagenovel/Directory"));
const Footer = lazy(() => import("./Footerweb"));
const ResponsiveSlider = lazy(() => import("./Test/test"));
const TableNovelAdmin = lazy(() =>
  import("./page/pagemanagement/TablenovelAddmin")
);
const Account = lazy(() => import("./page/pageprofile/account"));
const ForgotPassword = lazy(() => import("./page/pagelogin/ForgotPassword"));
const ChangePassword = lazy(() => import("./page/pageprofile/ChangePassword"));
const ChangeData = lazy(() => import("./page/pageprofile/ChangeData"));
const Applytobeanauthor = lazy(() =>
  import("./page/pageprofile/Applytobeanauthor")
);
const PrivateRoute = lazy(() => import("./cacklogin/ceaklogin"));
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
        <Suspense
          fallback={
            <div>
              {" "}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {/* ตัวโหลด */}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>
            </div>
          }
        >
          <Appbar />
          <Box sx={{ width: "100%", marginTop: 2 }}>
            <Routes>
              <Route path="/test" element={<ResponsiveSlider />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ms1" element={<Ser />} />
              <Route
                path="/applytobeanauthor"
                element={<Applytobeanauthor />}
              />
              <Route path="/changedata" element={<ChangeData />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route
                path="/profile"
                element={<PrivateRoute element={<Account />} />}
              />
              <Route
                path="/tnovel/:id_author"
                element={<PrivateRoute element={<TableNovel />} />}
              />
              <Route
                path="/tnovel"
                element={<PrivateRoute element={<TableNovelAdmin />} />}
              />
              <Route
                path="/ttag"
                element={<PrivateRoute element={<EnhancedTable />} />}
              />
              <Route
                path="/ttype"
                element={<PrivateRoute element={<TypeEnhancedTable />} />}
              />
              <Route
                path="/tadmin"
                element={<PrivateRoute element={<TableAdmin />} />}
              />
              <Route
                path="/tuser"
                element={<PrivateRoute element={<TableUse />} />}
              />
              <Route
                path="/tsuggestions"
                element={<PrivateRoute element={<TableSuggestions />} />}
              />
              <Route
                path="/tauthor"
                element={<PrivateRoute element={<TableAuthor />} />}
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

              <Route path="/:id" element={<Category />} />
              <Route
                path="/admin"
                element={<PrivateRoute element={<Adminhomepage />} />}
              />
              <Route
                path="/user"
                element={<PrivateRoute element={<Userhomepage />} />}
              />
              <Route
                path="/profile"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route
                path="/my-bookshelf"
                element={<PrivateRoute element={<Bookshelf />} />}
              />
              <Route
                path="/suggestionreport/:id_novel"
                element={<PrivateRoute element={<SuggestionReport />} />}
              />
              <Route
                path="/suggestions"
                element={<PrivateRoute element={<SuggestionForm2 />} />}
              />
              <Route path="/:searchN" element={<SearchNovel />} />
              <Route path="/:searchTag" element={<SearchTag />} />
              <Route path="/:searchType" element={<SearchType />} />
              <Route path="/:searchA" element={<SearchAuthor />} />
              <Route path="/:id_novel" element={<ViewNovel />} />
              <Route
                path="/novel/:id_novel/directory"
                element={<Directory />}
              />
              <Route path="/novel/:id_novel/:id" element={<ViewContent />} />
              <Route
                path="/novel"
                element={<PrivateRoute element={<NovelReport />} />}
              />
              <Route
                path="/author"
                element={<PrivateRoute element={<ReportAuthor />} />}
              />
              <Route
                path="/user"
                element={<PrivateRoute element={<ReportUsers />} />}
              />
              <Route
                path="/suggestions"
                element={<PrivateRoute element={<ReportSuggestions />} />}
              />
              <Route
                path="/reortview"
                element={<PrivateRoute element={<ReportReading />} />}
              />
            </Routes>
          </Box>
          <Footer />
        </Suspense>
      </Router>
    </Box>
  );
}

export default App;
