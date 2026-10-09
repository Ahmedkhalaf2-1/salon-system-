import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Cashier from "./pages/Cashier";
import History from "./pages/History";
import Login from "./Login";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("joe_salon_auth") === "true";
  });

  function handleLogout() {
    localStorage.removeItem("joe_salon_auth");
    setIsLoggedIn(false);
  }

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "settings":
        return <Settings />;
      case "bookings":
        return <Bookings />;
      case "cashier":
        return <Cashier />;
      case "history":
        return <History />;
      default:
        return <Dashboard />;
    }
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}