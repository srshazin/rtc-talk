import React from "react";
import { useAuth } from "../../Contexts/AuthContexts";
import { callList } from "../libs/dummy";
import CallListCard from "./CallListCard";
import { IoSearch } from "react-icons/io5";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="h-dvh w-dvw flex justify-center">
      <div>
        <div className="flex justify-between items-center gap-2 dlekdok">
          <h1 className="font-black text-3xl">RTC Talk</h1>
          <img src={user!.picture} alt="" className="h-pfp" />
        </div>
        <div className="user-panel-wrapper">
          <div className="up-inner">
            <div className="up-pane">
              <h2
                className="font-black text-2xl p-4 backdrop-blur-2xl h-16 sticky top-0 z-10 "
                style={{ borderRadius: "2rem 10px 0 0" }}
              >
                Recent Calls
              </h2>
              <div className="call-list">
                {callList.map((item, index) => (
                  <CallListCard item={item} key={index} />
                ))}
              </div>
            </div>

            <div className="up-pane">
              <h2
                className="font-black text-2xl p-4 backdrop-blur-2xl h-16 sticky top-0 z-10 "
                style={{ borderRadius: "2rem 10px 0 0" }}
              >
                Explore
              </h2>
              <div className="explore-wrapper">
                <div className="p-4">
                  <input
                    type="text"
                    className="input input-explore"
                    placeholder="Name or Email"
                  />
                  <button className="btn btn-pill btn-search">
                    <IoSearch /> Find Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
