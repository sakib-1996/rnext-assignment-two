import { useState } from "react";
import CreateOrder from "./components/CreateOrder";
import OrderReports from "./components/OrderReports";
import OrderSummary from "./components/OrderSummary";
import products from "./products.json";

export default function Order() {
  const [order, setOrder] = useState([]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
      <CreateOrder setOrder={setOrder} products={products} />

      <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
        <OrderSummary orders={order} />
        <OrderReports orders={order} />
      </div>
    </div>
  );
}
