
import React from 'react';
import { User, Code, Wrench, FileText, Mail } from 'lucide-react';
import PixelGlobe from './PixelGlobe';

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
    <div className="h-full flex flex-col">
      {/* Panel Header */}
      <div className="h-8 border-b border-cyan-500/30 bg-gray-800/50 flex items-center px-3">
        <span className="text-cyan-300 text-sm uppercase tracking-wider">FILESYSTEM</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-4">
          <div className="text-cyan-300 text-sm mb-2">$ ls -la /portfolio</div>
          <div className="text-xs text-cyan-600 border-l-2 border-cyan-500/30 pl-2">
            total {menuItems.length} items
          </div>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left p-2 transition-all duration-200 group border ${
                  isActive 
                    ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' 
                    : 'border-cyan-500/20 hover:border-cyan-400/50 text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-cyan-600'} />
                  <div className="flex-1">
                    <div className="font-mono text-xs">{item.label}</div>
                    <div className="text-xs text-cyan-600/80 group-hover:text-cyan-500">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="text-cyan-400 text-xs">█</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-6 mb-6 border border-cyan-500/30 bg-gray-800/30">
          <div className="border-b border-cyan-500/30 px-2 py-1 bg-gray-800/50">
            <div className="text-xs text-cyan-300 uppercase tracking-wider">NETWORK</div>
          </div>
          <div className="p-3">
            <PixelGlobe />
          </div>
        </div>
        
        <div className="border border-cyan-500/30 bg-gray-800/30">
          <div className="border-b border-cyan-500/30 px-2 py-1 bg-gray-800/50">
            <div className="text-xs text-cyan-300 uppercase tracking-wider">HELP</div>
          </div>
          <div className="p-2">
            <div className="text-xs space-y-1 text-cyan-500">
              <div>• Click sections to navigate</div>
              <div>• Use terminal commands</div>
              <div>• Type section names for quick nav</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
