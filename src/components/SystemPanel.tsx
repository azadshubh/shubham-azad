
import React, { useState, useEffect } from 'react';

const SystemPanel = () => {
  const [uptime, setUptime] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const uptimeTimer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(uptimeTimer);
  }, []);

  useEffect(() => {
    const logMessages = [
      'System initialized successfully',
      'Portfolio modules loaded',
      'Network connection established',
      'User interface ready',
      'All systems operational',
    ];

    const logTimer = setInterval(() => {
      const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date().toLocaleTimeString();
      
      setLogs(prev => {
        const newLogs = [...prev, `[${timestamp}] ${randomMessage}`];
        return newLogs.slice(-10);
      });
    }, 5000);

    return () => clearInterval(logTimer);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col p-3 space-y-3">
      {/* System Stats */}
      <div className="border border-cyan-500/30 bg-gray-800/30">
        <div className="border-b border-cyan-500/30 px-2 py-1 bg-gray-800/50">
          <div className="text-xs text-cyan-300 uppercase tracking-wider">STATUS</div>
        </div>
        <div className="p-2 space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-cyan-500">UPTIME</span>
            <span className="text-cyan-400 font-mono">{formatUptime(uptime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-500">STATUS</span>
            <span className="text-green-400">ONLINE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-500">LOAD</span>
            <span className="text-cyan-400 font-mono">0.42</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-500">PROC</span>
            <span className="text-cyan-400 font-mono">127</span>
          </div>
        </div>
      </div>

      {/* Activity Monitor */}
      <div className="flex-1 border border-cyan-500/30 bg-gray-800/30 min-h-0">
        <div className="border-b border-cyan-500/30 px-2 py-1 bg-gray-800/50">
          <div className="text-xs text-cyan-300 uppercase tracking-wider">LOGS</div>
        </div>
        <div className="p-2 h-full overflow-y-auto">
          <div className="space-y-1 text-xs">
            {logs.map((log, index) => (
              <div key={index} className="text-cyan-600 hover:text-cyan-400 transition-colors font-mono">
                {log}
              </div>
            ))}
            <div className="text-cyan-400 animate-pulse">█</div>
          </div>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="border border-cyan-500/30 bg-gray-800/30">
        <div className="border-b border-cyan-500/30 px-2 py-1 bg-gray-800/50">
          <div className="text-xs text-cyan-300 uppercase tracking-wider">STORAGE</div>
        </div>
        <div className="p-2 space-y-1 text-xs font-mono">
          <div className="text-cyan-500">Filesystem    Size  Used</div>
          <div className="text-cyan-600">/skills       8.0G  7.2G</div>
          <div className="text-cyan-600">/projects     12G   9.1G</div>
          <div className="text-cyan-600">/experience   4.0G  3.8G</div>
        </div>
      </div>
    </div>
  );
};

export default SystemPanel;
