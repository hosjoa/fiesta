"use client";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../Components/Chat"), { ssr: false });
const Twitch = dynamic(() => import("../Components/Twitch"), { ssr: false });
import { useCookies } from "react-cookie";
import * as React from "react";


export default function Home() {
  const [ cookies, setCookies, removeCookie ] = useCookies(['mhjoa']);
  const [selectedPlatform, setSelectedPlatform] = React.useState('twitch');
  const [selectedChannel, setSelectedChannel] = React.useState('');

  const handleSubmit = () => {
    setCookies('mhjoa', {
      platform: selectedPlatform,
      channel: selectedChannel,
    })
  }

  return (
    <main className="h-full">
      {/* Video  */}
      <div className="flex w-full h-full">
        <div className="grow relative">
          {/* Cookie */}
          {cookies.mhjoa ? <div>
            {
              cookies.mhjoa.platform === 'twitch'? <Twitch channel={cookies.mhjoa.channel} /> : <iframe src={`https://player.twitch.tv/?channel=${cookies.mhjoa.channel}&&html5&parent=vercel.app`} frameBorder="0" allowFullScreen={true} scrolling="no" height="100%" width="100%" />
            }
            <button onClick={() => {
              removeCookie('mhjoa')
            }}>Remove Cookie</button>
          </div> : <div className="grid grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">플랫폼</label>
            <select  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="twitch">Twitch</option>
              <option value="kick">Kick</option>
            </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                채널명
              </label>
              <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedChannel}
                  onChange={(event) => {
                    setSelectedChannel(event.target.value)}
                  } />
            </div>

            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>확인</button>
          </div>}
        </div>
        <div className="bg-[#ff0000]"><Chat /></div>
      </div>

    </main>
  )
}
