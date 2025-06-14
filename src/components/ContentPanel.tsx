
import React from 'react';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ResumeSection from './sections/ResumeSection';
import ContactSection from './sections/ContactSection';

interface ContentPanelProps {
  section: string;
  isTransitioning: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ section, isTransitioning }) => {
  const renderSection = () => {
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
    <div className="terminal-panel p-4 h-full overflow-auto">
      <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderSection()}
      </div>
    </div>
  );
};

export default ContentPanel;
