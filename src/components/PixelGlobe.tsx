
import React, { useEffect, useRef, useState } from 'react';

const PixelGlobe = () => {
  const [rotation, setRotation] = useState(0);
  const [networkData, setNetworkData] = useState({
    connections: 127,
    packets: 0,
    bandwidth: '2.4 Mbps',
    ipAddress: 'Loading...',
    browser: 'Loading...',
    location: 'Loading...'
  });

  // ASCII Earth frames for rotation effect
  const earthFrames = [
    [
      "     .-..-. ",
      "   .-'     '-.",
      "  /  o     o  \\",
      " |      ^      |",
      " |    \\_/     |",
      "  \\           /",
      "   '-._   _.-'",
      "       '-'    "
    ],
    [
      "     .-..-. ",
      "   .-'     '-.",
      "  /   .   .   \\",
      " |     ___     |",
      " |   /     \\   |",
      "  \\  \\_____/  /",
      "   '-._   _.-'",
      "       '-'    "
    ],
    [
      "     .-..-. ",
      "   .-'     '-.",
      "  /  ∞     ∞  \\",
      " |             |",
      " |     ___     |",
      "  \\   /   \\   /",
      "   '-.\\_____.-'",
      "       '-'    "
    ],
    [
      "     .-..-. ",
      "   .-'     '-.",
      "  /     ◊     \\",
      " |   ◊     ◊   |",
      " |      ◊      |",
      "  \\     ◊     /",
      "   '-._   _.-'",
      "       '-'    "
    ]
  ];

  // Fetch real user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get real browser info
        const userAgent = navigator.userAgent;
        const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/([0-9.]+)/);
        const browserInfo = browserMatch ? `${browserMatch[1]}/${browserMatch[2]}` : 'Unknown Browser';

        // Get real IP and location
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setNetworkData(prev => ({
          ...prev,
          ipAddress: data.ip || 'Unknown',
          browser: browserInfo,
          location: data.city && data.region ? `${data.city}, ${data.region}` : 'Unknown Location'
        }));
      } catch (error) {
        console.log('Could not fetch location data, using fallback');
        // Fallback to basic browser info only
        const userAgent = navigator.userAgent;
        const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/([0-9.]+)/);
        const browserInfo = browserMatch ? `${browserMatch[1]}/${browserMatch[2]}` : 'Unknown Browser';
        
        setNetworkData(prev => ({
          ...prev,
          ipAddress: 'Private Network',
          browser: browserInfo,
          location: 'Location Unavailable'
        }));
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotation(prev => (prev + 1) % earthFrames.length);
    }, 800);

    return () => clearInterval(rotationTimer);
  }, []);

  useEffect(() => {
    const dataTimer = setInterval(() => {
      setNetworkData(prev => ({
        ...prev,
        connections: prev.connections + Math.floor(Math.random() * 3) - 1,
        packets: prev.packets + Math.floor(Math.random() * 100),
        bandwidth: `${(Math.random() * 2 + 1.5).toFixed(1)} Mbps`
      }));
    }, 3000);

    return () => clearInterval(dataTimer);
  }, []);

  const currentFrame = earthFrames[rotation];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="border border-cyan-500/30 bg-gray-900/50 p-2 font-mono text-xs text-cyan-400 leading-none">
            {currentFrame.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="text-xs space-y-1">
          <div className="text-cyan-400">CONN: {networkData.connections}</div>
          <div className="text-cyan-500">PKT: {networkData.packets}</div>
          <div className="text-cyan-300">{networkData.bandwidth}</div>
        </div>
      </div>
      
      <div className="border-t border-cyan-500/20 pt-2 space-y-1 text-xs">
        <div className="text-cyan-400">IP: {networkData.ipAddress}</div>
        <div className="text-cyan-500">UA: {networkData.browser}</div>
        <div className="text-cyan-300">LOC: {networkData.location}</div>
      </div>
    </div>
  );
};

export default PixelGlobe;
