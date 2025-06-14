
import React, { useState, useRef, useEffect } from 'react';

interface TerminalCommandInterfaceProps {
  onCommand: (command: string) => void;
  currentSection: string;
}

const TerminalCommandInterface: React.FC<TerminalCommandInterfaceProps> = ({ onCommand, currentSection }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const sectionCommands = {
    about: ['whoami', 'cat about.txt', 'ls -la /personal'],
    projects: ['ls -la /projects', 'git log --oneline', 'cat projects.md'],
    skills: ['cat /proc/skills', 'ls skills/', 'cat specializations.txt'],
    resume: ['cat resume.md', 'cat experience.txt', 'cat education.txt'],
    contact: ['cat contact.txt', 'ping social-media', 'curl -X GET /contact']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      onCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const quickCommands = sectionCommands[currentSection as keyof typeof sectionCommands] || [];

  return (
    <div className="mb-6">
      <div className="mb-4">
        <div className="text-green-400 text-sm mb-2">
          {currentSection}@portfolio:~$ 
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-300 font-mono"
            placeholder={`Type a command (e.g., ${quickCommands[0] || 'help'})`}
          />
        </form>
      </div>
      
      {quickCommands.length > 0 && (
        <div className="mb-4 p-3 bg-green-900/10 rounded border border-green-800">
          <div className="text-green-600 text-xs mb-2">Quick Commands:</div>
          <div className="flex flex-wrap gap-2">
            {quickCommands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(cmd);
                  onCommand(cmd);
                }}
                className="px-2 py-1 bg-green-800/30 text-green-400 text-xs rounded hover:bg-green-800/50 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {commandHistory.length > 0 && (
        <div className="mb-4">
          <div className="text-green-600 text-xs mb-2">Command History:</div>
          <div className="text-green-500 text-xs space-y-1 max-h-20 overflow-y-auto">
            {commandHistory.slice(-5).map((cmd, index) => (
              <div key={index}>$ {cmd}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalCommandInterface;
