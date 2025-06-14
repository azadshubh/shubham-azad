
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
    <div className="h-full flex items-center justify-between px-4 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 border border-red-400"></div>
            <div className="w-2 h-2 bg-yellow-500 border border-yellow-400"></div>
            <div className="w-2 h-2 bg-green-500 border border-green-400"></div>
          </div>
          <div className="text-cyan-300 text-sm uppercase tracking-wider">PORTFOLIO TERMINAL</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 text-xs text-cyan-400">
        <div className="border border-cyan-500/30 px-2 py-1 bg-gray-800/50">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="border border-cyan-500/30 px-2 py-1 bg-gray-800/50">
          SESSION: ACTIVE
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;
