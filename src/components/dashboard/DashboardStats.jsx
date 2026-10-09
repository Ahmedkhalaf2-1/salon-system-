export default function DashboardStats({
  todayBookingsCount,
  todayRevenue,
  totalCustomers,
  topService,
  topBarber,
}) {
  const items = [
    {
      label: "Today's Bookings",
      value: todayBookingsCount,
    },
    {
      label: "Today's Revenue",
      value: `${todayRevenue} EGP`,
    },
    {
      label: "Total Customers",
      value: totalCustomers,
    },
    {
      label: "Top Service",
      value: topService,
    },
    {
      label: "Top Barber",
      value: topBarber,
    },
  ];

  return (
    <section className="dashboard-stats-grid">
      {items.map((item) => (
        <div className="dashboard-stat-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}