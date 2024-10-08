import React, { useState, useEffect } from 'react';
import { Power, VolumeX, Volume2, ChevronUp, ChevronDown } from 'lucide-react';
import { Window, WindowHeader, WindowContent, Button, Toolbar } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const channels = [
  { id: 1, type: 'video', src: 'vid5.mp4' },
  { id: 2, type: 'video', src: 'vid1.mp4' },
  { id: 3, type: 'video', src: 'vid4.mp4' },
  { id: 4, type: 'video', src: 'vid2.mp4' },
  { id: 5, type: 'image', src: 'cctv.png' },
  { id: 6, type: 'video', src: 'vid3.mp4' },
  { id: 7, type: 'video', src: 'vid6.mp4' },
  { id: 8, type: 'video', src: 'vid7.mp4' },
  { id: 9, type: 'video', src: 'vid8.mp4' },
];

const Big = () => {
  const [isOn, setIsOn] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Ensure it starts muted
  const [activeScreen, setActiveScreen] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const changeActiveScreen = (direction) => {
    setActiveScreen((prev) => (prev + direction + channels.length) % channels.length);
  };

  const renderScreen = (index) => {
    const channel = channels[index];
    return (
      <Window>
        <div
          className={`relative ${index === activeScreen ? 'border-2 border-yellow-400' : ''}`}
          key={index}
          style={{ width: '100%', paddingBottom: '75%', position: 'relative' }}
        >
          {channel.type === 'video' ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={channel.src}
              autoPlay={isOn} // Autoplay based on isOn
              loop
              muted={isMuted} // Mute to allow autoplay
              preload="auto" // Preload the video
            />
          ) : (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={channel.src}
              alt={`Camera ${index + 1}`}
            />
          )}
          <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1">
            CAM {index + 1}
          </div>
        </div>
      </Window>
    );
  };

  return (
    <ThemeProvider theme={original}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#C0C0C0] relative">
        <div className='absolute bottom-3 right-3 flex items-center z-[50]'>
            <a href="https://x.com/CCTVsolana" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-10 h-10 md:w-12 md:h-12 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#FFFFFF" viewBox="0 0 50 50">
                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
              </svg>
            </a>
            <a href="https://t.me/CCTVsolana" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-10 h-10 md:w-12 md:h-12 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#FFFFFF" viewBox="0 0 50 50">
                <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
              </svg>
            </a>
        </div>
        {/* Live Time */}
        <div className="absolute top-2 right-2 text-base">
          {currentTime}
        </div>

        {/* CCTV Label */}
        <div className="absolute top-2 left-2 flex gap-1 text-2xl font-bold items-center">
          <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse" />
          CCTV
        </div>

        <div className='py-[5%]'>
            {/* CCTV Grid */}
            <div className="relative w-[810px] h-[607.5px] bg-transparent">
            <div className="grid grid-cols-3 gap-2 h-full">
                {isOn ? (
                Array.from({ length: 9 }, (_, i) => renderScreen(i))
                ) : (
                <div className="col-span-3 w-full h-full bg-black flex items-center justify-center text-white">
                    System Off
                </div>
                )}
            </div>
            </div>

            {/* Controls */}
            <div className='mt-8 flex justify-center'>
                <Window style={{ width: 'auto', marginTop: 16 }}>
                    <WindowHeader>Control</WindowHeader>
                    <WindowContent>
                        <Toolbar>
                        <Button onClick={() => setIsOn(!isOn)}>
                            <Power style={{ marginRight: 4 }} />
                            {isOn ? 'Power Off' : 'Power On'}
                        </Button>
                        <Button onClick={() => changeActiveScreen(-1)}>
                            <ChevronUp style={{ marginRight: 4 }} />
                            Previous
                        </Button>
                        <Button onClick={() => setIsMuted(!isMuted)}>
                            {isMuted ? <VolumeX style={{ marginRight: 4 }} /> : <Volume2 style={{ marginRight: 4 }} />}
                            {isMuted ? 'Unmute' : 'Mute'}
                        </Button>
                        <Button onClick={() => changeActiveScreen(1)}>
                            <ChevronDown style={{ marginRight: 4 }} />
                            Next
                        </Button>
                        </Toolbar>
                    </WindowContent>
                </Window>
            </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Big;