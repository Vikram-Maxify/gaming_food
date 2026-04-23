import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettings,
  updateSettings,
  resetSettingsState,
} from "../redux/slice/settingsSlice";

import { Settings as SettingsIcon, Upload } from "lucide-react";

const Settings = () => {
  const dispatch = useDispatch();

  const { settings, loading, error, success } = useSelector(
    (state) => state.settings
  );

  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setTitle(settings.title || "");
      setPreview(settings.logo || null);
    }
  }, [settings]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

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
  }, [success, dispatch]);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-textPrimary flex items-center gap-2">
          <SettingsIcon className="text-primary" size={22} />
          Website Settings
        </h1>
        <p className="text-sm text-textSecondary">
          Customize your website branding
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-xl bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-6">

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Title */}
          <div>
            <label className="text-xs text-textSecondary mb-1 block">
              Website Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter website title"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary outline-none focus:shadow-glow"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="text-xs text-textSecondary mb-2 block">
              Upload Logo
            </label>

            <label className="flex items-center justify-center gap-2 cursor-pointer bg-[#1A1A1A] border border-borderSubtle rounded-xl2 py-3 text-textSecondary hover:shadow-glow transition">
              <Upload size={16} />
              <span className="text-sm">Choose Image</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-xs text-textSecondary mb-2">Preview</p>

              <div className="bg-[#1A1A1A] border border-borderSubtle rounded-xl2 p-3 w-fit">
                <img
                  src={preview}
                  alt="Logo Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primaryGradient text-white py-2.5 rounded-xl2 shadow-glow hover:shadow-glowHover transition font-medium"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Settings;