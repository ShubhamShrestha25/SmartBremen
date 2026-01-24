import React from "react";

const UserDetails = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 sm:w-sm">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg">
        <h2 className="text-xs font-semibold tracking-wide sm:text-sm">
          User Info
        </h2>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-md bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 sm:h-20 sm:w-20">
            JD
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase sm:text-xs">
              Name
            </p>
            <p className="text-sm font-semibold text-gray-900 sm:text-base">
              John Doe
            </p>

            <p className="text-[10px] text-gray-500 uppercase mt-2 sm:text-xs">
              Email
            </p>
            <p className="text-xs text-gray-800 sm:text-sm">
              john.doe@example.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200" />

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="font-medium">Address</span>
            <span>Bremen, Germany</span>
          </div>

          <div className="flex justify-between text-sm sm:text-base">
            <span className="font-medium">Joined</span>
            <span>Jan 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
