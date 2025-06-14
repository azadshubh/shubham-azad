
import React, { useState, useEffect } from 'react';

const TerminalHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="terminal-panel p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 glow-red"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 glow-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 glow-green"></div>
          </div>
          <span className="text-green-300">portfolio@terminal:~$</span>
        </div>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="text-green-400">
            CPU: <span className="text-green-300">45%</span>
          </div>
          <div className="text-green-400">
            MEM: <span className="text-green-300">2.1GB</span>
          </div>
          <div className="text-green-400">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;
