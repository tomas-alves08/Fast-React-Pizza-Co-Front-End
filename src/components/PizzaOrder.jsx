import React, { useEffect, useState, useMemo } from "react";
import { getOrders } from "../utils/PizzaOrderService";
import { DateTime } from "luxon";
import { FaPen, FaTrash } from "react-icons/fa";
import { deleteOrder } from "../utils/PizzaOrderService";

function PizzaOrder({ updatePage, setUpdatePage }) {
  const [pizzaOrders, setPizzaOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState(false);

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
    console.log("CREATED ORDER!!");
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

  //   Object.entries(orderGroup).map((item) => console.log(item));

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            Pizza Orders
          </h1>
          <hr style={{ border: "solid 1px #808080", marginTop: "1.5rem" }} />
          {orderGroup &&
            Object.entries(orderGroup).map((item) => (
              <div
                style={{
                  margin: "4rem auto",
                  width: "60%",
                }}
                key={item[0]}
              >
                <h2 style={{ marginLeft: "1rem" }}>{item[0]}</h2>
                {item[1].map((order) => {
                  const inputTimeStamp = order.deliveryTime;
                  const parsedDateTime = DateTime.fromISO(inputTimeStamp);
                  const formattedTime = parsedDateTime.toFormat("HH:mm");

                  return (
                    <div
                      style={{
                        border: "1px solid black",
                        margin: "1rem",
                        padding: "2rem",
                        borderRadius: "5px",
                        background: "#D3B784",
                        textAlign: "right",
                        fontSize: "1.3rem",
                        boxShadow: "5px 5px 5px #888",
                      }}
                      key={order.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "2rem",
                        }}
                      >
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                          Delivery Time: {formattedTime}
                        </p>
                        <div
                          style={{
                            width: "25%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>Order# {order.id}</p>
                          <div
                            style={{
                              width: "25%",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p
                              style={{ fontSize: "1.5rem", color: "purple" }}
                              onClick={() => handleDelete(order.id)}
                            >
                              <FaPen />
                            </p>
                            <p style={{ fontSize: "1.5rem", color: "red" }}>
                              <FaTrash />
                            </p>
                          </div>
                        </div>
                      </div>
                      {order?.pizzaArr?.map((pizza) => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "1.5rem",
                            width: "50%",
                          }}
                          key={pizza.id}
                        >
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
                        }}
                      >
                        Total Cost: ${order.totalCost}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
        </React.Fragment>
      )}
    </div>
  );
}

export default PizzaOrder;
