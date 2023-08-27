import { useState } from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import Modals from "./components/Modals";
import PizzaOrder from "./components/PizzaOrder";

function App() {
  const [orderObj, setOrderObj] = useState({
    Focaccia: "",
    "Pizza Spinaci": "",
    "Pizza Salamino": "",
    "Pizza Margherita": "",
    "Pizza Funghi": "",
    "Pizza Prosciutto": "",
  });
  const [showModal, setShowModal] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  console.log(updatePage);

  return (
    <div className="container">
      {showModal && (
        <Modals
          setShowModal={setShowModal}
          orderObj={orderObj}
          setOrderObj={setOrderObj}
          updatePage={updatePage}
          setUpdatePage={setUpdatePage}
        />
      )}
      <Header />
      <Menu orderObj={orderObj} setOrderObj={setOrderObj} />

      <Footer setShowModal={setShowModal} />
      <PizzaOrder updatePage={updatePage} setUpdatePage={setUpdatePage} />
    </div>
  );
}

export default App;
