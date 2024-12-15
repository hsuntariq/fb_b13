import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function randomID(len) {
  let result = "";
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall() {
  const { sender_id, receiver_id } = useParams();
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const meetingRef = React.useRef(null); // Create a ref for the container div

  React.useEffect(() => {
    const myMeeting = async () => {
      // generate Kit Token
      const appID = 1020434062;
      const serverSecret = "ca3c40b036670ddf0f74eb5e81a89361";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        randomID(5)
      );

      // Create instance object from Kit Token
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // Start the call
      const url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID;

      zp.joinRoom({
        container: meetingRef.current, // Use the ref here
        sharedLinks: [
          {
            name: "Personal link",
            url: url,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
      socket.emit("incoming-video", { sender_id, receiver_id, url });

      // Emit the socket event once
    };

    myMeeting();
  }, []); // Dependency array ensures it runs only once when mounted

  return (
    <div ref={meetingRef} style={{ width: "100vw", height: "100vh" }}></div>
  );
}
