import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOtpSettings = () => {
  const [form, setForm] = useState({
    provider: "2factor",
    is2FactorActive: true,
    isFast2SMSActive: true,
    twoFactorApiKey: "",
    fast2smsApiKey: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch existing settings
  const fetchSettings = async () => {
    try {
      const res = await axios.get("/api/admin/otp-settings");
      if (res.data.settings) {
        setForm(res.data.settings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // 🔹 Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/admin/otp-settings", form);
      alert("Settings Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Error updating settings");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">OTP Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Provider */}
          <div>
            <label className="block font-medium">Primary Provider</label>
            <select
              name="provider"
              value={form.provider}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="2factor">2Factor</option>
              <option value="fast2sms">Fast2SMS</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between">
            <label>2Factor Active</label>
            <input
              type="checkbox"
              name="is2FactorActive"
              checked={form.is2FactorActive}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Fast2SMS Active</label>
            <input
              type="checkbox"
              name="isFast2SMSActive"
              checked={form.isFast2SMSActive}
              onChange={handleChange}
            />
          </div>

          {/* API Keys */}
          <div>
            <label className="block font-medium">2Factor API Key</label>
            <input
              type="text"
              name="twoFactorApiKey"
              value={form.twoFactorApiKey}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter 2Factor API Key"
            />
          </div>

          <div>
            <label className="block font-medium">Fast2SMS API Key</label>
            <input
              type="text"
              name="fast2smsApiKey"
              value={form.fast2smsApiKey}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter Fast2SMS API Key"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminOtpSettings;
