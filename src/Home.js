import React, { useState, useEffect } from 'react';
import Globe from './globe';
import { Window } from 'react95';
import tg from './tg.png';
import x from './x.jpg';

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const contractAddress = '4kHu4VktgzpZW9i8LEsHZrNLJcTV98nGhyZE5JSEpump';
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div className="h-[100dvh] w-screen relative flex items-center justify-center">
      <div className="absolute top-4 left-4 z-20">
        <div className='text-[16px] md:text-3xl flex md:hidden'>
            <TypingText text='"Pigeon Tech" v6.9' speed={50} />
        </div>
        <div className='text-[16px] md:text-3xl hidden md:flex'>
            <TypingText text='CLASSIFIED: "Pigeon Tech" v6.9' speed={50} />
        </div>
        <div className='text-base md:text-xl hidden md:flex'>
            <TypingText text="CLASSIFIED: Surveillance Initiative" speed={50} />
        </div>
        <div className='text-base md:text-xl hidden md:flex'>
            <TypingText text="CLASSIFIED: Solana" speed={50} />
        </div>
      </div>

      <div className='absolute top-4 right-4 flex justify-center items-center space-x-1'>
        <a href="https://dexscreener.com/solana/ac8b94b5y4agdcg7ryaev5bwxjkbynf1sztpcjy1g7no" className='bg-zinc-400 rounded-full'>
          <img src="ds.png" className='size-8 md:size-12 rounded-full border'></img>
        </a>
        <a href="https://www.dextools.io/app/en/solana/pair-explorer/Ac8B94B5y4agdcG7rYAEv5BwxjKbYnF1szTpcJY1g7No" className='bg-zinc-400 rounded-full'>
          <img src="dt.svg" className='size-8 md:size-12 rounded-full border p-1'></img>
        </a>
        <a href="https://x.com/pigeontechgovai" className='bg-black rounded-full'>
          <img src={x} className='size-8 md:size-12 rounded-full border p-1'></img>
        </a>
        <a href="https://t.me/+MdDumaNLRblhY2U6" className=''>
          <img src={tg} className='size-8 md:size-12 rounded-full border'></img>
        </a>
      </div>

      <div className='absolute bottom-5'>
        <Window>
          <button
            onClick={handleCopy}
            className='p-1 text-xs md:text-base m-1 bg-zinc-400 font-mono'
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <span className='p-1 text-[9px] md:text-base font-mono'>4kHu4VktgzpZW9i8LEsHZrNLJcTV98nGhyZE5JSEpump</span>
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