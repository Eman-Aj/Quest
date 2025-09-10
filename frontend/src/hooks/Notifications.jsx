import handleVisiblity from "./Visiblity";
import { useRef, useEffect } from "react";
export default function Notifications() {
  const isVisible = handleVisiblity(); //We call the component once! and it returns that varying alue! COOL!
  const isVisibleRef = useRef(isVisible); //We need the useRef so we don't use an older version of isVisible

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const creatNotification = (notificationData) => {
    const title = notificationData.stage;
    const body = "For " + notificationData.time + " Minuets you got this!";
    new Notification(title, {
      body: body,
    });
  };

  //Notifiactions only go when out of tab
  const notify = (notificationData) => {
    if (
      localStorage.getItem("notifications") === "off" ||
      isVisibleRef.current
    ) {
      return;
    }

    if (Notification.permission === "granted") {
      console.log("Sent");
      creatNotification(notificationData);
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permission granted, sending...");
          creatNotification(notificationData);
        } else {
          console.log("Permission denied");
          alert("For best user experience ENABLE NOTIFICATIONS");
        }
      });
    }
  };

  return { notify };
}
