import React from "react";
import { isMobile } from "react-device-detect";

const MobileWarning = () => {
  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-4">Optimized for Desktop</h2>
          <p>
            Please access our site from a computer for a smoother experience.
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default MobileWarning;
