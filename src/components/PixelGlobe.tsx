
import React, { useEffect, useRef, useState } from 'react';

/**
 * PixelGlobe Component
 * 
 * A responsive 3D globe visualization that displays:
 * - Rotating pixelated world map with highlighted continents
 * - Real-time network statistics (connections, packets, bandwidth)
 * - User location data (IP, browser, location)
 * - Adaptive layout for mobile and desktop devices
 * 
 * Features:
 * - Canvas-based pixel art globe rendering
 * - Automatic device detection and responsive layouts
 * - Real-time data fetching from ipapi.co
 * - Animated rotation and data updates
 * - Highlighted Indian subcontinent in cyan
 */
const PixelGlobe = () => {
  // Canvas reference for direct drawing operations
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Globe rotation state (in radians)
  const [rotation, setRotation] = useState(0);
  
  // Mobile device detection state
  const [isMobile, setIsMobile] = useState(false);
  
  // Network and user data state
  const [networkData, setNetworkData] = useState({
    connections: 127,        // Simulated network connections
    packets: 0,             // Packet counter
    bandwidth: '2.4 Mbps',  // Network bandwidth
    ipAddress: 'Loading...', // User's IP address
    browser: 'Loading...',   // User's browser info
    location: 'Loading...'   // User's geographic location
  });

  /**
   * Mobile Device Detection Effect
   * 
   * Monitors window width and sets mobile state for responsive layouts.
   * Breakpoint: 768px (Tailwind md breakpoint)
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for window resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * User Data Fetching Effect
   * 
   * Fetches real user data including:
   * - IP address and location from ipapi.co
   * - Browser information from navigator.userAgent
   * 
   * Includes fallback handling for API failures
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Extract browser information from user agent
        const userAgent = navigator.userAgent;
        const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/([0-9.]+)/);
        const browserInfo = browserMatch ? `${browserMatch[1]}/${browserMatch[2]}` : 'Unknown Browser';

        // Fetch location data from IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Update state with fetched data
        setNetworkData(prev => ({
          ...prev,
          ipAddress: data.ip || 'Unknown',
          browser: browserInfo,
          location: data.city && data.region ? `${data.city}, ${data.region}` : 'Unknown Location'
        }));
      } catch (error) {
        // Fallback data when API is unavailable
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

  /**
   * Globe Rendering Effect
   * 
   * Handles the main canvas drawing logic for the pixelated globe:
   * - Creates responsive canvas dimensions
   * - Renders continental outlines using pixel grid
   * - Applies rotation transformation
   * - Highlights specific regions (Indian subcontinent)
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive canvas sizing based on device type
    const width = isMobile ? 300 : 200;
    const height = isMobile ? 240 : 160;
    canvas.width = width;
    canvas.height = height;

    /**
     * Main Globe Drawing Function
     * 
     * Renders the pixelated globe using mathematical projection:
     * - Uses spherical to cartesian coordinate conversion
     * - Applies visibility culling for back-facing pixels
     * - Renders continents with different colors
     */
    const drawContinentalGlobe = () => {
      // Clear canvas with black background
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      // Globe center and radius calculations
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = isMobile ? 90 : 60;  // Horizontal radius
      const radiusY = isMobile ? 75 : 50;  // Vertical radius (elliptical)
      
      /**
       * Continental Definition Array
       * 
       * Defines geographic boundaries for each continent:
       * - latRange: [min_latitude, max_latitude]
       * - lonRange: [min_longitude, max_longitude]
       * - color: hex color for rendering
       */
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
        // Indian Subcontinent (highlighted in cyan)
        { latRange: [6, 35], lonRange: [68, 97], color: '#00ffff' }
      ];
      
      // Responsive pixel sizing
      const dotSpacing = isMobile ? 3 : 4;      // Space between pixels
      const dotSize = isMobile ? 3 : 2;         // Land pixel size
      const oceanDotSize = isMobile ? 2 : 1;    // Ocean pixel size
      
      // Iterate through latitude and longitude grid
      for (let lat = -90; lat <= 90; lat += dotSpacing) {
        for (let lon = -180; lon <= 180; lon += dotSpacing) {
          // Apply rotation to longitude
          const rotatedLon = lon + (rotation * 180 / Math.PI);
          
          // Spherical to cartesian projection
          const x = centerX + (radiusX * Math.cos(lat * Math.PI / 180) * Math.sin(rotatedLon * Math.PI / 180));
          const y = centerY - (radiusY * Math.sin(lat * Math.PI / 180));
          
          // Visibility check (front-facing pixels only)
          const visible = Math.cos(lat * Math.PI / 180) * Math.cos(rotatedLon * Math.PI / 180) > 0;
          
          // Render pixel if visible and within canvas bounds
          if (visible && x >= 0 && x < width && y >= 0 && y < height) {
            let isLand = false;
            let dotColor = '#333333';
            
            // Check if current coordinates are within any continent
            for (const continent of continents) {
              if (lat >= continent.latRange[0] && lat <= continent.latRange[1] &&
                  lon >= continent.lonRange[0] && lon <= continent.lonRange[1]) {
                isLand = true;
                dotColor = continent.color;
                break;
              }
            }
            
            if (isLand) {
              // Render land pixels
              ctx.fillStyle = dotColor;
              ctx.fillRect(Math.floor(x), Math.floor(y), dotSize, dotSize);
            } else {
              // Render ocean pixels
              ctx.fillStyle = '#222222';
              ctx.fillRect(Math.floor(x), Math.floor(y), oceanDotSize, oceanDotSize);
            }
          }
        }
      }
    };

    drawContinentalGlobe();
  }, [rotation, isMobile]);

  /**
   * Globe Rotation Animation Effect
   * 
   * Continuously rotates the globe at a steady rate.
   * Updates every 50ms for smooth animation.
   */
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotation(prev => prev + 0.008); // Rotation speed
    }, 50);

    return () => clearInterval(rotationTimer);
  }, []);

  /**
   * Network Data Simulation Effect
   * 
   * Simulates real-time network activity by updating:
   * - Connection count (random fluctuation)
   * - Packet counter (incremental)
   * - Bandwidth (random variation)
   */
  useEffect(() => {
    const dataTimer = setInterval(() => {
      setNetworkData(prev => ({
        ...prev,
        connections: prev.connections + Math.floor(Math.random() * 3) - 1, // ±1 variation
        packets: prev.packets + Math.floor(Math.random() * 100),           // 0-99 increment
        bandwidth: `${(Math.random() * 2 + 1.5).toFixed(1)} Mbps`         // 1.5-3.5 Mbps
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(dataTimer);
  }, []);

  /**
   * Mobile Layout Render
   * 
   * Optimized layout for mobile devices featuring:
   * - Larger globe canvas (300x240px)
   * - Bigger text and UI elements
   * - Grid-based data layout for better readability
   */
  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        {/* Globe Container with Overlays */}
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="border border-cyan-500/30 bg-black w-full"
            style={{ imageRendering: 'pixelated' }} // Preserve pixel art style
          />
          
          {/* Corner Labels */}
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
          
          {/* Status Indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Data Grid Layout */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Network Statistics */}
          <div className="space-y-2">
            <div className="text-cyan-400">CONN: {networkData.connections}</div>
            <div className="text-cyan-500">PKT: {networkData.packets}</div>
            <div className="text-cyan-300">{networkData.bandwidth}</div>
          </div>
          
          {/* User Information */}
          <div className="space-y-2">
            <div className="text-cyan-400">IP: {networkData.ipAddress}</div>
            <div className="text-cyan-500">UA: {networkData.browser}</div>
            <div className="text-cyan-300">LOC: {networkData.location}</div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Desktop Layout Render
   * 
   * Compact layout for desktop devices featuring:
   * - Smaller globe canvas (200x160px)
   * - Vertical data stacking
   * - Space-efficient design for sidebar placement
   */
  return (
    <div className="space-y-3">
      {/* Globe Container with Overlays */}
      <div className="relative">
        <canvas 
          ref={canvasRef}
          className="border border-cyan-500/30 bg-black"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Corner Labels */}
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
        
        {/* Status Indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* Network Statistics Section */}
      <div className="text-xs space-y-1">
        <div className="text-cyan-400">CONN: {networkData.connections}</div>
        <div className="text-cyan-500">PKT: {networkData.packets}</div>
        <div className="text-cyan-300">{networkData.bandwidth}</div>
      </div>
      
      {/* User Information Section */}
      <div className="border-t border-cyan-500/20 pt-2 space-y-1 text-xs">
        <div className="text-cyan-400">IP: {networkData.ipAddress}</div>
        <div className="text-cyan-500">UA: {networkData.browser}</div>
        <div className="text-cyan-300">LOC: {networkData.location}</div>
      </div>
    </div>
  );
};

export default PixelGlobe;
