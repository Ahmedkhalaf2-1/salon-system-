import { useMemo, useState } from "react";

export default function CashierForm({ services, barbers, onAddSale }) {
  const [formData, setFormData] = useState({
    customerName: "",
    barberId: "",
    paid: "",
    paymentMethod: "cash",
    date: "",
    time: "",
  });

  const [selectedServices, setSelectedServices] = useState([]);

  const totalPrice = useMemo(() => {
    return selectedServices.reduce(
      (sum, service) => sum + Number(service.price || 0),
      0
    );
  }, [selectedServices]);

  const paidAmount = Number(formData.paid) || 0;
  const remaining = Math.max(totalPrice - paidAmount, 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleToggleService(service) {
    const exists = selectedServices.some(
      (item) => String(item.id) === String(service.id)
    );

    if (exists) {
      setSelectedServices((prev) =>
        prev.filter((item) => String(item.id) !== String(service.id))
      );
    } else {
      setSelectedServices((prev) => [...prev, service]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { customerName, barberId, paid, paymentMethod, date, time } = formData;

    if (
      !customerName.trim() ||
      selectedServices.length === 0 ||
      !barberId ||
      paid === "" ||
      !paymentMethod ||
      !date ||
      !time
    ) {
      alert("من فضلك املى كل بيانات الكاشير");
      return;
    }

    const selectedBarber = barbers.find(
      (barber) => String(barber.id) === String(barberId)
    );

    const newSale = {
      id: Date.now(),
      customerName: customerName.trim(),
      services: selectedServices.map((service) => ({
        id: service.id,
        name: service.name,
        price: Number(service.price || 0),
      })),
      serviceName: selectedServices.map((service) => service.name).join(" + "),
      price: totalPrice,
      barberId,
      barberName: selectedBarber?.name || "",
      paid: paidAmount,
      remaining,
      paymentMethod,
      date,
      time,
      createdAt: new Date().toISOString(),
    };

    onAddSale(newSale);

    setFormData({
      customerName: "",
      barberId: "",
      paid: "",
      paymentMethod: "cash",
      date: "",
      time: "",
    });

    setSelectedServices([]);
  }

  return (
    <section className="cashier-card">
      <h2>New Cashier Entry</h2>

      <form className="cashier-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer name"
          value={formData.customerName}
          onChange={handleChange}
        />

        <div
          style={{
            gridColumn: "span 2",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <strong style={{ fontSize: "15px", color: "#111827" }}>
            Select services
          </strong>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {services.map((service) => {
              const isSelected = selectedServices.some(
                (item) => String(item.id) === String(service.id)
              );

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleToggleService(service)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: isSelected
                      ? "1px solid #d4af37"
                      : "1px solid #e5e7eb",
                    background: isSelected ? "#d4af37" : "#ffffff",
                    color: isSelected ? "#111827" : "#374151",
                    fontWeight: 700,
                    transition: "0.2s",
                  }}
                >
                  {service.name} - {service.price} EGP
                </button>
              );
            })}
          </div>
        </div>

        <select
          name="barberId"
          value={formData.barberId}
          onChange={handleChange}
        >
          <option value="">Select barber</option>
          {barbers.map((barber) => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="paid"
          placeholder="Paid amount"
          value={formData.paid}
          onChange={handleChange}
        />

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="cash">Cash</option>
          <option value="vodafone_cash">Vodafone Cash</option>
          <option value="card">Card</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <div className="cash-summary">
          <div className="cash-summary-box">
            <span>Total Price</span>
            <strong>{totalPrice} EGP</strong>
          </div>

          <div className="cash-summary-box">
            <span>Remaining</span>
            <strong>{remaining} EGP</strong>
          </div>
        </div>

        <button type="submit">Save Sale</button>
      </form>
    </section>
  );
}