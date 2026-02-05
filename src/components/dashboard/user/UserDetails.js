import React from "react";

const UserDetails = ({ userProfile }) => {
  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "XX";

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .filter(Boolean)
      .filter((_, index, arr) => index === 0 || index === arr.length - 1)
      .join("")
      .toUpperCase();
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full  bg-white rounded-lg shadow-lg border border-gray-200 sm:w-fit sm:min-w-sm">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg">
        <h2 className="text-xs font-semibold tracking-wide sm:text-sm">
          User Info
        </h2>
      </div>
      <div className="p-5">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="h-20 w-20 rounded-md bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            {getInitials(userProfile?.name)}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Name</p>
            <p className="text-sm font-semibold text-gray-900 sm:text-base">
              {userProfile?.name || "Unknown User"}
            </p>

            <p className="text-xs text-gray-500 uppercase mt-2 truncate">
              Email
            </p>
            <p className="text-sm text-gray-800">
              {userProfile?.email || "No email"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200" />

        <div className="space-y-2 text-xs text-gray-700 sm:text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Role</span>
            <span className="capitalize">{userProfile?.role || "artist"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Upload Access</span>
            <span
              className={
                userProfile?.uploadEnabled ? "text-green-600" : "text-red-600"
              }
            >
              {userProfile?.uploadEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined</span>
            <span>{formatDate(userProfile?.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
