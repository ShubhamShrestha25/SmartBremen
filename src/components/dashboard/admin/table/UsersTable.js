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
      <h1 className="text-lg font-semibold text-gray-800 mb-5 lg:text-2xl">
        Users
      </h1>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600  md:text-sm">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600  md:text-sm">
                Joined
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600  md:text-sm">
                Upload Enabled
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600  md:text-sm">
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
                  <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap md:text-sm">
                    {user.name || "Unnamed"}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap md:text-sm">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
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

                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap md:text-sm">
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
                        title={
                          user.uploadEnabled
                            ? "Disable uploads"
                            : "Enable uploads"
                        }
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
      <p className="mt-3 text-center text-sm sm:hidden">
        Swipe left or right to view the table 👉📱
      </p>
      {/* Pagination */}
      <div className="space-x-2 my-4 text-center">
        <button className="px-3 py-1 text-sm border rounded border-[#6BEE32]">
          1
        </button>

        <button className="px-3 py-1 text-sm border rounded border-gray-300 hover:bg-gray-100">
          2
        </button>

        <button className="px-3 py-1 text-sm border rounded border-gray-300 hover:bg-gray-100">
          3
        </button>
      </div>
    </div>
  );
};

export default Users;
