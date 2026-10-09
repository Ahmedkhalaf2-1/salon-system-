import { useEffect, useState } from "react";
import CashierForm from "../components/cashier/CashierForm.jsx";
import CashierTable from "../components/cashier/CashierTable.jsx";
import { getStorageData, setStorageData } from "../utils/storage";

export default function Cashier() {
  const [sales, setSales] = useState(() => getStorageData("joe_salon_sales"));
  const [services, setServices] = useState(() =>
    getStorageData("joe_salon_services")
  );
  const [barbers, setBarbers] = useState(() =>
    getStorageData("joe_salon_barbers")
  );

  useEffect(() => {
    setStorageData("joe_salon_sales", sales);
  }, [sales]);

  function handleAddSale(newSale) {
    setSales((prev) => [newSale, ...prev]);
  }

  function handleDeleteSale(id) {
    setSales((prev) => prev.filter((sale) => sale.id !== id));
  }

  const noSetupData = services.length === 0 || barbers.length === 0;

  return (
    <div className="cashier-page">
      <section className="page-intro-card">
        <div>
          <h2>Track sales and cashier activity</h2>

          <p>
            
          </p>
        </div>
      </section>

      {noSetupData ? (
        <div className="cashier-alert">
          <h3>Setup Required</h3>
          <p>
            لازم تضيف خدمة واحدة على الأقل وحلاق واحد على الأقل من صفحة
            Settings قبل ما تبدأ تستخدم الكاشير.
          </p>
        </div>
      ) : (
        <>
          <CashierForm
            services={services}
            barbers={barbers}
            onAddSale={handleAddSale}
          />

          <CashierTable sales={sales} onDeleteSale={handleDeleteSale} />
        </>
      )}
    </div>
  );
}