export default function BookingTable({
  bookings,
  onDeleteBooking,
  onChangeStatus,
  onMoveToCashier,
}) {
  return (
    <section className="booking-card">
      <div className="booking-table-header">
        <h2>Bookings List</h2>
        <span>{bookings.length} booking(s)</span>
      </div>

      {bookings.length === 0 ? (
        <p className="empty-text">No bookings yet.</p>
      ) : (
        <div className="booking-table-wrap">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Barber</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.customerName}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.barberName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="done-btn"
                        onClick={() => onChangeStatus(booking.id, "done")}
                      >
                        Done
                      </button>

                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => onChangeStatus(booking.id, "cancelled")}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="move-btn"
                        onClick={() => onMoveToCashier(booking)}
                        disabled={booking.status === "done"}
                      >
                        Move to Cashier
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => onDeleteBooking(booking.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}