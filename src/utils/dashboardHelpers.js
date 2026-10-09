export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function getTodayBookings(bookings) {
  const today = getTodayDate();
  return bookings.filter((booking) => booking.date === today);
}

export function getTodaySales(sales) {
  const today = getTodayDate();
  return sales.filter((sale) => sale.date === today);
}

export function getTotalRevenueToday(sales) {
  return getTodaySales(sales).reduce(
    (sum, sale) => sum + Number(sale.paid || 0),
    0
  );
}

export function getTopService(sales) {
  if (!sales.length) return "-";

  const map = {};

  sales.forEach((sale) => {
    const key = sale.serviceName || "Unknown";
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map).sort((a, b) => b[1] - a[1])[0][0];
}

export function getTopBarber(sales) {
  if (!sales.length) return "-";

  const map = {};

  sales.forEach((sale) => {
    const key = sale.barberName || "Unknown";
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map).sort((a, b) => b[1] - a[1])[0][0];
}

export function getRecentSales(sales, limit = 5) {
  return [...sales]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, limit);
}

export function getRecentBookings(bookings, limit = 5) {
  return [...bookings]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, limit);
}