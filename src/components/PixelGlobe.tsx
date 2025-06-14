
import React, { useEffect, useState } from 'react';

const worldViewTitle = "WORLD VIEW";
const globalMapTitle = "GLOBAL NETWORK MAP";

const ASCII_FRAMES = [
  [
    "        . . .       ",
    "     .         .    ",
    "   .   O   O     .  ",
    "  .   O   O   O   . ",
    "  .   O   O   O   . ",
    "   .     O   O   .  ",
    "     .         .    ",
    "        . . .       ",
  ],
  [
    "        . . .       ",
    "     .         .    ",
    "   .   O     O   .  ",
    "  .   O   O   O   . ",
    "  .   O   O   O   . ",
    "   .   O     O   .  ",
    "     .         .    ",
    "        . . .       ",
  ],
  [
    "        . . .       ",
    "     .         .    ",
    "   .     O   O   .  ",
    "  .   O   O   O   . ",
    "  .   O   O   O   . ",
    "   .   O   O     .  ",
    "     .         .    ",
    "        . . .       ",
  ],
];

const globeColors = {
  dot: "text-cyan-400",
  circle: "text-cyan-600",
};

const getAsciiFrame = (step: number) => {
  const idx = step % ASCII_FRAMES.length;
  return ASCII_FRAMES[idx];
};

const PixelGlobe: React.FC = () => {
  const [step, setStep] = useState(0);
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({ lat: 0, lon: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
      setCoords({
        lat: 10 + 30 * Math.sin(Date.now() / 2400),
        lon: ((Date.now() / 400) % 360) - 180,
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  // Get lat/lon for overlay, two decimals and signed
  const latText = `${coords.lat >= 0 ? "" : "-"}${Math.abs(coords.lat).toFixed(4)}`;
  const lonText = `${coords.lon >= 0 ? "" : "-"}${Math.abs(coords.lon).toFixed(4)}`;

  const ascii = getAsciiFrame(step);
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
        {/* ASCII globe */}
        <div className="flex justify-center items-center my-2" style={{ height: 164 }}>
          <pre
            className="leading-5 text-center select-none font-mono"
            style={{
              color: "#22d3ee", // cyan-400
              fontSize: 18,
              letterSpacing: 3.3,
              marginTop: 10,
              marginBottom: 10,
              width: 155,
              textShadow: "0 0 4px #155e75cc"
            }}
          >
            {ascii.map((line, i) => (
              <span key={i} className="block">
                {
                  line.split("").map((ch, j) => {
                    if (ch === "O") {
                      return <span key={j} className="text-yellow-400 animate-pulse">•</span>;
                    }
                    if (ch === ".") {
                      return <span key={j} className="text-cyan-700">·</span>;
                    }
                    if (ch === " ") return " ";
                    return ch;
                  })
                }
              </span>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PixelGlobe;
