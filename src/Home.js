import React, { useState, useEffect } from 'react';
import Globe from './globe';
import { Window, WindowHeader, WindowContent, Button, Toolbar } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const TypingText = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <div className="font-mono font-bold text-white p-1 rounded">
      {displayText}<span className="animate-pulse">|</span>
    </div>
  );
};

const Home = () => {
  return (
    <div className="h-screen w-screen relative flex items-center justify-center">
      <div className="absolute top-4 left-4 z-20">
        <div className='text-[16px] md:text-3xl'>
            <TypingText text='CLASSIFIED: "Pigeon Tech" v6.9' speed={50} />
        </div>
        <div className='text-base md:text-xl'>
            <TypingText text="CLASSIFIED: Surveillance Initiative" speed={50} />
        </div>
        <div className='text-base md:text-xl'>
            <TypingText text="CLASSIFIED: Solana" speed={50} />
        </div>
      </div>

      <div className='absolute bottom-5'>
        <Window>
            <span className='p-1 text-xs md:text-base font-mono'>CA: 4kHu4VktgzpZW9i8LEsHZrNLJcTV98nGhyZE5JSEpump</span>
        </Window>
      </div>
      
      <Globe />
      
      <img
        src="p.png"
        className="absolute z-10 w-[300px] md:w-[500px]"
        alt="Pigeon"
      />
    </div>
  );
};

export default Home;