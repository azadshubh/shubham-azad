
import React from 'react';
import { User, Code, Wrench, FileText, Mail } from 'lucide-react';

interface NavigationPanelProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ currentSection, onNavigate }) => {
  const menuItems = [
    { id: 'about', label: 'about.sh', icon: User, description: 'Personal information' },
    { id: 'projects', label: 'projects.sh', icon: Code, description: 'Code repositories' },
    { id: 'skills', label: 'skills.sh', icon: Wrench, description: 'Technical stack' },
    { id: 'resume', label: 'resume.sh', icon: FileText, description: 'Work experience' },
    { id: 'contact', label: 'contact.sh', icon: Mail, description: 'Get in touch' },
  ];

  return (
    <div className="terminal-panel p-4 h-full">
      <div className="mb-4">
        <h2 className="text-green-300 text-lg mb-2">$ ls -la /portfolio</h2>
        <div className="text-xs text-green-600">
          total {menuItems.length} items
        </div>
      </div>
      
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left p-3 rounded transition-all duration-200 group ${
                isActive 
                  ? 'bg-green-900/30 border-l-4 border-green-400 text-green-300' 
                  : 'hover:bg-green-900/20 text-green-500 hover:text-green-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={16} className={isActive ? 'text-green-400' : 'text-green-600'} />
                <div className="flex-1">
                  <div className="font-mono text-sm">{item.label}</div>
                  <div className="text-xs text-green-600 group-hover:text-green-500">
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <div className="text-green-400 text-xs">▶</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 p-3 bg-green-900/20 rounded border border-green-800">
        <div className="text-xs text-green-600 mb-2">Quick Commands:</div>
        <div className="text-xs space-y-1 text-green-500">
          <div>$ whoami → about</div>
          <div>$ ls projects → projects</div>
          <div>$ cat skills → skills</div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
