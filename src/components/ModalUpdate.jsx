import { useState, useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { updateOrder, getOrder } from "../utils/PizzaOrderService";
import { getPizzas } from "../utils/PizzasService";
import "../index.css";

function ModalUpdate({ updateStatus, setUpdateStatus, setUpdatePage }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pizzaData, setPizzaData] = useState(null);
  const [orderInfo, setOrderInfo] = useState(pizzaData);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(true);

  useMemo(async () => {
    const orders = await getOrder(updateStatus);
    const pizzas = await getPizzas();
    setSelectedOrder(orders?.data);
    setPizzaData(orders?.data.pizzaArr);
    setOrderInfo(pizzas?.data);
    setLoading(false);
  }, [updateStatus]);

  const reducedOrderInfo = orderInfo?.reduce((acc, curInfo) => {
    acc = [...acc, { ...curInfo, pizzaOrderId: updateStatus, id: 0 }];

    for (const key of selectedOrder.pizzaArr) {
      if (curInfo.name === key.name) {
        const length = acc.length;
        acc[length - 1] = { ...curInfo, ...key };
      }
    }

    return acc;
  }, []);

  useEffect(() => {
    setSelectedOrder({
      ...selectedOrder,
      pizzaArr: reducedOrderInfo,
    });
  }, [orderInfo]);

  useEffect(() => {
    setSelectedOrder({
      ...selectedOrder,
      deliveryTime,
    });
  }, [deliveryTime]);

  const handleInput = (e) => {
    const index = selectedOrder.pizzaArr.findIndex(
      (pizza) => pizza.name === e.target.name
    );
    let newPizzaArr = [...selectedOrder.pizzaArr];
    newPizzaArr[index].quantity = Number(e.target.value);
    setInput({ name: e.target.name, value: e.target.value });

    const reduceResult = selectedOrder.pizzaArr.reduce((acc, pizza) => {
      acc = acc + pizza.price * pizza.quantity;
      return acc;
    }, 0);

    setSelectedOrder({
      ...selectedOrder,
      totalCost: reduceResult,
      pizzaArr: newPizzaArr,
    });
  };

  const handleDeliveryTime = (e) => {
    setDeliveryTime(e.target.value);
  };
  const handleSubmit = () => {
    updateOrder(updateStatus, selectedOrder);
    setUpdateStatus("");
    setUpdatePage(true);
  };

  const handleClick = (e) => {
    if (e.target.id === "modal-page") setUpdateStatus("");
  };

  const spinner = (
    <>
      <div className="spinner" style={{ margin: "auto" }} />
    </>
  );

  if (loading) return spinner;
  return (
    <div id="modal-page" onClick={handleClick}>
      <div id="modal-container">
        <h2 style={{ color: "black", fontSize: "2rem" }}>
          Update Pizza Order {updateStatus}
        </h2>
        <hr style={{ marginBottom: "3rem" }} />
        {selectedOrder?.pizzaArr?.map((pizza) => {
          if (pizza.soldOut === true) return null;
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
                <input
                  style={{
                    width: "2rem",
                    borderRadius: "5px",
                    border: "1px black solid",
                    textAlign: "center",
                    marginRight: "0.5rem",
                  }}
                  onChange={handleInput}
                  name={pizza.name}
                  value={
                    input?.name === pizza.name
                      ? input?.value
                      : Number(pizza?.quantity)
                  }
                />
                <p>{pizza.name}</p>
              </div>
              <p style={{ marginLeft: "0.5rem" }}>${pizza.price}</p>
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
            Total Cost: ${selectedOrder?.totalCost}
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
              value={deliveryTime || selectedOrder?.deliveryTime}
            />
          </Form.Group>
          <Button
            style={{
              background: "white",
              border: "1px solid black",
              borderRadius: "5px",
              marginRight: "0.5rem",
            }}
            onClick={() => setUpdateStatus("")}
          >
            Close
          </Button>
          <Button
            style={{ background: "black", color: "white", borderRadius: "5px" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
