import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../utils/storage";

export default function Settings() {
  const [services, setServices] = useState(() =>
    getStorageData("joe_salon_services")
  );
  const [barbers, setBarbers] = useState(() =>
    getStorageData("joe_salon_barbers")
  );

  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const [barberName, setBarberName] = useState("");
  const [barberPhone, setBarberPhone] = useState("");

  useEffect(() => {
    setStorageData("joe_salon_services", services);
  }, [services]);

  useEffect(() => {
    setStorageData("joe_salon_barbers", barbers);
  }, [barbers]);

  function handleAddService(e) {
    e.preventDefault();

    if (!serviceName.trim() || !servicePrice.trim()) {
      alert("من فضلك اكتب اسم الخدمة والسعر");
      return;
    }

    const newService = {
      id: Date.now(),
      name: serviceName.trim(),
      price: Number(servicePrice),
    };

    setServices((prev) => [newService, ...prev]);
    setServiceName("");
    setServicePrice("");
  }

  function handleDeleteService(id) {
    setServices((prev) => prev.filter((service) => service.id !== id));
  }

  function handleAddBarber(e) {
    e.preventDefault();

    if (!barberName.trim() || !barberPhone.trim()) {
      alert("من فضلك اكتب اسم الحلاق ورقم التليفون");
      return;
    }

    const newBarber = {
      id: Date.now(),
      name: barberName.trim(),
      phone: barberPhone.trim(),
    };

    setBarbers((prev) => [newBarber, ...prev]);
    setBarberName("");
    setBarberPhone("");
  }

  function handleDeleteBarber(id) {
    setBarbers((prev) => prev.filter((barber) => barber.id !== id));
  }

  return (
    <div className="settings-page">
      <section className="page-intro-card">
        <div>
          <span className="soft-chip">Salon Setup</span>
          <h2>Configure services and barbers</h2>
         
        </div>
      </section>

      <div className="settings-grid">
        <section className="settings-card">
          <h2>Add Service</h2>

          <form className="settings-form" onSubmit={handleAddService}>
            <input
              type="text"
              placeholder="Service name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
            />

            <button type="submit">Add Service</button>
          </form>

          <div className="list-box">
            {services.length === 0 ? (
              <p className="empty-text">No services added yet.</p>
            ) : (
              services.map((service) => (
                <div className="list-item" key={service.id}>
                  <div>
                    <h4>{service.name}</h4>
                    <p>{service.price} EGP</p>
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="settings-card">
          <h2>Add Barber</h2>

          <form className="settings-form" onSubmit={handleAddBarber}>
            <input
              type="text"
              placeholder="Barber name"
              value={barberName}
              onChange={(e) => setBarberName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone number"
              value={barberPhone}
              onChange={(e) => setBarberPhone(e.target.value)}
            />

            <button type="submit">Add Barber</button>
          </form>

          <div className="list-box">
            {barbers.length === 0 ? (
              <p className="empty-text">No barbers added yet.</p>
            ) : (
              barbers.map((barber) => (
                <div className="list-item" key={barber.id}>
                  <div>
                    <h4>{barber.name}</h4>
                    <p>{barber.phone}</p>
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteBarber(barber.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}