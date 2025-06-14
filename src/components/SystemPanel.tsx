
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
        return newLogs.slice(-10); // Keep only last 10 logs
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
    <div className="space-y-4 h-full overflow-y-auto">
      {/* System Stats */}
      <div className="terminal-panel p-4">
        <h3 className="text-green-300 mb-3">$ system status</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-green-500">Uptime:</span>
            <span className="text-green-400">{formatUptime(uptime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-500">Status:</span>
            <span className="text-green-400">Online</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-500">Load:</span>
            <span className="text-green-400">0.42</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-500">Processes:</span>
            <span className="text-green-400">127</span>
          </div>
        </div>
      </div>

      {/* Activity Monitor */}
      <div className="terminal-panel p-4 flex-1 min-h-0">
        <h3 className="text-green-300 mb-3">$ tail -f /var/log/portfolio</h3>
        <div className="space-y-1 text-xs overflow-y-auto max-h-48">
          {logs.map((log, index) => (
            <div key={index} className="text-green-600 hover:text-green-400 transition-colors">
              {log}
            </div>
          ))}
          <div className="text-green-400 animate-pulse">_</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="terminal-panel p-4">
        <h3 className="text-green-300 mb-3">$ df -h</h3>
        <div className="space-y-1 text-xs">
          <div className="text-green-500">Filesystem    Size  Used Avail</div>
          <div className="text-green-600">/skills       8.0G  7.2G  800M</div>
          <div className="text-green-600">/projects     12G   9.1G  2.9G</div>
          <div className="text-green-600">/experience   4.0G  3.8G  200M</div>
        </div>
      </div>
    </div>
  );
};

export default SystemPanel;
