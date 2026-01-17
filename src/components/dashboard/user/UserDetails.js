import React from "react";

const UserDetails = () => {
  return (
    <div className="w-sm bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg">
        <h2 className="text-sm font-semibold tracking-wide">User Info</h2>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-md bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            JD
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Name</p>
            <p className="text-base font-semibold text-gray-900">John Doe</p>

            <p className="text-xs text-gray-500 uppercase mt-2">Email</p>
            <p className="text-sm text-gray-800">john.doe@example.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200" />

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Address</span>
            <span>Bremen, Germany</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined</span>
            <span>Jan 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
