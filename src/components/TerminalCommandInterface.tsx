import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TerminalCommandInterfaceProps {
  onCommand: (command: string) => void;
  currentSection: string;
  onNavigate?: (section: string) => void;
}

const TerminalCommandInterface: React.FC<TerminalCommandInterfaceProps> = ({ 
  onCommand, 
  currentSection, 
  onNavigate 
}) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [executedCommands, setExecutedCommands] = useState<string[]>([]);
  const [showQuickCommands, setShowQuickCommands] = useState(false);
  const [showNavigationCommands, setShowNavigationCommands] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sectionCommands = {
    about: ['whoami', 'cat about.txt', 'ls -la /personal'],
    projects: ['ls -la /projects', 'git log --oneline', 'cat projects.md'],
    skills: ['cat /proc/skills', 'ls skills/', 'cat specializations.txt'],
    resume: ['cat resume.md', 'cat experience.txt', 'cat education.txt'],
    contact: ['cat contact.txt', 'ping social-media', 'curl -X GET /contact']
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Collapse both panels when user starts typing
    if (value.length > 0 && (showQuickCommands || showNavigationCommands)) {
      setShowQuickCommands(false);
      setShowNavigationCommands(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const command = input.trim().toLowerCase();
      
      // Handle navigation commands
      if (command === 'projects' || command === 'project') {
        if (onNavigate) {
          onNavigate('projects');
        }
        setInput('');
        return;
      }
      
      // Handle section navigation commands
      const sectionMap: { [key: string]: string } = {
        'about': 'about',
        'skills': 'skills',
        'resume': 'resume',
        'contact': 'contact'
      };
      
      if (sectionMap[command] && onNavigate) {
        onNavigate(sectionMap[command]);
        setInput('');
        return;
      }
      
      setCommandHistory(prev => [...prev, input]);
      setExecutedCommands(prev => [...prev, input]);
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
        <div className="text-cyan-400 text-sm mb-2">
          {currentSection}@portfolio:~$ 
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-cyan-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono"
            placeholder={`Type a command (e.g., ${quickCommands[0] || 'help'})`}
          />
        </form>
      </div>
      
      {quickCommands.length > 0 && (
        <div className="mb-4 border border-cyan-500/30 bg-black/20">
          <button
            onClick={() => setShowQuickCommands(!showQuickCommands)}
            className="w-full flex items-center justify-between p-3 text-cyan-400 hover:bg-cyan-900/10 transition-colors"
          >
            <span className="text-xs">Quick Commands:</span>
            {showQuickCommands ? (
              <ChevronDown size={16} className="text-cyan-600" />
            ) : (
              <ChevronRight size={16} className="text-cyan-600" />
            )}
          </button>
          
          {showQuickCommands && (
            <div className="p-3 pt-0">
              <div className="flex flex-wrap gap-2">
                {quickCommands.map((cmd, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(cmd);
                      setExecutedCommands(prev => [...prev, cmd]);
                      onCommand(cmd);
                    }}
                    className="px-2 py-1 bg-cyan-800/30 text-cyan-400 text-xs border border-cyan-700/50 hover:bg-cyan-800/50 transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="mb-4 border border-cyan-500/30 bg-black/20">
        <button
          onClick={() => setShowNavigationCommands(!showNavigationCommands)}
          className="w-full flex items-center justify-between p-3 text-cyan-400 hover:bg-cyan-900/10 transition-colors"
        >
          <span className="text-xs">Navigation Commands:</span>
          {showNavigationCommands ? (
            <ChevronDown size={16} className="text-cyan-600" />
          ) : (
            <ChevronRight size={16} className="text-cyan-600" />
          )}
        </button>
        
        {showNavigationCommands && (
          <div className="p-3 pt-0">
            <div className="text-cyan-500 text-xs space-y-1">
              <div>• Type "projects" or "project" to go to projects section</div>
              <div>• Type "about", "skills", "resume", or "contact" to navigate</div>
            </div>
          </div>
        )}
      </div>
      
      {executedCommands.length > 0 && (
        <div className="mb-4">
          <div className="text-cyan-600 text-xs mb-2">Executed Commands:</div>
          <div className="text-cyan-500 text-xs space-y-1 max-h-20 overflow-y-auto">
            {executedCommands.slice(-5).map((cmd, index) => (
              <div key={index}>$ {cmd}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalCommandInterface;
