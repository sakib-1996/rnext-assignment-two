import { useState } from "react";
import placeholderImage from "../../../assets/images/placeholder-image.jpg";
export default function CreateOrder({ setOrder, products }) {
  //   const [selectedProducts, setSelectedProducts] = useState([
  //     {
  //       product_id: null,
  //       quantity: null,
  //       price: null,
  //     },
  //   ]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [total, setTotal] = useState(0);

  const isProductSelected = (productId) => {
    return selectedProducts.some((product) => product.product_id === productId);
  };

  const handleIncrement = (product) => {
    if (!isProductSelected(product.id)) {
      setSelectedProducts((prev) => [
        ...prev,
        {
          product_id: product.id,
          quantity: 1,
          price: product.price,
        },
      ]);
      calculateTotal(product.price);
    }
  };

  const handleDecrement = (productId) => {
    // setSelectedProducts((prev) =>
    //   prev.filter((product) => product.product_id !== productId)
    // );
    // calculateTotal();
    // const filtered = selectedProducts.filter(
    //   (product) => product.product_id !== productId
    // );
    // setSelectedProducts(filtered);
    // calculateTotal(filtered);

    const productToRemove = selectedProducts.find(
      (p) => p.product_id === productId
    );
    if (!productToRemove) return;

    setSelectedProducts((prev) =>
      prev.filter((product) => product.product_id !== productId)
    );

    calculateTotal(-productToRemove.price);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };
  const calculateTotal = (price) => {
    setTotal((prev) => {
      const newTotal = Number(prev) + Number(price);
      return newTotal.toFixed(2);
    });
  };

  const handlePlaceOrder = () => {
    if (selectedProducts.length === 0 || customerName === "") {
      return;
    }
    setOrder((prev) => [
      ...prev,
      {
        customer_name: customerName,
        total: total,
        products: selectedProducts,
        status: "pending",
      },
    ]);

    setSelectedProducts([]);
    setCustomerName("");
    setTotal(0);
  };

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          name="customer_name"
          onChange={handleCustomerNameChange}
          value={customerName}
          type="text"
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center mr-3">
                  <img
                    src={product.image || placeholderImage}
                    alt={product.name}
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-400">BDT {product.price}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  isProductSelected(product.id)
                    ? handleDecrement(product.id)
                    : handleIncrement(product);
                }}
                className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                {isProductSelected(product.id) ? (
                  <DecrementSvg />
                ) : (
                  <IncrementSvg />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        title={total === 0 ? "Please select at least one product" : ""}
        onClick={handlePlaceOrder}
        className={`w-full bg-primary hover:bg-opacity-90
        text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg
          transform hover:-translate-y-1 ${
            selectedProducts.length === 0 || customerName === ""
              ? "opacity-50 cursor-not-allowed"
              : " cursor-pointer"
          }`}
      >
        Place Order (BDT {parseFloat(total).toFixed(2)})
      </button>
    </div>
  );
}
export function DecrementSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-red-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export function IncrementSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
