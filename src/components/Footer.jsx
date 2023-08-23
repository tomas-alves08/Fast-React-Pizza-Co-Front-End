function Footer({ setShowModal }) {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      <div className="order">
        <p>
          {new Date().toLocaleTimeString()}. We're currently{" "}
          {isOpen ? "open" : "closed"}
        </p>
        <button className="btn" onClick={() => setShowModal(true)}>
          Order
        </button>
      </div>
    </footer>
  );
}

export default Footer;
