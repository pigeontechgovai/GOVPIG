import React, { useState, useRef, useEffect } from 'react';
import { VolumeX, Volume2, ChevronUp, ChevronDown } from 'lucide-react';
import { Window, WindowHeader, Button, Toolbar, WindowContent } from 'react95';
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

const VideoPlayer = ({ src, muted, onEnded, loop = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          // Set all attributes programmatically
          videoRef.current.playsInline = true;
          videoRef.current.setAttribute('webkit-playsinline', 'true');
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.setAttribute('x-webkit-airplay', 'allow');
          videoRef.current.preload = 'auto';
          
          // Force low-level playback mode
          videoRef.current.setAttribute('t7-video-player-type', 'inline');
          videoRef.current.setAttribute('x5-video-player-type', 'h5-page');
          videoRef.current.setAttribute('x5-video-orientation', 'portraint');
          videoRef.current.setAttribute('raw-controls', 'no-fullscreen');
          videoRef.current.setAttribute('enterkeyhint', 'none');
          
          await videoRef.current.play();
        }
      } catch (error) {
        console.error('Video play failed:', error);
      }
    };

    playVideo();
  }, [src]);

  return (
    <div className="w-full h-full relative bg-black" onClick={(e) => e.preventDefault()}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          pointerEvents: 'none',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
        muted={muted}
        autoPlay
        loop={loop}
        playsInline
        preload="auto"
        onEnded={onEnded}
        onTouchStart={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
        playsinline="true"
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="false"
        raw-controls="no-fullscreen"
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        controls={false}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

const Small = () => {
  const [currentChannel, setCurrentChannel] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isPlayingNuke, setIsPlayingNuke] = useState(false);

  // Prevent all default touch behaviors
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const options = { passive: false };
    
    document.addEventListener('touchstart', preventDefaults, options);
    document.addEventListener('touchmove', preventDefaults, options);
    document.addEventListener('touchend', preventDefaults, options);

    return () => {
      document.removeEventListener('touchstart', preventDefaults);
      document.removeEventListener('touchmove', preventDefaults);
      document.removeEventListener('touchend', preventDefaults);
    };
  }, []);

  const changeChannel = (direction) => {
    setCurrentChannel((prev) => (prev + direction + channels.length) % channels.length);
  };

  const handleTerminate = () => {
    setIsPlayingNuke(true);
    setIsTerminated(false);
  };

  const handleNukeEnd = () => {
    setIsPlayingNuke(false);
    setIsTerminated(true);
  };

  const renderContent = () => {
    if (isPlayingNuke) {
      return (
        <VideoPlayer
          src="nuke.mp4"
          muted={true}
          onEnded={handleNukeEnd}
          loop={false}
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
        <VideoPlayer
          src={channel.src}
          muted={isMuted}
        />
      );
    } else if (channel.type === 'image') {
      return (
        <img
          className="w-full h-full object-cover"
          src={channel.src}
          alt={`Channel ${channel.id}`}
          style={{ pointerEvents: 'none' }}
        />
      );
    }
  };

  return (
    <ThemeProvider theme={original}>
      <div 
        className="flex flex-col items-center justify-center h-screen bg-transparent relative overflow-clip"
        style={{ touchAction: 'none' }}
      >
        <Window className="select-none">
          <WindowHeader>
            <div className='flex gap-1 items-center' style={{ fontFamily: 'monospace' }}>
              <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse" />
              STREAMS
            </div>
          </WindowHeader>
          <WindowContent 
            style={{ width: 400*0.7, height: 300*0.7, padding: 1 }}
            onClick={(e) => e.preventDefault()}
          >
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