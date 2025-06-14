
import React, { useEffect, useRef, useState } from 'react';

type Coord = { lat: number; lon: number };

// Utility: Converts degrees to radians
const deg2rad = (deg: number) => (deg * Math.PI) / 180;

// Utility: Spherical to Canvas XY
function pointOnGlobe(radius: number, lat: number, lon: number, cx: number, cy: number, rotY: number) {
  // First rotate by rotY around Y axis ("longitude" animation)
  const lambda = deg2rad(lon + rotY);
  const phi = deg2rad(lat);
  // Spherical to 3D
  const x = radius * Math.cos(phi) * Math.cos(lambda);
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(lambda);
  // Simple orthographic projection (z could be used for depth effect)
  return { x: cx + x, y: cy - y, z };
}

const worldViewTitle = "WORLD VIEW";
const globalMapTitle = "GLOBAL NETWORK MAP";

const PixelGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [coords, setCoords] = useState<Coord>({ lat: 0, lon: 0 });

  // Animate globe rotation and coordinates
  useEffect(() => {
    const step = () => {
      setRotation(r => (r + 1) % 360);
      // Animate endpoint in a visible latitude/longitude path
      setCoords({
        lat: 10 + 30 * Math.sin(Date.now() / 2400),
        lon: ((Date.now() / 400) % 360) - 180,
      });
    };
    const id = setInterval(step, 60);
    return () => clearInterval(id);
  }, []);

  // Draw grid, globe, overlays
  useEffect(() => {
    const size = 150;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    ctx.save();

    // Draw dotted grid background
    ctx.globalAlpha = 0.30;
    ctx.strokeStyle = "#222d";
    for (let y = 0; y < size; y += 10) {
      for (let x = 0; x < size; x += 10) {
        ctx.beginPath();
        ctx.arc(x, y, 0.6, 0, 2 * Math.PI);
        ctx.fillStyle = "#2dd4d8"; // faint cyanish
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1.0;

    // Draw ASCII-style dot globe (sparse lat/lon grid)
    const cx = size / 2, cy = size / 2, R = 48;
    for (let lat = -60; lat <= 60; lat += 12) {
      for (let lon = 0; lon < 360; lon += 15) {
        const { x, y, z } = pointOnGlobe(R, lat, lon, cx, cy, rotation);
        if (z > 0) { // only draw visible hemisphere
          ctx.beginPath();
          // Depth shading: farther dots dimmer
          const alpha = 0.7 + 0.3 * (z / R);
          ctx.globalAlpha = alpha;
          ctx.arc(x, y, 2.0 + (z > 0.8 * R ? 1.0 : 0), 0, 2 * Math.PI);
          ctx.fillStyle = "#38bdf8";
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Optional: Network endpoint "blip"
    const ep = pointOnGlobe(R, coords.lat, coords.lon, cx, cy, rotation);
    if (ep.z > 0) {
      ctx.beginPath();
      ctx.arc(ep.x, ep.y, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = "#facc15";
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }, [rotation, coords]);

  // Get lat/lon for overlay, two decimals and signed
  const latText = `${coords.lat >= 0 ? "" : "-"}${Math.abs(coords.lat).toFixed(4)}`;
  const lonText = `${coords.lon >= 0 ? "" : "-"}${Math.abs(coords.lon).toFixed(4)}`;

  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col items-center bg-black rounded-lg p-2 overflow-visible" style={{ width: 175, minHeight: 210 }}>
        {/* Overlayed labels */}
        <div className="w-full flex flex-row justify-between text-xs px-1 mb-1" style={{ fontFamily: 'monospace' }}>
          <span className="text-cyan-200 font-bold">{worldViewTitle}</span>
          <span className="text-cyan-500">{globalMapTitle}</span>
        </div>
        <div className="w-full flex flex-row justify-between text-xs px-1" style={{ fontFamily: 'monospace' }}>
          <span className="text-cyan-400">ENDPOINT LAT/LON</span>
          <span className="text-cyan-300">{latText}, {lonText}</span>
        </div>
        {/* Globe */}
        <div className="flex justify-center items-center my-2">
          <canvas
            ref={canvasRef}
            width={150}
            height={150}
            className="bg-transparent border-0"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PixelGlobe;
