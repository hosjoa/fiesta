"use client";
import Chat from "@/app/Components/Chat";
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
        <div className="grow">
          {/* Cookie */}
          {cookies.mhjoa ? <div>
            {
              cookies.mhjoa.platform === 'twitch'? <iframe src={`https://player.twitch.tv/?channel=${cookies.mhjoa.channel}&&html5&parent=vercel.app`} frameBorder="0" allowFullScreen={true} scrolling="no" height="100%" width="100%" /> : <iframe src={`https://player.twitch.tv/?channel=${cookies.mhjoa.channel}&&html5&parent=localhost`} frameBorder="0" allowFullScreen={true} scrolling="no" height="100%" width="100%" />
            }
            <button onClick={() => {
              removeCookie('mhjoa')
            }}>Remove Cookie</button>
          </div> : <>
            <select>
              <option value="kick">KICK</option>
              <option value="twitch">TWITCH</option>
            </select>
            <input
                value={selectedChannel}
                onChange={(event) => {
                  setSelectedChannel(event.target.value)}
            } />
            <button onClick={handleSubmit}>Submit</button>
          </>}


        </div>
        <div className="bg-[#ff0000]"><Chat /></div>
      </div>

    </main>
  )
}
