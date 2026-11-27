import React, { useState } from "react";
import type { ConnReq } from "../Pages/User/Home";
import { API } from "../Pages/libs/apiClient";
import { IoCall, IoVideocam } from "react-icons/io5";

const Connections: React.FC<{ reqs: ConnReq[] }> = ({ reqs }) => {
  return (
    <div className="mx-4">
      <h2 className="font-black text-2xl p-4">My Connections</h2>
      {reqs.map((req, i) => (
        <ConnReqItem _conn={req} key={i} />
      ))}
    </div>
  );
};

const ConnReqItem: React.FC<{ _conn: ConnReq }> = ({ _conn }) => {
  const [connSending, setConnSending] = useState(false);
  const [conn, setConn] = useState(_conn);

  return (
    <div className="call-card">
      <div className="flex justify-between items-center gap-2">
        {/* Left */}
        <div className="flex items-center gap-4 flex-1">
          <img
            src={conn.picture}
            className="bg-gray-400 h-10 w-10 rounded-full"
          />
          <div
            className="flex flex-col flex-1 whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ maxWidth: "275px" }}
          >
            <div className="font-medium w-full">{conn.name}</div>
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-2">
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

export default Connections;
