import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import handleVisiblity from "./hooks/Visiblity";
import Timer from "./Components/Timer";
import Notifications from "./hooks/Notifications";

function App() {
  const [notifications, setNotification ] = useState(localStorage.getItem("notifications"))
  const {notify} = Notifications(); //Find Visibility Component Here

  
  return (
    <>
      <button
        className={`notify-button-${notifications}`}
        onClick={() => {
          var status = notifications;
          status = status == "on" ? "off" : "on";
          localStorage.setItem("notifications", status);
          setNotification(status)
          console.log(status);
        }}
      >
        Recieve Notifications
      </button>
      <button
        onClick={() => {
          notify("Hello");
        }}
      >
        Test Button
      </button>
      <Timer sendNotification={notify} />
    </>
  );
}

export default App;
