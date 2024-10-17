import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Window, WindowHeader, WindowContent, Button, Toolbar } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const channels = [
  { id: 1, type: 'video', src: 'v1.mp4' },
  { id: 2, type: 'video', src: 'v2.mp4' },
  { id: 3, type: 'video', src: 'v3.mp4' },
  { id: 4, type: 'video', src: 'v4.mp4' },
  { id: 5, type: 'video', src: 'v.mp4' },
  { id: 6, type: 'video', src: 'v5.mp4' },
  { id: 7, type: 'video', src: 'v6.mp4' },
  { id: 8, type: 'video', src: 'v8.mp4' },
  { id: 9, type: 'video', src: 'v7.mp4' },
];

const Big = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeScreen, setActiveScreen] = useState(0);
  const [terminatedScreens, setTerminatedScreens] = useState([]);
  const [isNukePlaying, setIsNukePlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const changeActiveScreen = (direction) => {
    setActiveScreen((prev) => (prev + direction + channels.length) % channels.length);
  };

  const handleTerminate = () => {
    setIsNukePlaying(true);
    setTimeout(() => {
      setTerminatedScreens([...terminatedScreens, activeScreen]);
      setIsNukePlaying(false);
    }, 2000);
  };

  const renderScreen = (index) => {
    const isTerminated = terminatedScreens.includes(index);

    return (
      <Window key={index}>
        <div
          className={`relative ${index === activeScreen ? 'border-2 border-yellow-400' : ''}`}
          style={{ width: '100%', paddingBottom: '75%', position: 'relative' }}
        >
          {isTerminated ? (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400">
              <h1 className="text-3xl font-mono">Terminated.</h1>
            </div>
          ) : index === activeScreen && isNukePlaying ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="nuke.mp4"
              autoPlay
              loop={false}
              muted={isMuted}
              preload="auto"
            />
          ) : channels[index].type === 'video' ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={channels[index].src}
              autoPlay
              loop
              muted={isMuted}
              preload="auto"
            />
          ) : (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={channels[index].src}
              alt={`Camera ${index + 1}`}
            />
          )}
          <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 font-mono">
            STREAM {index + 1}
          </div>
        </div>
      </Window>
    );
  };

  return (
    <ThemeProvider theme={original}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent relative">
        <div className='py-[5%]'>
          <div className="relative w-[810px] h-[607.5px] bg-transparent">
            <div className="grid grid-cols-3 gap-2 h-full">
              {Array.from({ length: 9 }, (_, i) => renderScreen(i))}
            </div>
          </div>
          <div className='mt-8 flex justify-center'>
            <Window style={{ width: 'auto', marginTop: 16 }}>
              <WindowHeader style={{ backgroundColor: 'black', color: 'white' }} className="font-mono">
                Control
              </WindowHeader>
              <WindowContent className="font-mono">
                <Toolbar>
                  <Button onClick={handleTerminate} className="font-mono">
                    Terminate
                  </Button>
                  <Button onClick={() => changeActiveScreen(-1)} className="font-mono">
                    <ChevronUp />
                    Prev
                  </Button>
                  <Button onClick={() => changeActiveScreen(1)} className="font-mono">
                    Next
                    <ChevronDown />
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