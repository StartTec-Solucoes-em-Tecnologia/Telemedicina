import { useEffect } from "react";

import Video from "./components/Video/Video";
import VideoState from "./context/VideoState";

import Options from "./components/options/Options";

const Home = () => {
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
      <div className="App" style={{ height: "100%", width: "100%" }}>
        <div className="logo">
          <img src="logo-sm.png" style={{width: "45%", height: "45%"}} />
        </div>
        <div style={{marginBottom: "5rem"}}/>
        <Video />
        <Options />
      </div>
    </VideoState>
  );
};

export default Home;
