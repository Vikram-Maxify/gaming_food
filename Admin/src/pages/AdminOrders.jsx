import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5002");

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 👨‍💼 join admin room
    socket.emit("joinAdmin");

    // 🔥 new order
    socket.on("newOrder", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    // 🪑 table selected
    socket.on("tableSelected", (data) => {
      console.log("Table:", data);
    });

    return () => {
      socket.off("newOrder");
      socket.off("tableSelected");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Live Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((o) => (
        <div
          key={o._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Table: {o.tableNumber}</h3>
          <p>User: {o.user?.name}</p>
          <p>Total Credits: {o.totalCredits}</p>

          <ul>
            {o.items.map((item, i) => (
              <li key={i}>
                {item.product?.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;