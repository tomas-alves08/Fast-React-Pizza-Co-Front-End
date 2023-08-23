import React from "react";
function Pizza(pizzaObj) {
  const { name, ingredients, photoName, price, soldOut } =
    Object.values(pizzaObj)[0];

  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Ingredients: {ingredients}</p>
        <p style={{ fontWeight: "bold" }}>
          {soldOut ? "SOLD OUT!" : `$${price}`}
        </p>
      </div>
    </li>
  );
}

export default Pizza;
