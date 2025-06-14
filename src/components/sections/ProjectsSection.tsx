
import React from 'react';
import { Code, Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Production',
      lines: 15420
    },
    {
      name: 'Data Visualization Dashboard',
      description: 'Interactive analytics dashboard using D3.js and Python backend',
      tech: ['D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
      status: 'Development',
      lines: 8930
    },
    {
      name: 'Real-time Chat Application',
      description: 'WebSocket-based chat app with user authentication and file sharing',
      tech: ['Socket.io', 'Express', 'React', 'Redis'],
      status: 'Production',
      lines: 6750
    },
    {
      name: 'Portfolio Terminal UI',
      description: 'Terminal-inspired portfolio website with boot animations',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'Active',
      lines: 3200
    }
  ];

  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-green-300 text-xl mb-2">$ ls -la /projects</h2>
        <div className="text-xs text-green-600">
          total {projects.length} repositories
        </div>
      </div>
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="p-4 bg-green-900/20 rounded border border-green-800 hover:border-green-600 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Code size={16} className="text-green-400" />
                <h3 className="text-green-300 font-semibold">{project.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  project.status === 'Production' ? 'bg-green-800 text-green-300' :
                  project.status === 'Development' ? 'bg-yellow-800 text-yellow-300' :
                  'bg-blue-800 text-blue-300'
                }`}>
                  {project.status}
                </span>
                <Github size={14} className="text-green-600 cursor-pointer hover:text-green-400" />
              </div>
            </div>
            
            <p className="text-green-500 text-sm mb-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech, techIndex) => (
                <span key={techIndex} className="px-2 py-1 bg-green-800/50 text-green-400 text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="text-xs text-green-600">
              Lines of code: <span className="text-green-400">{project.lines.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-green-900/20 rounded border border-green-800">
        <div className="text-xs text-green-600">
          $ git log --oneline --graph<br/>
          * feat: Add new portfolio project<br/>
          * fix: Update project descriptions<br/>
          * feat: Implement terminal UI design<br/>
          * docs: Update README files
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
