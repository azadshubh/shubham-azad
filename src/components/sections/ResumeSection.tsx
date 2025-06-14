
import React from 'react';

const ResumeSection = () => {
  const experience = [
    {
      company: 'Surbhi Infotech',
      position: 'Technical Trainer (Remote)',
      period: 'April 2023 - October 2023',
      description: 'Developed and implemented comprehensive training programs for students',
      achievements: [
        'Designed diverse teaching methods utilizing practical demonstrations and exercises',
        'Created detailed technical documentation for training materials',
        'Acted as mentor providing guidance and assistance to trainees'
      ]
    },
    {
      company: 'IT Jharkhand, India',
      position: 'System Administration Intern',
      period: 'October 2023',
      description: 'Operating System Installation and computer system configuration',
      achievements: [
        'Installed multiple operating systems on various hardware setups',
        'Assembled and configured computer systems from ground up',
        'Set up Wi-Fi networks and ensured secure connections',
        'Diagnosed and resolved technical issues related to hardware and software'
      ]
    }
  ];

  const education = [
    {
      degree: 'B.Tech in Computer Science',
      school: 'Sahyadri College of Engineering and Management',
      period: '2022 - Present',
      gpa: '7.0/10',
      location: 'Mangalore, Karnataka',
      graduation: 'Expected May 2026'
    }
  ];

  const activities = [
    'Flagship Innovation Challenge of Eximus 2023, IIM Bangalore Entrepreneurship Summit by Unistop',
    'Cyber Tuesday: Web Security Alchemy Workshop JEI CSE Sahyadri Chapter'
  ];

  const coursework = [
    'Data Structures & Algorithms',
    'Machine Learning',
    'Artificial Intelligence', 
    'Object-Oriented Programming',
    'Digital Infrastructure',
    'Cybersecurity',
    'Software Development'
  ];

  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-green-300 text-xl mb-2">$ cat resume.md</h2>
      </div>
      
      {/* Education */}
      <div className="mb-6">
        <h3 className="text-green-400 text-lg mb-3">## Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="p-4 bg-green-900/20 rounded border border-green-800">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-green-300 font-semibold">{edu.degree}</h4>
                <div className="text-green-500 text-sm">{edu.school}</div>
                <div className="text-green-600 text-xs">{edu.location}</div>
                <div className="text-green-600 text-xs">CGPA: {edu.gpa}</div>
              </div>
              <div className="text-right">
                <span className="text-green-600 text-sm">{edu.period}</span>
                <div className="text-green-500 text-xs">{edu.graduation}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-green-400 text-lg mb-3">## Experience</h3>
        <div className="space-y-4">
          {experience.map((job, index) => (
            <div key={index} className="p-4 bg-green-900/20 rounded border border-green-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-green-300 font-semibold">{job.position}</h4>
                  <div className="text-green-500 text-sm">{job.company}</div>
                </div>
                <span className="text-green-600 text-sm">{job.period}</span>
              </div>
              
              <p className="text-green-500 text-sm mb-3">{job.description}</p>
              
              <div className="space-y-1">
                {job.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="text-green-600 text-sm">
                    • {achievement}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Relevant Coursework */}
      <div className="mb-6">
        <h3 className="text-green-400 text-lg mb-3">## Relevant Coursework</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {coursework.map((course, index) => (
            <div key={index} className="p-2 bg-green-900/20 rounded border border-green-800">
              <span className="text-green-500 text-sm">• {course}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="mb-6">
        <h3 className="text-green-400 text-lg mb-3">## Activities</h3>
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <div key={index} className="p-3 bg-green-900/20 rounded border border-green-800">
              <span className="text-green-500 text-sm">✓ {activity}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3 bg-green-900/20 rounded border border-green-800">
        <div className="text-xs text-green-600">
          $ wc -l resume.md<br/>
          89 resume.md
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
