"use client";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../Components/Chat"), { ssr: false });
const Twitch = dynamic(() => import("../Components/Twitch"), { ssr: false });
import { useCookies } from "react-cookie";
import * as React from "react";

export default function Home() {
  const [cookies, setCookies, removeCookie] = useCookies(["mhjoa"]);
  const [selectedPlatform, setSelectedPlatform] = React.useState("twitch");
  const [selectedChannel, setSelectedChannel] = React.useState("");

  const handleSubmit = () => {
    setCookies("mhjoa", {
      platform: selectedPlatform,
      channel: selectedChannel,
    });
  };

  console.log(cookies.mhjoa);

  return (
    <main className="h-full">
      {/* Video  */}
      <div className="flex w-full h-full">
        <div className="grow relative">
          {/* Cookie */}
          {cookies.mhjoa ? (
            <div className="h-full">
              {cookies.mhjoa.platform === "twitch" ? (
                <Twitch channel={cookies.mhjoa.channel} />
              ) : (
                <iframe
                  src={`https://player.kick.com/${cookies.mhjoa.channel}`}
                  height="100%"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen={true}
                />
              )}
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => {
                    removeCookie("mhjoa");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#9575CD"
                      d="M34,12l-6-6h-8l-6,6h-3v28c0,2.2,1.8,4,4,4h18c2.2,0,4-1.8,4-4V12H34z"
                    ></path>
                    <path
                      fill="#7454B3"
                      d="M24.5 39h-1c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v19C26 38.3 25.3 39 24.5 39zM31.5 39L31.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C33 38.3 32.3 39 31.5 39zM16.5 39L16.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C18 38.3 17.3 39 16.5 39z"
                    ></path>
                    <path
                      fill="#B39DDB"
                      d="M11,8h26c1.1,0,2,0.9,2,2v2H9v-2C9,8.9,9.9,8,11,8z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-sm mx-auto py-10">
              <p className="text-red-500 font-bold text-lg">
                방송 설정후 플랫폼 및 채널을 바꾸고 싶으면 우측 상단 쓰레기통
                버튼을 눌러.
              </p>
              <div className="mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  플랫폼
                </label>
                <select
                  onChange={(event) => {
                    setSelectedPlatform(event.target.value);
                  }}
                  value={selectedPlatform}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="twitch">Twitch</option>
                  <option value="kick">Kick</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  채널명
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedChannel}
                  onChange={(event) => {
                    setSelectedChannel(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </div>
              <div className="mt-5">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <Chat />
        </div>
      </div>
    </main>
  );
}
