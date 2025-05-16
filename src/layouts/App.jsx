import Order from "../pages/order/Order";
import Header from "./header";

function App() {
  return (
    <>
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <Header />
        <Order />
      </div>
    </>
  );
}

export default App;
