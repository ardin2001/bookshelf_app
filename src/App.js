import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network";
import ThemeContext from "./context/ThemeContext";
import LocaleContext from "./context/LocaleContext";
import HomePageWrapper from "./pages/HomePage";
import DetailNotePage from "./pages/DetailNotePage";
import Header from "./component/Header";
import AddPage from "./pages/AddNotePage";
import ArchivedPageWrapper from "./pages/ArchivedPage";
import Page404 from "./pages/404";
import Footer from "./component/Footer";

function App() {
  const [authedUser, setauthedUser] = React.useState(null);
  const [initializing, setinitializing] = React.useState(true);
  const [localeContext, setlocaleContext] = React.useState("id");
  const toggleLocaleContext = () => {
    setlocaleContext((prevLocale) => {
      return prevLocale === "id" ? "en" : "id";
    });
  };
  const LocaleContextValue = React.useMemo(() => {
    return {
      localeContext,
      toggleLocaleContext,
    };
  }, [localeContext]);
  const [themeContext, setThemeContext] = React.useState(
    localStorage.getItem("theme") || "light"
  );
  const toggleThemeContext = () => {
    setThemeContext((prevLocale) => {
      localStorage.setItem("theme", prevLocale === "light" ? "dark" : "light");
      return prevLocale === "light" ? "dark" : "light";
    });
  };
  const themecontextValue = React.useMemo(() => {
    return {
      themeContext,
      toggleThemeContext,
    };
  }, [themeContext]);
  React.useEffect(() => {
    getUserLogged()
      .then(({ data }) => {
        setauthedUser(data);
        setinitializing(false);
      })
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeContext);
  }, [themeContext]);
  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setauthedUser(data);
  }
  function onLogout() {
    setauthedUser(null);
    putAccessToken("");
  }

  if (initializing) {
    return null;
  }
  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={themecontextValue}>
        <LocaleContext.Provider value={LocaleContextValue}>
          <header className="contact-app__header">
            <Header />
          </header>
          <main>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <Footer
            actor="Ardin Nugraha"
            message="Thank you for visit my Website"
          ></Footer>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themecontextValue}>
      <LocaleContext.Provider value={LocaleContextValue}>
        <header>
          <Header logout={onLogout} name={authedUser.name} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePageWrapper />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/note/:id" element={<DetailNotePage />} />
            <Route path="/archived" element={<ArchivedPageWrapper />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer
          actor="Ardin Nugraha"
          message="Thank you for visit my Website"
        ></Footer>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
