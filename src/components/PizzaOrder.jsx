import React, { useEffect, useState, useMemo } from "react";
import { getOrders } from "../utils/PizzaOrderService";
import { DateTime } from "luxon";
import { FaPen, FaTrash } from "react-icons/fa";
import { deleteOrder } from "../utils/PizzaOrderService";
import ModalUpdate from "./ModalUpdate";
import "../index.css";

function PizzaOrder({ updatePage, setUpdatePage }) {
  const [pizzaOrders, setPizzaOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateOrder, setUpdateOrder] = useState({});
  const [updateInput] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");

  async function loadOrders() {
    try {
      const response = await getOrders();
      setPizzaOrders([...response.data]);
      setLoading(false);
      setDeleteStatus(false);
      setUpdatePage(false);
    } catch (err) {
      console.error("Error loading orders: ", err);
      setLoading(false);
      setDeleteStatus(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    loadOrders();
  }, [deleteStatus, updatePage]);

  const orderGroup = useMemo(() => {
    const groupAll = pizzaOrders?.reduce((groups, pizza) => {
      const date = pizza.deliveryTime;
      const parsedDate = DateTime.fromISO(date);
      const formattedDate = parsedDate.toFormat("dd LLL yyyy");

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push(pizza);
      return groups;
    }, {});

    return groupAll;
  }, [pizzaOrders]);

  async function handleDelete(id) {
    deleteOrder(id);
    setDeleteStatus(true);
  }

  useEffect(() => {
    const newPizzaArr = updateOrder?.pizzaArr?.map((pizza) => {
      if (pizza.id === updateInput.id) {
        return { ...pizza, quantity: updateInput.quantity };
      }
      return pizza;
    });
    setUpdateOrder({ ...updateOrder, pizzaArr: newPizzaArr });
  }, [updateInput]);

  const spinner = (
    <>
      <div className="spinner" style={{ margin: "auto" }} />
    </>
  );

  if (loading) return spinner;

  return (
    <div style={{ width: "100%" }}>
      {updateStatus ? (
        <ModalUpdate
          updateStatus={updateStatus}
          setUpdateStatus={setUpdateStatus}
          setUpdatePage={setUpdatePage}
        />
      ) : (
        <React.Fragment>
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            Pizza Orders
          </h1>
          <hr style={{ border: "solid 1px #808080", marginTop: "1.5rem" }} />
          {orderGroup ? (
            Object.entries(orderGroup).map((item) => (
              <div className="order-container" key={item[0]}>
                <h2 style={{ marginLeft: "1rem" }}>{item[0]}</h2>
                {item[1].map((order) => {
                  const inputTimeStamp = order.deliveryTime;
                  const parsedDateTime = DateTime.fromISO(inputTimeStamp);
                  const formattedTime = parsedDateTime.toFormat("HH:mm");

                  return (
                    <div className="order-card-container" key={order.id}>
                      <div className="order-card-title">
                        <p className="order-number">Order# {order.id}</p>
                        <div className="order-icons-container">
                          <p
                            onClick={() => setUpdateStatus(order.id)}
                            style={{
                              color: "purple",
                              marginRight: "0.5rem",
                            }}
                            className="order-icon"
                          >
                            <FaPen />
                          </p>
                          <p
                            onClick={() => handleDelete(order.id)}
                            style={{
                              color: "red",
                            }}
                            className="order-icon"
                          >
                            <FaTrash />
                          </p>
                        </div>
                      </div>
                      <p className="order-delivery-time">
                        Delivery Time: {formattedTime}
                      </p>
                      {order?.pizzaArr?.map((pizza) => (
                        <div className="order-details-container" key={pizza.id}>
                          <p>
                            {pizza.quantity}x {pizza.name}
                          </p>
                          <p>${pizza.price}</p>
                        </div>
                      ))}
                      <p
                        style={{
                          marginTop: "2rem",
                          fontSize: "1.6rem",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        Total Cost: ${order.totalCost}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                marginTop: "3rem",
                fontSize: "2.5rem",
              }}
            >
              No Existing Pizza Order
            </p>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default PizzaOrder;
