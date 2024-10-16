import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Window, WindowHeader, Button, Toolbar, WindowContent } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const EpsteinTracker = () => {
  const [dotPosition, setDotPosition] = useState({ top: 50, left: 50 });
  const [targetPosition, setTargetPosition] = useState({ top: 50, left: 50 });

  // Function to get a new random position
  const getNewPosition = (current) => {
    // Calculate new position with larger movements
    let newTop = current.top + (Math.random() - 0.5) * 30;  // Increased range
    let newLeft = current.left + (Math.random() - 0.5) * 30;
    
    // Keep within bounds
    newTop = Math.max(5, Math.min(95, newTop));
    newLeft = Math.max(5, Math.min(95, newLeft));
    
    return { top: newTop, left: newLeft };
  };

  useEffect(() => {
    // Update target position every 2 seconds
    const targetInterval = setInterval(() => {
      setTargetPosition(prev => getNewPosition(prev));
    }, 2000);

    // Smoothly move current position towards target every 50ms
    const moveInterval = setInterval(() => {
      setDotPosition(current => {
        const dx = (targetPosition.left - current.left) * 0.1;
        const dy = (targetPosition.top - current.top) * 0.1;
        return {
          top: current.top + dy,
          left: current.left + dx
        };
      });
    }, 50);

    return () => {
      clearInterval(targetInterval);
      clearInterval(moveInterval);
    };
  }, [targetPosition]);

  return (
    <Window>
        <div className="relative h-[500px] w-[500px] mx-auto">
        <img src="/map.png" alt="Map" className="w-full h-full object-cover" />
        
        {/* Live Dot */}
        <motion.div
            className="absolute w-4 h-4 bg-red-500 rounded-full"
            style={{
            top: `${dotPosition.top}%`,
            left: `${dotPosition.left}%`,
            transform: 'translate(-50%, -50%)',
            }}
            animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
            }}
            transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
            }}
        >
            {/* Outer glow effect */}
            <div className="absolute inset-0 -z-10 animate-ping">
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-25 blur-sm transform scale-150" />
            <div className="absolute inset-0 rounded-full bg-red-400 opacity-15 blur-md transform scale-200" />
            </div>
        </motion.div>

        <div className="absolute bottom-2 right-2 text-white text-base md:text-xl font-mono bg-black p-2">
            Live Epstein Tracker
        </div>
        </div>
    </Window>
  );
};

export default EpsteinTracker;