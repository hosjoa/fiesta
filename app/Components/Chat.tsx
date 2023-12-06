import React, { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    let uChatScript = document.createElement("script");
    uChatScript.src = "//client.uchat.io/uchat.js";
    uChatScript.async = true;
    document.body.append(uChatScript);
    return () => {
      uChatScript.remove();
    };
  }, []);
  return (
      // @ts-ignore
      <u-chat room="fiestajoa" style={{ width: "100%", height: "100%" }} />
  );
}
