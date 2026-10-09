export default function HistoryFilters({
  searchTerm,
  onSearchChange,
  barberFilter,
  onBarberFilterChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  barberOptions,
  datePreset,
  onDatePresetChange,
}) {
  return (
    <section className="history-card">
      <div className="history-filters-grid">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          value={barberFilter}
          onChange={(e) => onBarberFilterChange(e.target.value)}
        >
          <option value="">All barbers</option>
          {barberOptions.map((barber) => (
            <option key={barber} value={barber}>
              {barber}
            </option>
          ))}
        </select>

        <select
          value={datePreset}
          onChange={(e) => onDatePresetChange(e.target.value)}
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="custom">Custom Range</option>
        </select>

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
        />

        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
        />
      </div>
    </section>
  );
}