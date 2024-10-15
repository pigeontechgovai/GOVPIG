import React from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import Big from "./Big";
import Small from "./Small";
import Med from "./Med";
import Home from "./Home";
import Chatbot from './Chatbot'; // Import the Chatbot component

const App = () => {
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
      </div>
    </ThemeProvider>
  );
};

export default App;