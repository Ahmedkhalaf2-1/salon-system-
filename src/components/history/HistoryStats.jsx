export default function HistoryStats({
  totalCustomers,
  totalVisits,
  totalRevenue,
  topService,
  topBarber,
}) {
  const stats = [
    {
      label: "Total Customers",
      value: totalCustomers,
    },
    {
      label: "Total Visits",
      value: totalVisits,
    },
    {
      label: "Total Revenue",
      value: `${totalRevenue} EGP`,
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
    <section className="history-stats-grid">
      {stats.map((item) => (
        <div className="history-stat-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}