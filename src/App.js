import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

const IS_LOGGED_IN = "isLoggedIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    localStorage.setItem(IS_LOGGED_IN, "1");
    setIsLoggedIn(true);
    console.log(isLoggedIn);
  };

  const logoutHandler = () => {
    localStorage.removeItem(IS_LOGGED_IN);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(IS_LOGGED_IN);
    if (isLoggedIn && isLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
