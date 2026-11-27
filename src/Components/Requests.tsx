import React, { useState } from "react";
import type { ConnReq } from "../Pages/User/Home";
import { API } from "../Pages/libs/apiClient";

const Requests: React.FC<{ reqs: ConnReq[] }> = ({ reqs }) => {
  return (
    <div className="mx-4">
      <h2 className="font-black text-2xl p-4">Pending Requests</h2>
      {reqs.map((req, i) => (
        <ConnReqItem _conn={req} key={i} />
      ))}
    </div>
  );
};

const ConnReqItem: React.FC<{ _conn: ConnReq }> = ({ _conn }) => {
  const [respType, setRespType] = useState<string | null>(null);
  const [conn, setConn] = useState(_conn);
  const handleConnectionResponse = async (type: string) => {
    setRespType(type);
    const { error } = await API.post("/conn/respond_conn", {
      type,
      connID: conn.conn_id,
    });
    if (error) {
      alert(error);
      setRespType(null);
      return;
    }
    // setConn({ ...conn, connStatus: "REQ_SENT" });
    setRespType(null);
  };
  return (
    <div className="call-card">
      <div className="flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-4">
          <img
            src={conn.picture}
            className="bg-gray-400 h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <div className="font-medium">{conn.name}</div>
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleConnectionResponse("REJECT")}
            disabled={respType != null}
            className="btn btn-sm"
          >
            {respType == "ACCEPT" ? "Rejecting..." : "Reject"}
          </button>
          <button
            onClick={() => handleConnectionResponse("ACCEPT")}
            disabled={respType != null}
            className="btn btn-sm"
          >
            {respType == "ACCEPT" ? "Accepting..." : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Requests;
