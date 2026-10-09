export default function CustomersList({
  customers,
  selectedCustomer,
  onSelectCustomer,
}) {
  return (
    <section className="history-card">
      <div className="history-section-header">
        <h2>Customers</h2>
        <span>{customers.length} customer(s)</span>
      </div>

      {customers.length === 0 ? (
        <p className="empty-text">No customer history found.</p>
      ) : (
        <div className="customers-list">
          {customers.map((customer) => (
            <button
              key={customer.customerName}
              type="button"
              className={`customer-item ${
                selectedCustomer?.customerName === customer.customerName
                  ? "active"
                  : ""
              }`}
              onClick={() => onSelectCustomer(customer)}
            >
              <div>
                <h3>{customer.customerName}</h3>
                <p>{customer.totalVisits} visit(s)</p>
              </div>

              <div className="customer-item-meta">
                <span>{customer.lastService}</span>
                <strong>{customer.lastDate}</strong>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}