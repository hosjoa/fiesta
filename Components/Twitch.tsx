"use client";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

export default function Twitch({ channel} : {channel: string}) {

  return (
        <ReactTwitchEmbedVideo channel={channel} height="100%" width="100%" />
  );
}
