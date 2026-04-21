import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettings,
  updateSettings,
  resetSettingsState,
} from "../redux/slice/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();

  const { settings, loading, error, success } = useSelector(
    (state) => state.settings
  );

  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔥 Load settings
  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  // 🔥 Set existing data
  useEffect(() => {
    if (settings) {
      setTitle(settings.title || "");
      setPreview(settings.logo || null);
    }
  }, [settings]);

  // 🔥 Logo change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (logo) formData.append("logo", logo);

    dispatch(updateSettings(formData));
  };

  useEffect(() => {
    if (success) {
      alert("Settings updated successfully ✅");
      dispatch(resetSettingsState());
    }
  }, [success]);

  return (
    <div className="p-6 max-w-lg mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        ⚙️ Website Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Website Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter website title"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Logo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-1">Preview:</p>
            <img
              src={preview}
              alt="Logo Preview"
              className="w-24 h-24 object-cover rounded border"
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>

      </form>
    </div>
  );
};

export default Settings;