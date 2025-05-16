import { useState } from "react";
export default function OrderReports({ orders, setOrders }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Order Reports</h2>
        <Filter setStatusFilter={setStatusFilter} />
      </div>
      <div className="bg-cardbg rounded-lg p-4">
        <div className="reports-container">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer Name</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium w-40">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.length !== 0 ? (
                filteredOrders.map((order, index) => (
                  <OrderItem
                    key={index}
                    order={order}
                    index={index}
                    setOrders={setOrders}
                    orders={orders}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-3 text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Filter({ setStatusFilter }) {
  return (
    <div className="flex gap-4 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-funnel-icon lucide-funnel"
      >
        <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
      </svg>
      <select
        className="appearance-none bg-zinc-900 accent-orange-600 border-none outline-none rounded-sm"
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>
  );
}

function OrderItem({ order, index, setOrders, orders }) {
  const handleStatusChange = (newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };
  const handleDelete = () => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };
  return (
    <tr className="border-t border-gray-700">
      <td className="py-3">{order.id || index + 1}</td>
      <td className="py-3">{order.customer_name}</td>
      <td className="py-3">{order.products?.length}</td>
      <td className="py-3">{order.total}</td>
      <td className="py-3">
        <span className="text-red-500 uppercase">{order.status}</span>
      </td>
      <td className="py-3">
        <button
          onClick={handleDelete}
          className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300 cursor-pointer"
        >
          Delete
        </button>
        {order.status === "pending" && (
          <button
            onClick={() => handleStatusChange("delivered")}
            className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300 cursor-pointer"
          >
            DELIVER
          </button>
        )}
      </td>
    </tr>
  );
}
