import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser");
  });

  const [page, setPage] = useState(() => {
    return localStorage.getItem("currentUser") ? "main" : "login";
  });

  const handleLoginSuccess = (userId) => {
    localStorage.setItem("currentUser", userId);
    setCurrentUser(userId);
    setPage("main");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setPage("login");
  };

  return (
    <>
      {page === "login" && <LoginPage onLoginSuccess={handleLoginSuccess} />}

      {page === "main" && (
        <MainPage currentUser={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;