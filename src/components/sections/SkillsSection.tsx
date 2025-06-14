
import React from 'react';

const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React/Next.js', level: 95, years: 4 },
        { name: 'TypeScript', level: 90, years: 3 },
        { name: 'Tailwind CSS', level: 88, years: 2 },
        { name: 'Vue.js', level: 75, years: 2 }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 92, years: 4 },
        { name: 'Python', level: 85, years: 3 },
        { name: 'PostgreSQL', level: 80, years: 3 },
        { name: 'MongoDB', level: 78, years: 2 }
      ]
    },
    {
      category: 'DevOps',
      skills: [
        { name: 'Docker', level: 82, years: 3 },
        { name: 'AWS', level: 78, years: 2 },
        { name: 'CI/CD', level: 75, years: 2 },
        { name: 'Kubernetes', level: 65, years: 1 }
      ]
    }
  ];

  const tools = [
    'VS Code', 'Git', 'Postman', 'Figma', 'Jira', 'Slack', 
    'Terminal', 'Chrome DevTools', 'Webpack', 'Vite'
  ];

  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-green-300 text-xl mb-2">$ cat /proc/skills</h2>
      </div>
      
      <div className="space-y-6">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-green-400 text-lg mb-3">
              └── {category.category.toLowerCase()}/
            </h3>
            
            <div className="space-y-3 ml-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-500">{skill.name}</span>
                    <span className="text-green-600">{skill.years}y • {skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-1000 glow-green"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h3 className="text-green-400 text-lg mb-3">$ which tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {tools.map((tool, index) => (
            <div key={index} className="p-2 bg-green-900/20 rounded border border-green-800 text-center">
              <span className="text-green-500 text-sm">{tool}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-green-900/20 rounded border border-green-800">
        <div className="text-xs text-green-600">
          $ uptime<br/>
          Learning new technologies for 5+ years, 0 users, load average: always high
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
