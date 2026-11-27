import React from "react";
import { IoCall } from "react-icons/io5";
import { MdCall, MdCallEnd } from "react-icons/md";

const CallSignalScreen = () => {
  return (
    <div className="call-sig-screen">
      <div></div>
      <div className="signaling-center">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/049/633/665/small_2x/playful-cartoon-avatar-of-a-boy-vibrant-and-fun-character-illustration-free-vector.jpg"
          alt="Profile Image"
          className="sig-pfg"
        />
        <div className="sigs-name">John Doe</div>
        <div className="sigs-call-type">Audio Call</div>
      </div>

      <div className="call-actions">
        <button className="btn-call-action danger">
          <MdCall />
        </button>
        <button className="btn-call-action success">
          <MdCallEnd />
        </button>
      </div>
    </div>
  );
};

export default CallSignalScreen;
