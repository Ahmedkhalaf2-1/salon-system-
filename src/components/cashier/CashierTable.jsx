export default function CashierTable({ sales, onDeleteSale }) {
  const totalSales = sales.reduce((sum, item) => sum + Number(item.paid || 0), 0);

  return (
    <section className="cashier-card">
      <div className="cashier-table-header">
        <div>
          <h2>Cashier Records</h2>
          <p>{sales.length} record(s)</p>
        </div>

        <div className="cashier-total">
          <span>Total Collected</span>
          <strong>{totalSales} EGP</strong>
        </div>
      </div>

      {sales.length === 0 ? (
        <p className="empty-text">No cashier records yet.</p>
      ) : (
        <div className="cashier-table-wrap">
          <table className="cashier-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Barber</th>
                <th>Price</th>
                <th>Paid</th>
                <th>Remaining</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.customerName}</td>
                  <td>{sale.serviceName}</td>
                  <td>{sale.barberName}</td>
                  <td>{sale.price} EGP</td>
                  <td>{sale.paid} EGP</td>
                  <td>{sale.remaining} EGP</td>
                  <td>{sale.paymentMethod}</td>
                  <td>{sale.date}</td>
                  <td>{sale.time}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDeleteSale(sale.id)}
                    >
                      Delete
                    </button>
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