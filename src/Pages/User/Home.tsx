import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContexts";
import { callList } from "../libs/dummy";
import CallListCard from "./CallListCard";
import { IoSearch } from "react-icons/io5";
import ProfileImage from "../../Components/ProfileImage";
import { useNavigate } from "react-router";
import Search from "../../Components/Search";
import { API } from "../libs/apiClient";
import AuthLoadingScreen from "../../Components/AuthLoadingScreen";
import Requests from "../../Components/Requests";
import Connections from "../../Components/Connections";
import CallSignalScreen from "../../Components/SignalingScreen";

export interface ConnReq {
  id: number;
  name: string;
  picture: string;
  conn_id: number;
}
interface HomeResponse {
  requests: ConnReq[];
  connections: ConnReq[];
}

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<HomeResponse | null>(null);
  const fetchHome = async () => {
    const { data, error } = await API.get("/user/home");
    if (error) return alert(error);
    setData(data);
  };

  useEffect(() => {
    if (data == null) fetchHome();
  }, []);
  if (data == null) return <AuthLoadingScreen />;
  return (
    <div className="h-dvh w-dvw flex justify-center">
      <CallSignalScreen />
      <div>
        <div className="flex justify-between items-center gap-2 dlekdok">
          <h1 className="font-black text-3xl">RTC Talk</h1>
          <ProfileImage
            // logout={() => signOut(() => navigate("/"))}
            logout={() => console.log("HI")}
            uri={user!.picture}
          />
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
              <Search />
              {data.requests.length > 0 && <Requests reqs={data.requests} />}
              {data.connections.length > 0 && (
                <Connections reqs={data.connections} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
