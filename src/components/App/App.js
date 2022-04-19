//* Import des composants thématique de MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/rubik-wet-paint";
import "@fontsource/roboto";

//* Import des composants nécessaires à React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import Error from "../../pages/Error";
import Account from "../../pages/Account";
import Credits from "../../pages/Credits";
import Favorites from "../../pages/Favorites";
import Library from "../../pages/Library";
import Contact from "../../pages/Contact";
import MyAlerts from "../../pages/MyAlerts";
import SignInSide from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
// import ForgotPassword from "../ForgotPassword/ForgotPassword";
import AroundMe from "../../pages/AroundMe";
import AuthenticatedRoute from "../AuthenticatedRoute";
import Alert from "../Alert/Alert";
import ContactFormDonation from "../ContactFormDonation/ContactFormDonation";

import SearchResults from "../SearchResults/SearchResults";
import { AuthProvider } from "../../contexts/AuthContext";
import { AlertProvider } from "../../contexts/AlertContext";
import { BookProvider } from "../../contexts/BookContext";
import { UserProvider } from "../../contexts/UserContext";
import { DonatorProvider } from "../../contexts/DonatorContext";

let themeOptions = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#455a64",
    },
    info: {
      main: "#2e7d32",
    },
  },
  typography: {
    h6: {
      fontFamily: "Rubik Wet Paint",
    },
  },
});
themeOptions = responsiveFontSizes(themeOptions);

function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AlertProvider>
            <BookProvider>

              <UserProvider>
                <DonatorProvider>
                  <Routes>
                    {/* Routes toujours accessibles */}
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Error />} />
                    <Route path="/Credits" element={<Credits />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/AroundMe" element={<AroundMe />} />
                    <Route path="/SearchResults" element={<SearchResults />} />
                    {/* Routes avec JWT*/}
                    <Route
                      element={
                        <AuthenticatedRoute
                          redirect="/SignIn"
                          connectedOnly={true}
                        />
                      }
                    >
                      <Route path="/Account" element={<Account />} />
                      <Route path="/myAlerts" element={<MyAlerts />} />
                      <Route path="/Favorites" element={<Favorites />} />
                      <Route path="/Library" element={<Library />} />
                      <Route
                        path="/ContactFormDonation"
                        element={<ContactFormDonation />}
                      />
                    </Route>

                    {/* Routes SANS JWT*/}
                    <Route
                      element={
                        <AuthenticatedRoute
                          redirect="/"
                          connectedOnly={false}
                        />
                      }
                    >
                      {/* <Route path="/ForgotPassword" element={<ForgotPassword />} />*/}
                      <Route path="/SignIn" element={<SignInSide />} />
                      <Route path="/SignUp" element={<SignUp />} />
                    </Route>
                  </Routes>

                  <Alert />
                </DonatorProvider>
              </UserProvider>
            </BookProvider>
          </AlertProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;