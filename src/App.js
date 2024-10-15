import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import Big from "./Big";
import Small from "./Small";
import Med from "./Med";
import Home from "./Home";
import Chatbot from './Chatbot'; // Import the Chatbot component
import Marquee from 'react-fast-marquee';

// Set up the modal styles for the phone call
Modal.setAppElement('#root');

const App = () => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false); // State to track if user is on the call
  const [hasCalled, setHasCalled] = useState(false); // State to track if the call has been triggered once
  const [audio] = useState(new Audio('/mike1.mp3')); // Audio object for playing mike.mp3

  // Show the "Big Mike is calling" modal 4 seconds after the page loads, only once
  useEffect(() => {
    if (!hasCalled) {
      const timer = setTimeout(() => {
        setIsCallModalOpen(true);
        setHasCalled(true); // Ensure the call only happens once
      }, 3500); // 4 seconds delay

      return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }
  }, [hasCalled]);

  const closeModal = () => {
    setIsCallModalOpen(false);
    setIsOnCall(false); // Reset the call status when modal closes
  };

  const acceptCall = () => {
    // Play mike.mp3 when call is accepted
    audio.play();

    // Set the call status to "on call"
    setIsOnCall(true);

    // Ensure modal is centered when on call (reset animation position)
    setTimeout(() => {
      setIsCallModalOpen(true); // Keep the modal open but change content to "on call"
    }, 50);

    // Close the modal when audio finishes
    audio.onended = () => {
      setIsCallModalOpen(false); // Close the modal after the audio ends
      setIsOnCall(false); // Reset the call state
    };
  };

  const declineCall = () => {
    // Handle the logic for declining the call
    console.log("Call declined!");
    setIsCallModalOpen(false); // Close the modal
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
      borderRadius: 'none',
      padding: '0',
      overflow: 'clip',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 100,
    },
  };

  // Define the ring motion as just moving the modal left and right
  const ringMotion = {
    x: [-2, 2, -2], // Move the modal back and forth on the x-axis
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
            <Marquee speed={70} loop={0}> {/* 'loop={0}' creates an infinite loop */}
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
              <div className='flex justify-center items-center text-3xl font-mono text-white'>
                GOVAI | Surveillance Initiative <img src="gif.gif" className='h-20' />
              </div>
            </Marquee>
          </div>

          {/* Display Big component on large screens, Med on medium screens, and Small on small screens */}
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
          {/* Apply the ring motion to the whole modal only if not on call */}
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center overflow-clip"
            animate={!isOnCall ? ringMotion : { x: 0 }} // Reset modal position when on call
          >
            {isOnCall ? (
              // UI when the user is on the call
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
              // UI when the call is ringing
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