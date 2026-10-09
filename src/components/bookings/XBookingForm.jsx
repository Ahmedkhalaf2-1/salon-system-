import { useState } from "react";

export default function BookingForm({ services, barbers, onAddBooking }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    serviceId: "",
    barberId: "",
    date: "",
    time: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { customerName, phone, serviceId, barberId, date, time } = formData;

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !serviceId ||
      !barberId ||
      !date ||
      !time
    ) {
      alert("من فضلك املى كل بيانات الحجز");
      return;
    }

    const selectedService = services.find(
      (service) => String(service.id) === String(serviceId)
    );

    const selectedBarber = barbers.find(
      (barber) => String(barber.id) === String(barberId)
    );

    const newBooking = {
      id: Date.now(),
      customerName: customerName.trim(),
      phone: phone.trim(),
      serviceId,
      serviceName: selectedService?.name || "",
      servicePrice: selectedService?.price || 0,
      barberId,
      barberName: selectedBarber?.name || "",
      date,
      time,
      status: "booked",
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);

    setFormData({
      customerName: "",
      phone: "",
      serviceId: "",
      barberId: "",
      date: "",
      time: "",
    });
  }

  return (
    <section className="booking-card">
      <h2>New Booking</h2>

      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer name"
          value={formData.customerName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
        >
          <option value="">Select service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - {service.price} EGP
            </option>
          ))}
        </select>

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

        <button type="submit">Save Booking</button>
      </form>
    </section>
  );
}