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

const Small = () => {
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
            <WindowContent style={{ width: 400*0.7, height: 300*0.7, padding: 1 }}>
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

export default Small;