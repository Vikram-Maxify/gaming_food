import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slice/adminSlice";

import { Users as UsersIcon, Shield, User } from "lucide-react";

const Users = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-textPrimary flex items-center gap-2">
          <UsersIcon size={22} className="text-primary" />
          Users Dashboard
        </h1>
        <p className="text-sm text-textSecondary">
          Manage all registered users
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* Total */}
        <div className="bg-cardGradient border border-borderSubtle rounded-xl2 p-5 shadow-soft hover:shadow-glowHover transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textSecondary">Total Users</p>
              <p className="text-2xl font-semibold text-textPrimary mt-1">
                {users.length}
              </p>
            </div>
            <UsersIcon className="text-primary" />
          </div>
        </div>

        {/* Admins */}
        <div className="bg-cardGradient border border-borderSubtle rounded-xl2 p-5 shadow-soft hover:shadow-glowHover transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textSecondary">Admins</p>
              <p className="text-2xl font-semibold text-primary mt-1">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
            <Shield className="text-primary" />
          </div>
        </div>

        {/* Customers */}
        <div className="bg-cardGradient border border-borderSubtle rounded-xl2 p-5 shadow-soft hover:shadow-glowHover transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textSecondary">Customers</p>
              <p className="text-2xl font-semibold text-success mt-1">
                {users.filter((u) => u.role !== "admin").length}
              </p>
            </div>
            <User className="text-success" />
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft overflow-hidden">

        {loading ? (
          <p className="text-center py-6 text-textSecondary">
            Loading users...
          </p>
        ) : error ? (
          <p className="text-center text-danger py-6">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center py-6 text-textSecondary">
            No users found
          </p>
        ) : (

          <table className="w-full text-left border-collapse">

            {/* Header */}
            <thead>
              <tr className="text-textSecondary text-xs border-b border-borderSubtle">
                <th className="p-4">#</th>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-borderSubtle hover:bg-[#1A1A1A] transition"
                >

                  <td className="p-4 text-sm text-textSecondary">
                    {index + 1}
                  </td>

                  <td className="p-4">
                    <div className="text-textPrimary font-medium">
                      {user.name}
                    </div>
                  </td>

                  <td className="p-4 text-textSecondary text-sm">
                    {user.email}
                  </td>

                  <td className="p-4 text-textSecondary text-sm">
                    {user.mobile}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        user.role === "admin"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-success/20 text-success border-success/30"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
};

export default Users;