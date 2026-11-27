import React, { useState } from "react";

const ProfileImage: React.FC<{
  uri: string;
  logout: () => void;
}> = ({ uri, logout }) => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div className="relative  max-w-14 flex justify-center">
      <button
        onFocus={() => setShowLogout(true)}
        onBlur={() => setShowLogout(false)}
      >
        <img src={uri} alt="" className="h-pfp cursor-pointer" />
      </button>

      <div
        className="dropdown"
        style={{ display: showLogout ? "block" : "none" }}
      >
        <div className="ddn-item" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
