export default function DashboardRecentSales({ sales }) {
  return (
    <section className="dashboard-panel-card">
      <div className="dashboard-panel-header">
        <h3>Recent Sales</h3>
        <span>{sales.length} item(s)</span>
      </div>

      {sales.length === 0 ? (
        <p className="empty-text">No recent sales yet.</p>
      ) : (
        <div className="dashboard-list">
          {sales.map((sale) => (
            <div className="dashboard-list-item" key={sale.id}>
              <div>
                <h4>{sale.customerName}</h4>
                <p>
                  {sale.serviceName} with {sale.barberName}
                </p>
              </div>

              <div className="dashboard-list-meta">
                <strong>{sale.paid} EGP</strong>
                <span>
                  {sale.date} - {sale.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}