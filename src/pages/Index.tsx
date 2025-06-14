
import React, { useState, useEffect } from 'react';
import BootScreen from '@/components/BootScreen';
import TerminalInterface from '@/components/TerminalInterface';

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setIsBooting(false), 500);
    }, 4000);

    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono overflow-hidden">
      {isBooting ? (
        <BootScreen onComplete={() => setBootComplete(true)} />
      ) : (
        <TerminalInterface />
      )}
    </div>
  );
};

export default Index;
