
import React, { useEffect, useRef, useState } from 'react';

const PixelGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [networkData, setNetworkData] = useState({
    connections: 127,
    packets: 0,
    bandwidth: '2.4 Mbps',
    ipAddress: 'Loading...',
    browser: 'Loading...',
    location: 'Loading...'
  });

  // Monitor CPU and RAM usage
  useEffect(() => {
    const monitorPerformance = () => {
      // Simulate CPU usage calculation
      const startTime = performance.now();
      let iterations = 0;
      const testStart = performance.now();
      
      // Do some work to measure performance
      while (performance.now() - testStart < 1) {
        iterations++;
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Calculate CPU usage based on execution time (rough estimation)
      const cpuPercent = Math.min(Math.max((executionTime / 10) * 100, 15), 85);
      setCpuUsage(cpuPercent);
      
      // Estimate RAM usage using performance.memory if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const ramPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        setRamUsage(Math.min(ramPercent, 90));
      } else {
        // Fallback to simulated RAM usage
        setRamUsage(Math.random() * 30 + 40);
      }
    };

    const performanceTimer = setInterval(monitorPerformance, 2000);
    monitorPerformance(); // Initial call

    return () => clearInterval(performanceTimer);
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

    const width = 200;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    const drawContinentalGlobe = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = 60;
      const radiusY = 50;
      
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
      
      for (let lat = -90; lat <= 90; lat += 4) {
        for (let lon = -180; lon <= 180; lon += 4) {
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
              ctx.fillRect(Math.floor(x), Math.floor(y), 2, 2);
            } else {
              // Ocean dots
              ctx.fillStyle = '#222222';
              ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
            }
          }
        }
      }
      
      // Add network activity dots
      for (let i = 0; i < 6; i++) {
        const angle = (Date.now() / 1000 + i * 1.2) % (Math.PI * 2);
        const x = centerX + Math.cos(angle) * (radiusX * 0.9);
        const y = centerY + Math.sin(angle) * (radiusY * 0.9);
        
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(Math.floor(x), Math.floor(y), 2, 2);
      }
    };

    drawContinentalGlobe();
  }, [rotation]);

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
          GLOBAL NETWORK MAP
        </div>
        <div className="absolute bottom-1 left-1 text-xs text-cyan-500 font-mono">
          ENDPOINT LAT/LON
        </div>
        <div className="absolute bottom-1 right-1 text-xs text-cyan-400 font-mono">
          12.8759, 77.591
        </div>
        
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* CPU Usage Bar */}
      <div className="border border-cyan-500/30 bg-gray-800/30">
        <div className="px-2 py-1 text-xs text-cyan-300 flex justify-between">
          <span>CPU</span>
          <span>{Math.round(cpuUsage)}%</span>
        </div>
        <div className="px-2 pb-2">
          <div className="w-full bg-gray-700 h-2">
            <div 
              className="h-2 bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${cpuUsage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* RAM Usage Bar */}
      <div className="border border-cyan-500/30 bg-gray-800/30">
        <div className="px-2 py-1 text-xs text-cyan-300 flex justify-between">
          <span>RAM</span>
          <span>{Math.round(ramUsage)}%</span>
        </div>
        <div className="px-2 pb-2">
          <div className="w-full bg-gray-700 h-2">
            <div 
              className="h-2 bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
              style={{ width: `${ramUsage}%` }}
            ></div>
          </div>
        </div>
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
