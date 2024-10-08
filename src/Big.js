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
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#C0C0C0]">
        {/* Live Time */}
        <div className="absolute top-2 right-2 text-base">
          {currentTime}
        </div>

        {/* CCTV Label */}
        <div className="absolute top-2 left-2 flex gap-1 text-2xl font-bold items-center">
          <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse" />
          CCTV
        </div>

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
        <div className='mt-8'>
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
    </ThemeProvider>
  );
};

export default Big;