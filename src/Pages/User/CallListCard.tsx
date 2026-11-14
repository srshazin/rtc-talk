import React from "react";
import {
  FiPhoneIncoming,
  FiPhoneMissed,
  FiPhoneOutgoing,
} from "react-icons/fi";
import { formatTimeAgo } from "../libs/utils";
import { IoCall, IoVideocam } from "react-icons/io5";

const CallListCard: React.FC<{ item: CallListItem }> = ({ item }) => {
  const callTypeIndicator = {
    INCOMING: <FiPhoneIncoming />,
    OUTGOING: <FiPhoneOutgoing />,
    MISSED: <FiPhoneMissed className="text-rose-600" />,
  };

  return (
    <div className="call-card">
      <div className="flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-4">
          <img
            src={item.picture}
            className="bg-gray-400 h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <div className="font-medium">{item.name}</div>
            <div className="flex items-center gap-2">
              {callTypeIndicator[item.type]}{" "}
              <p className="opacity-70">{formatTimeAgo(item.at)}</p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center">
          <button className="btn-icon">
            <IoCall />
          </button>
          <button className="btn-icon">
            <IoVideocam />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallListCard;
