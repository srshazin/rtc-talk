import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { API } from "../Pages/libs/apiClient";
import { FiUserPlus } from "react-icons/fi";

interface CONN {
  id: number;
  name: string;
  picture: string;
  connStatus: "CONNECTED" | "REQ_SENT" | "REQ_RCVD" | "DEFAULT";
}

const Search = () => {
  const [searchQ, setSearchQ] = useState("");
  const [foundConns, setFoundConns] = useState<CONN[] | null>(null);
  const handleSearch = async () => {
    const { data, error } = await API.get("/conn/search?q=" + searchQ);
    if (error) return alert(error);
    setFoundConns(data);
  };
  const [loading, setLoading] = useState(false);
  return (
    <div className="explore-wrapper">
      <div className="p-4">
        <input
          onChange={(e) => setSearchQ(e.target.value)}
          value={searchQ}
          type="text"
          className="input input-explore"
          placeholder="Name or Email"
        />
        <button
          className="btn btn-pill btn-search"
          disabled={loading}
          onClick={handleSearch}
        >
          <IoSearch /> {loading ? "Finding..." : "Find Connection"}
        </button>
      </div>
      {foundConns &&
        (foundConns.length == 0 ? (
          <div className="opacity-70 text-center">No Connection Found</div>
        ) : (
          <div className="px-4">
            {foundConns.map((conn, index) => (
              <SearchResultItem _conn={conn} key={index} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Search;

const SearchResultItem: React.FC<{ _conn: CONN }> = ({ _conn }) => {
  const [connSending, setConnSending] = useState(false);
  const [conn, setConn] = useState(_conn);
  const handleSendConnection = async () => {
    setConnSending(true);
    const { error } = await API.post("/conn/send_request", {
      to: conn.id,
    });
    if (error) return alert(error);
    setConn({ ...conn, connStatus: "REQ_SENT" });
    setConnSending(false);
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
        <div className="flex items-center">
          {conn.connStatus == "CONNECTED" ? (
            <>Connected</>
          ) : conn.connStatus == "REQ_RCVD" ? (
            <>Connection Received</>
          ) : conn.connStatus == "REQ_SENT" ? (
            <button disabled>Request Sent</button>
          ) : (
            <div className="btn" onClick={handleSendConnection}>
              {connSending ? (
                "Sending Req..."
              ) : (
                <>
                  <FiUserPlus />
                  Connect
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
