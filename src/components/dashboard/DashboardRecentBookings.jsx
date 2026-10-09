export default function DashboardRecentBookings({ bookings }) {
  return (
    <section className="dashboard-panel-card">
      <div className="dashboard-panel-header">
        <h3>Recent Bookings</h3>
        <span>{bookings.length} item(s)</span>
      </div>

      {bookings.length === 0 ? (
        <p className="empty-text">No recent bookings yet.</p>
      ) : (
        <div className="dashboard-list">
          {bookings.map((booking) => (
            <div className="dashboard-list-item" key={booking.id}>
              <div>
                <h4>{booking.customerName}</h4>
                <p>
                  {booking.serviceName} with {booking.barberName}
                </p>
              </div>

              <div className="dashboard-list-meta">
                <strong className={`status-text ${booking.status}`}>
                  {booking.status}
                </strong>
                <span>
                  {booking.date} - {booking.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}