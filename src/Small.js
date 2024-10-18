import React, { useState } from 'react';
import { VolumeX, Volume2, ChevronUp, ChevronDown } from 'lucide-react';
import { Window, WindowHeader, Button, Toolbar, WindowContent } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const channels = [
  { id: 1, type: 'image', src: 'v1.png' },
  { id: 2, type: 'image', src: 'v2.png' },
  { id: 3, type: 'image', src: 'v3.png' },
  { id: 4, type: 'image', src: 'v4.png' },
  { id: 5, type: 'image', src: 'v5.png' },
  { id: 6, type: 'image', src: 'v6.png' },
  { id: 7, type: 'image', src: 'v7.png' },
  { id: 8, type: 'image', src: 'v8.png' },
  { id: 9, type: 'image', src: 'v.png' },
];


const Small = () => {
  const [currentChannel, setCurrentChannel] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isPlayingNuke, setIsPlayingNuke] = useState(false);

  const changeChannel = (direction) => {
    setCurrentChannel((prev) => (prev + direction + channels.length) % channels.length);
  };

  const handleTerminate = () => {
    setIsPlayingNuke(true);
    setIsTerminated(false); // Reset termination state
  };

  const handleNukeEnd = () => {
    setIsPlayingNuke(false);
    setIsTerminated(true);
  };

  const renderContent = () => {
    if (isPlayingNuke) {
      return (
        <video
          className="w-full h-full object-cover"
          src="nuke.mp4"
          autoPlay
          muted
          onEnded={handleNukeEnd}
          playsInline
        />
      );
    }

    if (isTerminated) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-[#C0C0C0]">
          <div className="text-center" style={{ color: 'black', fontSize: '24px', fontFamily: 'monospace' }}>
            Terminated.
          </div>
        </div>
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
      <div className="flex flex-col items-center justify-center h-screen bg-transparent relative overflow-clip">
        <Window>
          <WindowHeader>
            <div className='flex gap-1 items-center' style={{ fontFamily: 'monospace' }}>
              <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse" />
              STREAMS
            </div>
          </WindowHeader>
          <WindowContent style={{ width: 400*0.7, height: 300*0.7, padding: 1 }}>
            <div className="relative w-full h-full bg-black overflow-hidden">
              <div className="absolute inset-0">
                {renderContent()}
              </div>
            </div>
          </WindowContent>
        </Window>
        <Toolbar className="flex justify-center" style={{ marginTop: '16px', width: '260px' }}>
          <Button onClick={handleTerminate} style={{ marginRight: '16px', fontFamily: 'monospace' }}>
            Terminate
          </Button>
          <Button onClick={() => changeChannel(-1)} style={{ marginRight: '16px', fontFamily: 'monospace' }}>
            <ChevronUp size={24} />
          </Button>
          <Button onClick={() => setIsMuted(!isMuted)} style={{ marginRight: '16px', fontFamily: 'monospace' }}>
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </Button>
          <Button onClick={() => changeChannel(1)} style={{ fontFamily: 'monospace' }}>
            <ChevronDown size={24} />
          </Button>
        </Toolbar>
      </div>
    </ThemeProvider>
  );
};

export default Small;