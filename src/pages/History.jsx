import { useEffect, useMemo, useState } from "react";
import HistoryFilters from "../components/history/HistoryFilters.jsx";
import CustomersList from "../components/history/CustomersList.jsx";
import CustomerHistoryDetails from "../components/history/CustomerHistoryDetails.jsx";
import HistoryStats from "../components/history/HistoryStats.jsx";
import { getStorageData } from "../utils/storage";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getYesterdayDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return formatDate(date);
}

function getTodayDate() {
  return formatDate(new Date());
}

function getLast7DaysDate() {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  return formatDate(date);
}

function getMonthStartDate() {
  const date = new Date();
  date.setDate(1);
  return formatDate(date);
}

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [barberFilter, setBarberFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [datePreset, setDatePreset] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const sales = useMemo(() => getStorageData("joe_salon_sales"), []);

  const barberOptions = useMemo(() => {
    const uniqueBarbers = [
      ...new Set(sales.map((sale) => sale.barberName).filter(Boolean)),
    ];
    return uniqueBarbers.sort((a, b) => a.localeCompare(b));
  }, [sales]);

  function handleDatePresetChange(value) {
    setDatePreset(value);

    if (value === "all") {
      setDateFrom("");
      setDateTo("");
      return;
    }

    if (value === "today") {
      const today = getTodayDate();
      setDateFrom(today);
      setDateTo(today);
      return;
    }

    if (value === "yesterday") {
      const yesterday = getYesterdayDate();
      setDateFrom(yesterday);
      setDateTo(yesterday);
      return;
    }

    if (value === "last7days") {
      setDateFrom(getLast7DaysDate());
      setDateTo(getTodayDate());
      return;
    }

    if (value === "thisMonth") {
      setDateFrom(getMonthStartDate());
      setDateTo(getTodayDate());
    }
  }

  function handleDateFromChange(value) {
    setDatePreset("custom");
    setDateFrom(value);
  }

  function handleDateToChange(value) {
    setDatePreset("custom");
    setDateTo(value);
  }

  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const matchesName = sale.customerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesBarber = barberFilter
        ? sale.barberName === barberFilter
        : true;

      const matchesDateFrom = dateFrom ? sale.date >= dateFrom : true;
      const matchesDateTo = dateTo ? sale.date <= dateTo : true;

      return matchesName && matchesBarber && matchesDateFrom && matchesDateTo;
    });
  }, [sales, searchTerm, barberFilter, dateFrom, dateTo]);

  const stats = useMemo(() => {
    const totalCustomers = new Set(
      filteredSales.map((sale) => sale.customerName).filter(Boolean)
    ).size;

    const totalVisits = filteredSales.length;

    const totalRevenue = filteredSales.reduce(
      (sum, sale) => sum + Number(sale.paid || 0),
      0
    );

    const serviceMap = {};
    const barberMap = {};

    filteredSales.forEach((sale) => {
      if (sale.services && sale.services.length > 0) {
        sale.services.forEach((service) => {
          const serviceName = service?.name?.trim();
          if (serviceName) {
            serviceMap[serviceName] = (serviceMap[serviceName] || 0) + 1;
          }
        });
      } else if (sale.serviceName) {
        serviceMap[sale.serviceName] = (serviceMap[sale.serviceName] || 0) + 1;
      }

      if (sale.barberName) {
        barberMap[sale.barberName] = (barberMap[sale.barberName] || 0) + 1;
      }
    });

    const topService =
      Object.entries(serviceMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    const topBarber =
      Object.entries(barberMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    return {
      totalCustomers,
      totalVisits,
      totalRevenue,
      topService,
      topBarber,
    };
  }, [filteredSales]);

  const customers = useMemo(() => {
    const grouped = {};

    filteredSales.forEach((sale) => {
      const name = sale.customerName?.trim() || "Unknown Customer";

      if (!grouped[name]) {
        grouped[name] = [];
      }

      grouped[name].push(sale);
    });

    const result = Object.entries(grouped).map(([customerName, records]) => {
      const sortedRecords = [...records].sort((a, b) => {
        const first = new Date(`${b.date}T${b.time}`);
        const second = new Date(`${a.date}T${a.time}`);
        return first - second;
      });

      const lastRecord = sortedRecords[0];

      const totalSpent = sortedRecords.reduce(
        (sum, record) => sum + Number(record.paid || 0),
        0
      );

      const serviceCountMap = {};

      sortedRecords.forEach((record) => {
        if (record.services && record.services.length > 0) {
          record.services.forEach((service) => {
            const serviceName = service?.name?.trim();
            if (serviceName) {
              serviceCountMap[serviceName] =
                (serviceCountMap[serviceName] || 0) + 1;
            }
          });
        } else {
          const serviceName = record.serviceName || "Unknown";
          serviceCountMap[serviceName] =
            (serviceCountMap[serviceName] || 0) + 1;
        }
      });

      const favoriteService =
        Object.entries(serviceCountMap).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "-";

      const lastService =
        lastRecord?.services && lastRecord.services.length > 0
          ? lastRecord.services
              .map((service) => service?.name)
              .filter(Boolean)
              .join(" + ")
          : lastRecord?.serviceName || "-";

      return {
        customerName,
        totalVisits: sortedRecords.length,
        lastService,
        lastPaid: lastRecord?.paid || 0,
        lastDate: lastRecord?.date || "-",
        lastTime: lastRecord?.time || "-",
        totalSpent,
        favoriteService,
        records: sortedRecords,
      };
    });

    return result.sort((a, b) => a.customerName.localeCompare(b.customerName));
  }, [filteredSales]);

  useEffect(() => {
    if (customers.length > 0) {
      const stillExists = customers.find(
        (customer) => customer.customerName === selectedCustomer?.customerName
      );

      if (stillExists) {
        setSelectedCustomer(stillExists);
      } else {
        setSelectedCustomer(customers[0]);
      }
    } else {
      setSelectedCustomer(null);
    }
  }, [customers, selectedCustomer]);

  return (
    <div className="history-page">
      <section className="page-intro-card">
        <div>
          <span className="soft-chip">Customer Records</span>
          <h2>Review visit history and payments</h2>
        </div>
      </section>

      <HistoryStats
        totalCustomers={stats.totalCustomers}
        totalVisits={stats.totalVisits}
        totalRevenue={stats.totalRevenue}
        topService={stats.topService}
        topBarber={stats.topBarber}
      />

      <HistoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        barberFilter={barberFilter}
        onBarberFilterChange={setBarberFilter}
        dateFrom={dateFrom}
        onDateFromChange={handleDateFromChange}
        dateTo={dateTo}
        onDateToChange={handleDateToChange}
        barberOptions={barberOptions}
        datePreset={datePreset}
        onDatePresetChange={handleDatePresetChange}
      />

      <div className="history-layout">
        <CustomersList
          customers={customers}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomer}
        />

        <CustomerHistoryDetails customer={selectedCustomer} />
      </div>
    </div>
  );
}