"use client";

import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoToggle, IoToggleOutline } from "react-icons/io5";
import { updateUserProfile } from "@/lib/firestore";

const Users = ({ usersData = [], onRefresh }) => {
  const [actionLoading, setActionLoading] = useState(null);

  // Toggle upload enabled status
  const handleToggleUpload = async (user) => {
    setActionLoading(user.uid);
    try {
      const success = await updateUserProfile(user.uid, {
        uploadEnabled: !user.uploadEnabled,
      });
      if (success) {
        onRefresh?.();
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    } finally {
      setActionLoading(null);
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Joined
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Upload Enabled
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {usersData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              usersData.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {user.name || "Unnamed"}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role || "artist"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {actionLoading === user.uid ? (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleToggleUpload(user)}
                        className="text-2xl"
                        title={user.uploadEnabled ? "Disable uploads" : "Enable uploads"}
                      >
                        {user.uploadEnabled ? (
                          <IoToggle className="text-green-500" />
                        ) : (
                          <IoToggleOutline className="text-gray-400" />
                        )}
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="rounded-md bg-[#FF4B4B] p-2.5 text-white hover:bg-red-600 transition-colors"
                        title="Delete user"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
