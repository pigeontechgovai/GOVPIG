import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import Big from "./Big";
import Small from "./Small";
import Med from "./Med";
import Home from "./Home";
import Chatbot from './Chatbot';
import EpsteinTracker from './EpsteinTracker';
import Marquee from 'react-fast-marquee';

Modal.setAppElement('#root');

const App = () => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false);
  const [hasCalled, setHasCalled] = useState(false);
  const [audio] = useState(new Audio('/mike1.mp3'));

  useEffect(() => {
    if (!hasCalled) {
      const timer = setTimeout(() => {
        setIsCallModalOpen(true);
        setHasCalled(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [hasCalled]);

  const closeModal = () => {
    setIsCallModalOpen(false);
    setIsOnCall(false);
  };

  const acceptCall = () => {
    audio.play();
    setIsOnCall(true);
    setTimeout(() => {
      setIsCallModalOpen(true);
    }, 50);

    audio.onended = () => {
      setIsCallModalOpen(false);
      setIsOnCall(false);
    };
  };

  const declineCall = () => {
    setIsCallModalOpen(false);
  };

  const callModalStyles = {
    content: {
      position: 'relative',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'black',
      width: '300px',
      height: '400px',
      border: 'none',
      borderRadius: '16px',
      padding: '0',
      overflow: 'clip',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 100,
    },
  };

  const ringMotion = {
    x: [-1, 1, -1],
    transition: { duration: 0.3, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <ThemeProvider theme={original}>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <video
          className="fixed top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
          src="bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 h-full w-full bg-black opacity-20" />

        <div className="relative w-full overflow-x-hidden">
          <div className="w-full">
            <Home />
          </div>

          <div className="w-full">
            <Marquee speed={70} loop={0} className="w-full">
              <div className="flex items-center space-x-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2 text-3xl font-mono text-white whitespace-nowrap">
                    <span>GOVAI | Surveillance Initiative</span>
                    <img src="gif.gif" className="h-20" alt="surveillance" />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>

          <div className="hidden lg:block w-full">
            <Big />
          </div>
          <div className="hidden md:block lg:hidden w-full">
            <Med />
          </div>
          <div className="block md:hidden w-full">
            <Small />
          </div>

          <div className="w-full flex justify-center py-[5%]">
            <EpsteinTracker />
          </div>
        </div>

        <Chatbot />

        <Modal
          isOpen={isCallModalOpen}
          onRequestClose={closeModal}
          contentLabel="Big Mike is Calling"
          style={callModalStyles}
        >
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center"
            animate={!isOnCall ? ringMotion : { x: 0 }}
          >
            {isOnCall ? (
              <>
                <img src="/mike.png" alt="Big Mike" className="size-32 rounded-full mb-4" />
                <h2 className="text-white text-lg font-bold mb-2">On Call with Big Mike</h2>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-bold"
                >
                  End Call
                </button>
              </>
            ) : (
              <>
                <img src="/mike.png" alt="Big Mike" className="size-32 rounded-full mb-4" />
                <h2 className="text-white text-lg font-bold mb-2">Big Mike</h2>
                <div className="mt-4 flex justify-around w-full">
                  <button
                    onClick={acceptCall}
                    className="bg-green-500 text-white px-4 py-2 rounded-full font-bold"
                  >
                    Accept
                  </button>
                  <button
                    onClick={declineCall}
                    className="bg-red-500 text-white px-4 py-2 rounded-full font-bold"
                  >
                    Decline
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default App;