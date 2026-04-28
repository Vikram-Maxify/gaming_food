import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile } from "../redux/slice/adminSlice";

import { User, Mail, Phone, Shield, Calendar } from "lucide-react";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { admin, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center text-textSecondary">
        Loading profile...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-6 flex items-center justify-center text-danger">
        No admin data found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-textPrimary flex items-center gap-2">
          <User className="text-primary" size={22} />
          Admin Profile
        </h2>
        <p className="text-sm text-textSecondary">
          Manage your personal details
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-6">

        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-borderSubtle">

          <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-borderSubtle">
            <User className="w-10 h-10 text-primary" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textPrimary">
              {admin.name || "Admin"}
            </h3>

            <span className="inline-flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full mt-1 border border-primary/30">
              <Shield size={12} />
              {admin.role || "admin"}
            </span>
          </div>

        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Mobile */}
          <Detail
            icon={<Phone size={16} />}
            label="Mobile Number"
            value={admin.mobile || "Not set"}
          />

          {/* Email */}
          <Detail
            icon={<Mail size={16} />}
            label="Email Address"
            value={admin.email || "Not set"}
          />

          {/* Role */}
          <Detail
            icon={<Shield size={16} />}
            label="Role"
            value={admin.role || "admin"}
          />

          {/* Created */}
          {admin.createdAt && (
            <Detail
              icon={<Calendar size={16} />}
              label="Member Since"
              value={new Date(admin.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          )}

        </div>

      </div>

      {/* Stats Card */}
      <div className="bg-cardGradient border border-borderSubtle rounded-xl2 p-6 shadow-soft">

        <h4 className="text-lg font-semibold text-textPrimary mb-4">
          Quick Stats
        </h4>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-[#1A1A1A] border border-borderSubtle rounded-xl2 p-4">
            <p className="text-xs text-textSecondary">Account Status</p>
            <p className="text-lg font-semibold text-success mt-1">
              Active
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-borderSubtle rounded-xl2 p-4">
            <p className="text-xs text-textSecondary">Access Level</p>
            <p className="text-lg font-semibold text-primary mt-1 capitalize">
              {admin.role || "Admin"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

// 🔥 Reusable Detail Component
const Detail = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 p-3">

    <div className="w-9 h-9 flex items-center justify-center bg-black/40 rounded-lg text-textSecondary">
      {icon}
    </div>

    <div>
      <p className="text-xs text-textSecondary">{label}</p>
      <p className="text-sm text-textPrimary font-medium">{value}</p>
    </div>

  </div>
);

export default AdminProfile;