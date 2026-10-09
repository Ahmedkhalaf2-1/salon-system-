import { Bell, Search, ChevronDown } from "lucide-react";

export default function Header({ activePage }) {
  const pageMeta = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Track salon activity, bookings, revenue, and performance.",
    },
    settings: {
      title: "Settings",
      subtitle: "Manage services, barbers, and your salon setup.",
    },
    bookings: {
      title: "Bookings",
      subtitle: "Create, review, and manage customer appointments.",
    },
    cashier: {
      title: "Cashier",
      subtitle: "Handle payments, record sales, and follow transactions.",
    },
    history: {
      title: "History",
      subtitle: "Browse customer visit history and payment records.",
    },
  };

  const currentPage = pageMeta[activePage] || {
    title: "Joe Salon",
    subtitle: "Modern barbershop management system.",
  };

  return (
    <header className="top-header">
      <div className="header-copy">
        <h1>{currentPage.title}</h1>
        <p>{currentPage.subtitle}</p>
      </div>

      <div className="header-actions">
        <div className="header-search">
          <Search size={18} strokeWidth={2} />
          <input type="text" placeholder="Search here..." />
        </div>

        <button type="button" className="header-icon-btn">
          <Bell size={18} strokeWidth={2} />
        </button>

        <button type="button" className="header-profile-btn">
          <div className="header-profile-avatar">J</div>

          <div className="header-profile-copy">
            <strong>Joe Salon</strong>
            <span>Admin</span>
          </div>

          <ChevronDown size={16} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}