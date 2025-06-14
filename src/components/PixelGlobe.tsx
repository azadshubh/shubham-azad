import React, { useEffect, useRef, useState } from 'react';

const PixelGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [networkData, setNetworkData] = useState({
    connections: 127,
    packets: 0,
    bandwidth: '2.4 Mbps',
    ipAddress: 'Loading...',
    browser: 'Loading...',
    location: 'Loading...'
  });

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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 60;
    canvas.width = size;
    canvas.height = size;

    const drawPixelGlobe = () => {
      ctx.clearRect(0, 0, size, size);
      
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = 25;
      
      // Draw pixelated globe
      for (let y = 0; y < size; y += 2) {
        for (let x = 0; x < size; x += 2) {
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance <= radius) {
            // Calculate 3D position considering rotation
            const angle = Math.atan2(dy, dx) + rotation;
            const intensity = Math.cos(angle * 2) * 0.5 + 0.5;
            
            // Create land/ocean pattern
            const landPattern = Math.sin(angle * 4) * Math.cos(angle * 3) > 0.2;
            
            if (landPattern) {
              // Land - green tones
              const green = Math.floor(intensity * 100 + 100);
              ctx.fillStyle = `rgb(0, ${green}, 0)`;
            } else {
              // Ocean - blue tones
              const blue = Math.floor(intensity * 150 + 50);
              ctx.fillStyle = `rgb(0, 100, ${blue})`;
            }
            
            ctx.fillRect(x, y, 2, 2);
          }
        }
      }
      
      // Add atmosphere glow
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
      ctx.stroke();
    };

    drawPixelGlobe();
  }, [rotation]);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotation(prev => prev + 0.02);
    }, 50);

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

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="border border-cyan-500/30"
            style={{ imageRendering: 'pixelated' }}
          />
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
