function Footer({ setShowModal, orderObj }) {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  const content = Object.values(orderObj).reduce((acc, value) => {
    if (value === "") {
      return acc;
    } else if (value.qty === "0") {
      return acc;
    }

    acc = acc + Number(value.qty);
    return acc;
  }, 0);

  return (
    <footer className="footer">
      <div className="order">
        <p>
          {new Date().toLocaleTimeString()}. We're currently{" "}
          {isOpen ? "open" : "closed"}
        </p>
        <button
          className={`btn ${!content && "disabled"}`}
          onClick={() => setShowModal(true)}
          disabled={!content}
        >
          Order
        </button>
      </div>
    </footer>
  );
}

export default Footer;
