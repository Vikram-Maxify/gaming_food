// src/pages/AdminProfile.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile } from "../redux/slice/adminSlice";
import { User, Mail, Phone, Shield, Calendar } from "lucide-react";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { admin, loading } = useSelector((state) => state.admin);

  // 🔥 Fetch admin profile on load
  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-red-500">No admin data found</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        👤 Admin Profile
      </h2>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        {/* Avatar & Basic Info */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-orange-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {admin.name || "Admin"}
            </h3>
            <span className="inline-flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-full mt-1">
              <Shield size={14} />
              {admin.role || "admin"}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {/* Mobile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Mobile Number</p>
              <p className="text-sm font-medium text-gray-900">
                {admin.mobile || "Not set"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-sm font-medium text-gray-900">
                {admin.email || "Not set"}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {admin.role || "admin"}
              </p>
            </div>
          </div>

          {/* Created At */}
          {admin.createdAt && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(admin.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Card */}
      <div className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <h4 className="text-lg font-semibold mb-4">Quick Stats</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-xs text-white/80">Account Status</p>
            <p className="text-lg font-bold">Active</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-xs text-white/80">Access Level</p>
            <p className="text-lg font-bold capitalize">
              {admin.role || "Admin"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;