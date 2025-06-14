
import React from 'react';

const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'C/C++', years: 3 },
        { name: 'Java', years: 2 },
        { name: 'Python', years: 2 },
        { name: 'JavaScript', years: 2 },
        { name: 'Dart', years: 1 },
        { name: 'PHP', years: 2 }
      ]
    },
    {
      category: 'Developer Tools',
      skills: [
        { name: 'VS Code', years: 3 },
        { name: 'Git', years: 2 },
        { name: 'GitHub', years: 2 },
        { name: 'Docker', years: 1 },
        { name: 'Bash Script', years: 2 }
      ]
    },
    {
      category: 'Technologies/Frameworks',
      skills: [
        { name: 'Flutter', years: 1 },
        { name: 'Node.js', years: 2 },
        { name: 'React.js', years: 2 },
        { name: 'Next.js', years: 1 },
        { name: 'Linux', years: 3 },
        { name: 'Grafana', years: 1 },
        { name: 'Prometheus', years: 1 }
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
            
            <div className="space-y-2 ml-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex justify-between items-center">
                  <span className="text-green-500">{skill.name}</span>
                  <span className="text-green-600">{skill.years}y</span>
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
