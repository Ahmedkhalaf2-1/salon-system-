import { useMemo } from "react";
import DashboardStats from "../components/dashboard/DashboardStats.jsx";
import DashboardRecentSales from "../components/dashboard/DashboardRecentSales.jsx";
import DashboardRecentBookings from "../components/dashboard/DashboardRecentBookings.jsx";
import { getStorageData } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/storageKeys";
import {
  getTodayBookings,
  getTotalRevenueToday,
  getTopService,
  getTopBarber,
  getRecentSales,
  getRecentBookings,
} from "../utils/dashboardHelpers";

export default function Dashboard() {
  const bookings = useMemo(() => getStorageData(STORAGE_KEYS.BOOKINGS), []);
  const sales = useMemo(() => getStorageData(STORAGE_KEYS.SALES), []);

  const customersCount = useMemo(() => {
    const names = sales.map((sale) => sale.customerName).filter(Boolean);
    return new Set(names).size;
  }, [sales]);

  const todayBookings = useMemo(() => getTodayBookings(bookings), [bookings]);
  const todayRevenue = useMemo(() => getTotalRevenueToday(sales), [sales]);
  const topService = useMemo(() => getTopService(sales), [sales]);
  const topBarber = useMemo(() => getTopBarber(sales), [sales]);
  const recentSales = useMemo(() => getRecentSales(sales, 5), [sales]);
  const recentBookings = useMemo(() => getRecentBookings(bookings, 5), [bookings]);

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero-card">
        <div className="dashboard-hero-copy">
         
          <h2>Welcome back to Joe Salon dashboard</h2>
          <p>
            
          </p>
        </div>

        <div className="dashboard-hero-mini-stats">
          <div className="hero-mini-box">
            <span>Today Revenue</span>
            <strong>{todayRevenue} EGP</strong>
          </div>
          <div className="hero-mini-box">
            <span>Today Bookings</span>
            <strong>{todayBookings.length}</strong>
          </div>
        </div>
      </section>

      <DashboardStats
        todayBookingsCount={todayBookings.length}
        todayRevenue={todayRevenue}
        totalCustomers={customersCount}
        topService={topService}
        topBarber={topBarber}
      />

      <div className="dashboard-panels-grid">
        <DashboardRecentSales sales={recentSales} />
        <DashboardRecentBookings bookings={recentBookings} />
      </div>
    </div>
  );
}