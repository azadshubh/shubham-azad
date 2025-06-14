
import React from 'react';

const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'C/C++', level: 90, years: 3 },
        { name: 'Java', level: 85, years: 2 },
        { name: 'Python', level: 88, years: 2 },
        { name: 'JavaScript', level: 82, years: 2 },
        { name: 'Dart', level: 75, years: 1 },
        { name: 'PHP', level: 80, years: 2 }
      ]
    },
    {
      category: 'Developer Tools',
      skills: [
        { name: 'VS Code', level: 95, years: 3 },
        { name: 'Git', level: 88, years: 2 },
        { name: 'GitHub', level: 85, years: 2 },
        { name: 'Docker', level: 78, years: 1 },
        { name: 'Bash Script', level: 80, years: 2 }
      ]
    },
    {
      category: 'Technologies/Frameworks',
      skills: [
        { name: 'Flutter', level: 82, years: 1 },
        { name: 'Node.js', level: 80, years: 2 },
        { name: 'React.js', level: 85, years: 2 },
        { name: 'Next.js', level: 75, years: 1 },
        { name: 'Linux', level: 88, years: 3 },
        { name: 'Grafana', level: 70, years: 1 },
        { name: 'Prometheus', level: 68, years: 1 }
      ]
    }
  ];

  const specializations = [
    'Cybersecurity', 'Software Development', 'Data Structures & Algorithms',
    'Machine Learning', 'Artificial Intelligence', 'Object-Oriented Programming',
    'Digital Infrastructure', 'Web Security', 'Database Management'
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
              └── {category.category.toLowerCase().replace(/\s+/g, '_')}/
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
        <h3 className="text-green-400 text-lg mb-3">$ cat specializations.txt</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {specializations.map((spec, index) => (
            <div key={index} className="p-2 bg-green-900/20 rounded border border-green-800 text-center">
              <span className="text-green-500 text-sm">{spec}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-green-900/20 rounded border border-green-800">
        <div className="text-xs text-green-600">
          $ uptime<br/>
          Learning new technologies for 3+ years, CGPA: 7.0, load average: always high
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
