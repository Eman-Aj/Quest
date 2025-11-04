import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//Components
import Timer from "./Components/Timer";
import Todolist from "./Components/Todolist";

//Hooks
import handleVisiblity from "./hooks/Visiblity";

//Services
import Notifications from "./Services/Notifications";
import QuoteService from "./Services/QuoteService";

function App() {
  const [notifications, setNotification] = useState(
    localStorage.getItem("notifications")
  );
  const { notify } = Notifications(); //Find Visibility Component Here

  const { removeQuotes } = QuoteService();

  localStorage.getItem("List") == null
    ? null
    : localStorage.setItem("List", JSON.stringify({})); //If theres no list don't get one, if there is get

  return (
    <div className="main-div">
      <button
        className={`notify-button-${notifications}`}
        onClick={() => {
          var status = notifications;
          status = status == "on" ? "off" : "on";
          localStorage.setItem("notifications", status);
          setNotification(status);
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
      <Todolist />

      <button onClick={removeQuotes}> Update Quotes</button>

      <div>
        Inspirational quotes provided by
        <div>
          <a href="https://zenquotes.io/" target="_blank">
            ZenQuotes API
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
