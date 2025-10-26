import React, { memo } from "react";

const UserSkeleton = () => {
  return (
    <div className="px-4 flex items-center gap-3 py-2 animate-pulse">
      {/* Avatar skeleton */}
      <div className="rounded-full bg-gray-300 size-10" />

      {/* Text skeletons */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Button skeleton */}
      <div className="ml-auto size-9 rounded-full bg-gray-300" />
    </div>
  );
};

export default memo(UserSkeleton);
