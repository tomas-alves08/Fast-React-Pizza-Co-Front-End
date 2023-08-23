import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../index.css";

function Modals({ setShowModal, orderObj, setOrderObj }) {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const sum = Object.values(orderObj)
      .filter((pizza) => pizza !== "")
      .reduce((acc, cur) => acc + cur.cost, 0);

    setTotalCost(sum);
  }, [orderObj]);

  const handleClick = (e) => {
    console.log(document.getElementById("modal-container"), e.target.id);
    if (e.target.id === "modal-page") setShowModal(false);
  };

  const handleSubmit = () => {
    setOrderObj({
      Focaccia: "",
      "Pizza Spinaci": "",
      "Pizza Salamino": "",
      "Pizza Margherita": "",
      "Pizza Funghi": "",
      "Pizza Prosciutto": "",
    });
    setShowModal(false);
  };

  return (
    <div id="modal-page" onClick={handleClick}>
      <div id="modal-container">
        <h2 style={{ color: "black", fontSize: "2rem" }}>Confirm Order</h2>
        <hr style={{ marginBottom: "3rem" }} />
        {Object.entries(orderObj).map((pizza) => {
          if (pizza[1] === "") return null;
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
            Total Cost: ${totalCost}
          </p>
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
