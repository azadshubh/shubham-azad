import React, { useEffect, useRef, useState } from 'react';

const PixelGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [networkData, setNetworkData] = useState({
    connections: 127,
    packets: 0,
    bandwidth: '2.4 Mbps',
    ipAddress: 'Loading...',
    browser: 'Loading...',
    location: 'Loading...'
  });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch real user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userAgent = navigator.userAgent;
        const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/([0-9.]+)/);
        const browserInfo = browserMatch ? `${browserMatch[1]}/${browserMatch[2]}` : 'Unknown Browser';

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

    // Responsive canvas sizing
    const width = isMobile ? 300 : 200;
    const height = isMobile ? 240 : 160;
    canvas.width = width;
    canvas.height = height;

    const drawContinentalGlobe = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = isMobile ? 90 : 60;
      const radiusY = isMobile ? 75 : 50;
      
      // Define continent patterns
      const continents = [
        // Africa
        { latRange: [-35, 37], lonRange: [-17, 51], color: '#888888' },
        // Asia (excluding Indian subcontinent)
        { latRange: [8, 77], lonRange: [60, 180], color: '#888888' },
        // Europe
        { latRange: [36, 71], lonRange: [-10, 40], color: '#888888' },
        // North America
        { latRange: [15, 83], lonRange: [-168, -52], color: '#888888' },
        // South America
        { latRange: [-56, 13], lonRange: [-81, -34], color: '#888888' },
        // Australia
        { latRange: [-44, -10], lonRange: [113, 154], color: '#888888' },
        // Indian Subcontinent (highlighted)
        { latRange: [6, 35], lonRange: [68, 97], color: '#00ffff' }
      ];
      
      const dotSpacing = isMobile ? 3 : 4;
      const dotSize = isMobile ? 3 : 2;
      const oceanDotSize = isMobile ? 2 : 1;
      
      for (let lat = -90; lat <= 90; lat += dotSpacing) {
        for (let lon = -180; lon <= 180; lon += dotSpacing) {
          const rotatedLon = lon + (rotation * 180 / Math.PI);
          const x = centerX + (radiusX * Math.cos(lat * Math.PI / 180) * Math.sin(rotatedLon * Math.PI / 180));
          const y = centerY - (radiusY * Math.sin(lat * Math.PI / 180));
          
          const visible = Math.cos(lat * Math.PI / 180) * Math.cos(rotatedLon * Math.PI / 180) > 0;
          
          if (visible && x >= 0 && x < width && y >= 0 && y < height) {
            let isLand = false;
            let dotColor = '#333333';
            
            // Check if point is in any continent
            for (const continent of continents) {
              if (lat >= continent.latRange[0] && lat <= continent.latRange[1] &&
                  lon >= continent.lonRange[0] && lon <= continent.lonRange[1]) {
                isLand = true;
                dotColor = continent.color;
                break;
              }
            }
            
            if (isLand) {
              ctx.fillStyle = dotColor;
              ctx.fillRect(Math.floor(x), Math.floor(y), dotSize, dotSize);
            } else {
              // Ocean dots
              ctx.fillStyle = '#222222';
              ctx.fillRect(Math.floor(x), Math.floor(y), oceanDotSize, oceanDotSize);
            }
          }
        }
      }
    };

    drawContinentalGlobe();
  }, [rotation, isMobile]);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotation(prev => prev + 0.008);
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

  // Mobile layout
  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="border border-cyan-500/30 bg-black w-full"
            style={{ imageRendering: 'pixelated' }}
          />
          
          <div className="absolute top-2 left-2 text-sm text-cyan-400 font-mono">
            WORLD VIEW
          </div>
          <div className="absolute top-2 right-2 text-sm text-cyan-600 font-mono">
            LAT/LON
          </div>
          <div className="absolute bottom-2 left-2 text-sm text-cyan-500 font-mono">
            12.8759
          </div>
          <div className="absolute bottom-2 right-2 text-sm text-cyan-400 font-mono">
            77.5910
          </div>
          
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="text-cyan-400">CONN: {networkData.connections}</div>
            <div className="text-cyan-500">PKT: {networkData.packets}</div>
            <div className="text-cyan-300">{networkData.bandwidth}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-cyan-400">IP: {networkData.ipAddress}</div>
            <div className="text-cyan-500">UA: {networkData.browser}</div>
            <div className="text-cyan-300">LOC: {networkData.location}</div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="space-y-3">
      <div className="relative">
        <canvas 
          ref={canvasRef}
          className="border border-cyan-500/30 bg-black"
          style={{ imageRendering: 'pixelated' }}
        />
        
        <div className="absolute top-1 left-1 text-xs text-cyan-400 font-mono">
          WORLD VIEW
        </div>
        <div className="absolute top-1 right-1 text-xs text-cyan-600 font-mono">
          LAT/LON
        </div>
        <div className="absolute bottom-1 left-1 text-xs text-cyan-500 font-mono">
          12.8759
        </div>
        <div className="absolute bottom-1 right-1 text-xs text-cyan-400 font-mono">
          77.5910
        </div>
        
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
