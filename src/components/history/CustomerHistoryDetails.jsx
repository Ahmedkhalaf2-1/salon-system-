export default function CustomerHistoryDetails({ customer }) {
  function handlePrint() {
    window.print();
  }

  function getServicesText(record) {
    if (record.services && record.services.length > 0) {
      return record.services.map((service) => service?.name).filter(Boolean);
    }

    if (record.serviceName) {
      return record.serviceName.split(" + ").filter(Boolean);
    }

    return ["-"];
  }

  function getPaymentStatus(record) {
    const remaining = Number(record.remaining || 0);
    const paid = Number(record.paid || 0);

    if (remaining <= 0 && paid > 0) {
      return { label: "Paid", className: "paid" };
    }

    if (paid > 0 && remaining > 0) {
      return { label: "Partial", className: "partial" };
    }

    return { label: "Unpaid", className: "unpaid" };
  }

  if (!customer) {
    return (
      <section className="history-card">
        <p className="empty-text">
          Select a customer to view full visit history.
        </p>
      </section>
    );
  }

  const outstandingBalance = customer.records.reduce(
    (sum, record) => sum + Number(record.remaining || 0),
    0
  );

  const averageSpend =
    customer.totalVisits > 0
      ? Math.round(customer.totalSpent / customer.totalVisits)
      : 0;

  const favoriteBarberMap = {};
  customer.records.forEach((record) => {
    if (record.barberName) {
      favoriteBarberMap[record.barberName] =
        (favoriteBarberMap[record.barberName] || 0) + 1;
    }
  });

  const favoriteBarber =
    Object.entries(favoriteBarberMap).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "-";

  return (
    <section className="history-card customer-history-details">
      <div className="history-section-header customer-details-header">
        <div>
          <span className="soft-chip">Customer Profile</span>
          <h2>{customer.customerName}</h2>
          <span>{customer.totalVisits} total visit(s)</span>
        </div>

        <button type="button" className="print-btn" onClick={handlePrint}>
          Print History
        </button>
      </div>

      <div className="customer-summary-grid customer-summary-grid-upgraded">
        <div className="summary-box summary-box-highlight">
          <span>Last Service</span>
          <strong>{customer.lastService}</strong>
        </div>

        <div className="summary-box">
          <span>Last Payment</span>
          <strong>{customer.lastPaid} EGP</strong>
        </div>

        <div className="summary-box">
          <span>Last Visit Date</span>
          <strong>{customer.lastDate}</strong>
        </div>

        <div className="summary-box">
          <span>Last Visit Time</span>
          <strong>{customer.lastTime}</strong>
        </div>

        <div className="summary-box">
          <span>Total Spent</span>
          <strong>{customer.totalSpent} EGP</strong>
        </div>

        <div className="summary-box">
          <span>Favorite Service</span>
          <strong>{customer.favoriteService}</strong>
        </div>

        <div className="summary-box">
          <span>Favorite Barber</span>
          <strong>{favoriteBarber}</strong>
        </div>

        <div className="summary-box">
          <span>Average Spend</span>
          <strong>{averageSpend} EGP</strong>
        </div>

        <div className="summary-box">
          <span>Outstanding Balance</span>
          <strong className={outstandingBalance > 0 ? "danger-text" : ""}>
            {outstandingBalance} EGP
          </strong>
        </div>
      </div>

      <div className="history-table-wrap">
        <table className="history-table upgraded-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Services</th>
              <th>Barber</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {customer.records.map((record) => {
              const services = getServicesText(record);
              const paymentStatus = getPaymentStatus(record);

              return (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.time}</td>

                  <td>
                    <div className="service-chips">
                      {services.map((service, index) => (
                        <span
                          key={`${record.id}-${service}-${index}`}
                          className="service-chip"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>{record.barberName || "-"}</td>
                  <td>{record.price} EGP</td>
                  <td>{record.paid} EGP</td>
                  <td>
                    <span
                      className={
                        Number(record.remaining || 0) > 0
                          ? "remaining-badge warning"
                          : "remaining-badge clear"
                      }
                    >
                      {record.remaining} EGP
                    </span>
                  </td>
                  <td>{record.paymentMethod}</td>
                  <td>
                    <span className={`payment-status-badge ${paymentStatus.className}`}>
                      {paymentStatus.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}