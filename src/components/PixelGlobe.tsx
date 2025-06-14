
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

    const width = 200;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    const drawDotGlobe = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Set background to dark
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = 60;
      const radiusY = 50;
      
      // Draw globe dots
      for (let lat = -90; lat <= 90; lat += 6) {
        for (let lon = -180; lon <= 180; lon += 6) {
          // Convert spherical to 2D coordinates with rotation
          const rotatedLon = lon + (rotation * 180 / Math.PI);
          const x = centerX + (radiusX * Math.cos(lat * Math.PI / 180) * Math.sin(rotatedLon * Math.PI / 180));
          const y = centerY - (radiusY * Math.sin(lat * Math.PI / 180));
          
          // Only draw dots on the visible hemisphere
          const visible = Math.cos(lat * Math.PI / 180) * Math.cos(rotatedLon * Math.PI / 180) > 0;
          
          if (visible && x >= 0 && x < width && y >= 0 && y < height) {
            // Create land/ocean pattern
            const landPattern = Math.sin(lat * Math.PI / 90) * Math.cos(lon * Math.PI / 60) > 0.1;
            
            if (landPattern) {
              // Land dots - brighter
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
            } else {
              // Ocean dots - dimmer
              ctx.fillStyle = '#666666';
              ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
            }
          }
        }
      }
      
      // Add some random network activity dots
      for (let i = 0; i < 8; i++) {
        const angle = (Date.now() / 1000 + i * 0.8) % (Math.PI * 2);
        const x = centerX + Math.cos(angle) * (radiusX * 0.8);
        const y = centerY + Math.sin(angle) * (radiusY * 0.8);
        
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(Math.floor(x), Math.floor(y), 2, 2);
      }
    };

    drawDotGlobe();
  }, [rotation]);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotation(prev => prev + 0.01);
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
      <div className="relative">
        {/* Globe Canvas */}
        <canvas 
          ref={canvasRef}
          className="border border-cyan-500/30 bg-black"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Overlay Labels */}
        <div className="absolute top-1 left-1 text-xs text-cyan-400 font-mono">
          WORLD VIEW
        </div>
        <div className="absolute top-1 right-1 text-xs text-cyan-600 font-mono">
          GLOBAL NETWORK MAP
        </div>
        <div className="absolute bottom-1 left-1 text-xs text-cyan-500 font-mono">
          ENDPOINT LAT/LON
        </div>
        <div className="absolute bottom-1 right-1 text-xs text-cyan-400 font-mono">
          12.8759, 77.591
        </div>
        
        {/* Status indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-xs space-y-1">
        <div className="text-cyan-400">CONN: {networkData.connections}</div>
        <div className="text-cyan-500">PKT: {networkData.packets}</div>
        <div className="text-cyan-300">{networkData.bandwidth}</div>
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
