import { useEffect, useState } from "react";
import BookingForm from "../components/bookings/XBookingForm.jsx";
import BookingTable from "../components/bookings/XBookingTable.jsx";
import { getStorageData, setStorageData } from "../utils/storage";

export default function Bookings() {
  const [bookings, setBookings] = useState(() =>
    getStorageData("joe_salon_bookings")
  );
  const [services, setServices] = useState(() =>
    getStorageData("joe_salon_services")
  );
  const [barbers, setBarbers] = useState(() =>
    getStorageData("joe_salon_barbers")
  );

  useEffect(() => {
    setStorageData("joe_salon_bookings", bookings);
  }, [bookings]);

  function handleAddBooking(newBooking) {
    setBookings((prev) => [newBooking, ...prev]);
  }

  function handleDeleteBooking(id) {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  }

  function handleChangeStatus(id, newStatus) {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  }

  function handleMoveToCashier(booking) {
    const existingSales = getStorageData("joe_salon_sales") || [];

    const alreadyMoved = existingSales.some(
      (sale) => String(sale.bookingId) === String(booking.id)
    );

    if (alreadyMoved) {
      alert("الحجز ده متسجل في الكاشير بالفعل");
      return;
    }

    const newSale = {
      id: Date.now(),
      bookingId: booking.id,
      customerName: booking.customerName,
      serviceId: booking.serviceId,
      serviceName: booking.serviceName,
      price: Number(booking.servicePrice || 0),
      barberId: booking.barberId,
      barberName: booking.barberName,
      paid: Number(booking.servicePrice || 0),
      remaining: 0,
      paymentMethod: "cash",
      date: booking.date,
      time: booking.time,
      createdAt: new Date().toISOString(),
    };

    setStorageData("joe_salon_sales", [newSale, ...existingSales]);

    setBookings((prev) =>
      prev.map((item) =>
        item.id === booking.id ? { ...item, status: "done" } : item
      )
    );

    alert("تم نقل الحجز إلى الكاشير بنجاح");
  }

  const noSetupData = services.length === 0 || barbers.length === 0;

  return (
    <div className="bookings-page">
      <section className="page-intro-card">
        <div>
          <span className="soft-chip">Appointments</span>
          <h2>Manage customer bookings</h2>
          <p>
           
          </p>
        </div>
      </section>

      {noSetupData ? (
        <div className="booking-alert">
          <h3>Setup Required</h3>
          <p>
            لازم تضيف خدمة واحدة على الأقل وحلاق واحد على الأقل من صفحة
            Settings قبل ما تبدأ تسجل حجوزات.
          </p>
        </div>
      ) : (
        <>
          <BookingForm
            services={services}
            barbers={barbers}
            onAddBooking={handleAddBooking}
          />

          <BookingTable
            bookings={bookings}
            onDeleteBooking={handleDeleteBooking}
            onChangeStatus={handleChangeStatus}
            onMoveToCashier={handleMoveToCashier}
          />
        </>
      )}
    </div>
  );
}