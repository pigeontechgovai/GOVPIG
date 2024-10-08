import React, { useState, useEffect } from 'react';
import { Power, VolumeX, Volume2, ChevronUp, ChevronDown } from 'lucide-react';
import { Window, WindowHeader, Button, Toolbar, WindowContent } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const channels = [
  { id: 1, type: 'image', src: 'cctv.png' },
  { id: 2, type: 'video', src: 'vid1.mp4' },
  { id: 3, type: 'video', src: 'vid3.mp4' },
  { id: 4, type: 'video', src: 'vid6.mp4' },
  { id: 5, type: 'video', src: 'vid7.mp4' },
  { id: 6, type: 'video', src: 'vid5.mp4' },
];

const Med = () => {
  const [currentChannel, setCurrentChannel] = useState(0);
  const [isOn, setIsOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (showBlur) {
      const timer = setTimeout(() => setShowBlur(false), 500); // Show blur.mp4 for 0.5 seconds
      return () => clearTimeout(timer);
    }
  }, [showBlur]);

  const changeChannel = (direction) => {
    setShowBlur(true);
    setTimeout(() => {
      setCurrentChannel((prev) => (prev + direction + channels.length) % channels.length);
    }, 500); // Delay changing channel until after blur.mp4 plays
  };

  const renderContent = () => {
    if (showBlur) {
      return (
        <video
          className="w-full h-full object-cover"
          src="/blur.mp4"
          autoPlay
          muted
          playsInline
        />
      );
    }

    const channel = channels[currentChannel];
    if (channel.type === 'video') {
      return (
        <video
          className="w-full h-full object-cover"
          src={channel.src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
      );
    } else if (channel.type === 'image') {
      return (
        <img
          className="w-full h-full object-cover"
          src={channel.src}
          alt={`Channel ${channel.id}`}
        />
      );
    }
  };

  return (
    <ThemeProvider theme={original}>
      <div className="flex flex-col items-center justify-center h-screen bg-[#C0C0C0] relative">
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
        <div className="absolute top-2 right-2 text-base">
          {currentTime}
        </div>
        <Window>
            <WindowHeader>
              <div className='flex gap-1 items-center'>
                <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse" />
                CCTV
              </div>
            </WindowHeader>
            <WindowContent style={{ width: 400, height: 300, padding: 1 }}>
                <div className="relative w-full h-full bg-black overflow-hidden">
                    <div className="absolute inset-0">
                    {isOn ? (
                        renderContent()
                    ) : (
                        <div className="w-full h-full bg-black flex items-center justify-center text-white">
                        TV is off
                        </div>
                    )}
                    </div>
                </div>
            </WindowContent>
        </Window>
        <Toolbar className="flex justify-center" style={{ marginTop: '16px', width: '260px' }}>
          <Button onClick={() => setIsOn(!isOn)} style={{ marginRight: '16px' }}>
            <Power size={24} />
          </Button>
          <Button onClick={() => changeChannel(-1)} style={{ marginRight: '16px' }}>
            <ChevronUp size={24} />
          </Button>
          <Button onClick={() => setIsMuted(!isMuted)} style={{ marginRight: '16px' }}>
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </Button>
          <Button onClick={() => changeChannel(1)}>
            <ChevronDown size={24} />
          </Button>
        </Toolbar>
      </div>
    </ThemeProvider>
  );
};

export default Med;