import { useEffect } from "react";

import Video from "../components/Video/Video";
import VideoState from "../context/VideoState";

import OptionsClient from "../components/optionsClient/OptionsClient";
import "../index.css"

const HomeClient = () => {
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);
 
 useEffect(()=>{
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
 }, [])
  return (
    <VideoState>
      <div className="App" style={{ height: "100%", width: "100%",}}>
        <div className="logo">
          <image src="logo-sm.png" />
        </div>
        <Video />
        <OptionsClient />
      </div>
    </VideoState>
  );
};

export default HomeClient;
