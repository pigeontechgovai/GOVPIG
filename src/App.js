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
import Marquee from 'react-fast-marquee';

// Set up the modal styles for the phone call
Modal.setAppElement('#root');

// TextOverlay component to show text above everything else
const TextOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none bg-black" style={{ zIndex: 9999 }}>
      <h1 className="text-white text-2xl font-bold">message @pilledagora on tg for collaboration</h1>
    </div>
  );
};

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
    console.log("Call declined!");
    setIsCallModalOpen(false);
  };

  const callModalStyles = {
    content: {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'black',
      width: '300px',
      height: '400px',
      padding: '0',
      overflow: 'clip',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 100,
    },
  };

  const ringMotion = {
    x: [-2, 2, -2],
    transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <ThemeProvider theme={original}>
      <div className="relative min-h-screen">
        {/* Background video */}
        <video
          className="sticky top-0 left-0 w-[100dvw] h-[100dvh] object-cover"
          style={{ zIndex: -1 }}
          src="bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className='absolute inset-0 h-full w-full bg-black opacity-30'></div>

        {/* Content overlay */}
        <div className="absolute inset-0 overflow-y-auto">
          <div className="">
            <Home />
          </div>

          <div className='py-[5%]'>
            <Marquee speed={70} loop={0}>
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
              {/* Repeat the content as needed */}
            </Marquee>
          </div>

          <div className="hidden lg:block">
            <Big />
          </div>
          <div className="hidden md:block lg:hidden">
            <Med />
          </div>
          <div className="block md:hidden">
            <Small />
          </div>
        </div>

        {/* Include the Chatbot component */}
        <Chatbot />

        {/* Modal for the "Big Mike" call */}
        <Modal
          isOpen={isCallModalOpen}
          onRequestClose={closeModal}
          contentLabel="Big Mike is Calling"
          style={callModalStyles}
        >
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center overflow-clip"
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

        {/* Add the TextOverlay component */}
        <TextOverlay />
      </div>
    </ThemeProvider>
  );
};

export default App;