import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { DateTime } from "luxon";
import { Form } from "react-bootstrap";
import { createOrder } from "../utils/PizzaOrderService";
import "../index.css";

function Modals({ setShowModal, orderObj, setOrderObj, setUpdatePage }) {
  // Set Delivery Time to one hour from now.
  const getNow = () => DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm");
  const deliveryTimeInOneHour = DateTime.fromISO(getNow())
    .plus({ hours: 1 })
    .toFormat("yyyy-MM-dd'T'HH:mm");

  const [totalCost, setTotalCost] = useState(0);
  const [pizzaArr, setPizzaArr] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState(deliveryTimeInOneHour);

  const [order, setOrder] = useState({
    pizzaArr: [],
    totalCost,
    deliveryTime,
  });

  useEffect(() => {
    const pizzasData = Object.entries(orderObj)
      .filter((pizza) => pizza[1] !== "")
      .map((pizza) => ({
        name: pizza[0],
        quantity: Number(pizza[1].qty),
        price: pizza[1].price,
      }));

    setPizzaArr(pizzasData);
  }, [orderObj]);

  useEffect(() => {
    const sum = Object.values(orderObj)
      .filter((pizza) => pizza !== "")
      .reduce((acc, cur) => acc + cur.cost, 0);

    setTotalCost(sum);
  }, [orderObj]);

  const handleDeliveryTime = (e) => {
    setDeliveryTime(e.target.value);
  };

  useEffect(() => {
    setOrder({
      deliveryTime,
      totalCost,
      pizzaArr,
    });
  }, [deliveryTime, totalCost, pizzaArr]);

  const handleSubmit = () => {
    createOrder(order);

    setOrderObj({
      Focaccia: "",
      "Pizza Spinaci": "",
      "Pizza Salamino": "",
      "Pizza Margherita": "",
      "Pizza Funghi": "",
      "Pizza Prosciutto": "",
    });
    setShowModal(false);
    setUpdatePage(true);
  };

  const handleClick = (e) => {
    if (e.target.id === "modal-page") setShowModal(false);
  };

  return (
    <div id="modal-page" onClick={handleClick}>
      <div id="modal-container">
        <h2 style={{ color: "black", fontSize: "2rem" }}>Confirm Order</h2>
        <hr style={{ marginBottom: "3rem" }} />
        {Object.entries(orderObj).map((pizza) => {
          if (pizza[1] === "" || pizza[1].qty === "0") return null;
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1rem 0 0",
                fontSize: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "25rem",
                }}
              >
                <p style={{ marginRight: "0.5rem" }}>{pizza[1].qty}x</p>
                <p>{pizza[0]}</p>
              </div>
              <p style={{ marginLeft: "0.5rem" }}>${pizza[1].cost}</p>
            </div>
          );
        })}
        <div style={{ marginTop: "3rem", textAlign: "right" }}>
          <hr />
          <p
            style={{
              fontSize: "1.8rem",
              margin: "0.5rem 0 3rem",
              fontWeight: "bold",
            }}
          >
            Total Cost: ${order.totalCost}
          </p>
          <Form.Group
            style={{ marginBottom: "1rem" }}
            controlId="formGroupDeliveryTime"
          >
            <Form.Label style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
              Delivery Time
            </Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={handleDeliveryTime}
              name="date"
              value={order.deliveryTime}
            />
          </Form.Group>
          <Button
            style={{
              background: "white",
              border: "1px solid black",
              borderRadius: "5px",
              marginRight: "0.5rem",
            }}
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
            style={{ background: "black", color: "white", borderRadius: "5px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modals;
