import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  children,
  activePage,
  setActivePage,
  onLogout,
}) {
  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
      />

      <div className="main-area">
        <Header activePage={activePage} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}