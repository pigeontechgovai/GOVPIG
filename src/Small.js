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

const CanvasVideoPlayer = ({ src, muted, onEnded, loop = true }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.style.display = 'none';
    video.src = src;
    video.muted = muted;
    video.loop = loop;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    videoRef.current = video;
    document.body.appendChild(video);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const renderFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Get the video dimensions
        const videoAspectRatio = video.videoWidth / video.videoHeight;
        const canvasAspectRatio = canvas.width / canvas.height;
        
        let renderWidth = canvas.width;
        let renderHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        // Calculate dimensions to maintain aspect ratio
        if (videoAspectRatio > canvasAspectRatio) {
          renderHeight = canvas.width / videoAspectRatio;
          offsetY = (canvas.height - renderHeight) / 2;
        } else {
          renderWidth = canvas.height * videoAspectRatio;
          offsetX = (canvas.width - renderWidth) / 2;
        }

        // Clear canvas and draw video frame
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, offsetX, offsetY, renderWidth, renderHeight);
      }
      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    const playVideo = async () => {
      try {
        await video.play();
        renderFrame();
      } catch (error) {
        console.error('Video play failed:', error);
      }
    };

    video.addEventListener('loadedmetadata', playVideo);
    
    if (!loop) {
      video.addEventListener('ended', () => {
        if (onEnded) onEnded();
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      video.pause();
      video.remove();
    };
  }, [src, muted, loop, onEnded]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      width={280}
      height={210}
      style={{
        pointerEvents: 'none',
        touchAction: 'none',
        backgroundColor: 'black'
      }}
    />
  );
};

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
    setIsTerminated(false);
  };

  const handleNukeEnd = () => {
    setIsPlayingNuke(false);
    setIsTerminated(true);
  };

  const renderContent = () => {
    if (isPlayingNuke) {
      return (
        <CanvasVideoPlayer
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
        <CanvasVideoPlayer
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
      <div className="flex flex-col items-center justify-center h-screen bg-transparent relative overflow-clip">
        <Window className="select-none">
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