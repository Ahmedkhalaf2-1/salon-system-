import {
  LayoutGrid,
  Settings,
  CalendarDays,
  CreditCard,
  History,
  LogOut,
} from "lucide-react";

import logo from "../../assets/logo1.png";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "bookings", label: "Bookings", icon: CalendarDays },
  { key: "cashier", label: "Cashier", icon: CreditCard },
  { key: "history", label: "History", icon: History },
];

export default function Sidebar({ activePage, setActivePage, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={logo} alt="Joe Logo" className="sidebar-logo" />
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                className={activePage === item.key ? "active" : ""}
                onClick={() => setActivePage(item.key)}
              >
                <span className="menu-icon">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sidebar-bottom">
        <button className="logout-btn" type="button" onClick={onLogout}>
          <span className="menu-icon">
            <LogOut size={18} strokeWidth={2} />
          </span>
          <span>Logout</span>
        </button>

        <div className="sidebar-user">
          <div className="sidebar-avatar">J</div>
          <div>
            <strong>Joe Salon</strong>
            <p>View profile</p>
          </div>
        </div>
      </div>
    </aside>
  );
}