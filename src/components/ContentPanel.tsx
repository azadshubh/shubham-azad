
import React, { useState } from 'react';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ResumeSection from './sections/ResumeSection';
import ContactSection from './sections/ContactSection';
import TerminalCommandInterface from './TerminalCommandInterface';

interface ContentPanelProps {
  section: string;
  isTransitioning: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ section, isTransitioning }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showContent, setShowContent] = useState(false);

  const handleCommand = (command: string) => {
    setCurrentCommand(command);
    setShowContent(true);
  };

  const renderSection = () => {
    if (!showContent) return null;
    
    switch (section) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'resume':
        return <ResumeSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="terminal-panel h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 max-h-full">
        <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <TerminalCommandInterface onCommand={handleCommand} currentSection={section} />
          <div className="overflow-y-auto max-h-96">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPanel;
