"use client";

import { FaRegTrashAlt } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Broken Road",
    email: "DowntownStreet132@gmail.com",
  },
  {
    id: 2,
    name: "New Park",
    email: "GreenAvenue123@gmail.com",
  },
];

const Users = () => {
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
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {user.name}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.email}
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
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
    </div>
  );
};

export default Users;
