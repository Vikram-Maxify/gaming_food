import React, { useState } from "react";

const CoinManage = () => {
  const [coinsPer100, setCoinsPer100] = useState(10);

  // Preview calculation
  const previewAmount = 500;
  const earnedCoins = (previewAmount / 100) * coinsPer100;

  return (
    <div>

      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Coin Management
      </h2>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm max-w-md">

        {/* Input */}
        <label className="text-sm text-gray-600 mb-1 block">
          Coins per ₹100 spend
        </label>

        <input
          type="number"
          value={coinsPer100}
          onChange={(e) => setCoinsPer100(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-500"
        />

        {/* Info */}
        <p className="text-xs text-gray-500 mt-2">
          Example: If user spends ₹100, they will earn {coinsPer100} coins
        </p>

        {/* Preview */}
        <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm">
          <p className="text-gray-600">
            On ₹{previewAmount} order:
          </p>
          <p className="font-semibold text-gray-900">
            User earns {earnedCoins} coins
          </p>
        </div>

        {/* Save Button */}
        <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg text-sm">
          Save Settings
        </button>

      </div>

    </div>
  );
};

export default CoinManage;