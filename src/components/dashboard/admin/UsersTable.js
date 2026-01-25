"use client";

import { FaRegTrashAlt } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Jack Rax",
    email: "DowntownStreet132@gmail.com",
    createdAt: "2024-01-12",
  },
  {
    id: 2,
    name: "James Park",
    email: "GreenAvenue123@gmail.com",
    createdAt: "2024-02-03",
  },
];

const Users = () => {
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap md:text-sm">
                Member since
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                  {user.createdAt}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="rounded-md bg-[#FF4B4B] p-2.5 text-white">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center sm:hidden">
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
