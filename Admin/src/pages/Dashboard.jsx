import React from "react";

const Dashboard = () => {
  return (
    <div>

      <h2 className="text-lg font-semibold mb-4">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-card p-4 rounded-xl2 shadow-sm">
          <p className="text-xs text-text-secondary">
            Total Orders
          </p>
          <h3 className="text-lg font-semibold">120</h3>
        </div>

        <div className="bg-card p-4 rounded-xl2 shadow-sm">
          <p className="text-xs text-text-secondary">
            Revenue
          </p>
          <h3 className="text-lg font-semibold">₹25,000</h3>
        </div>

        <div className="bg-card p-4 rounded-xl2 shadow-sm">
          <p className="text-xs text-text-secondary">
            Users
          </p>
          <h3 className="text-lg font-semibold">320</h3>
        </div>

        <div className="bg-card p-4 rounded-xl2 shadow-sm">
          <p className="text-xs text-text-secondary">
            Tables Active
          </p>
          <h3 className="text-lg font-semibold">8</h3>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;