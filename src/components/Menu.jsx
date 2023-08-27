import React from "react";
import Pizza from "./Pizza";
import { pizzaData } from "./pizza-utils";
import { Form, InputGroup } from "react-bootstrap";
import "../index.css";

function Menu({ orderObj, setOrderObj }) {
  const handleChange = (e) => {
    setOrderObj({
      ...orderObj,
      [e.target.name]: {
        qty: e.target.value,
        cost: Number(e.target.value) * Number(e.target.getAttribute("price")),
        price: Number(e.target.getAttribute("price")),
      },
    });

    if (e.target.value === "")
      setOrderObj({
        ...orderObj,
        [e.target.name]: "",
      });
  };

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      <React.Fragment>
        <p>
          Authentic Italian cuisine. 6 creative dishes to choose from. All from
          our stone oven, all organic, all delicious.
        </p>
        <ul className="pizzas">
          {pizzaData.map((pizza) => {
            const soldOut = pizza.soldOut;
            const valueItem = Object.entries(orderObj).find(
              (name) => name[0] === pizza.name
            );

            return (
              <div
                key={pizza.name}
                style={{ display: "flex", alignItems: "center" }}
              >
                <InputGroup>
                  <Form.Label style={{ fontSize: "1.5rem" }}>Qty</Form.Label>
                  <Form.Control
                    style={{
                      padding: "0.5rem",
                      width: "3rem",
                      marginRight: "0.5rem",
                      textAlign: "center",
                    }}
                    type="text"
                    name={pizza.name}
                    value={valueItem[1].qty || ""}
                    onChange={handleChange}
                    price={pizza.price}
                    disabled={soldOut}
                  />
                </InputGroup>
                <Pizza key={pizza.name} pizzaObj={pizza} />
              </div>
            );
          })}
        </ul>
      </React.Fragment>
    </main>
  );
}

export default Menu;
