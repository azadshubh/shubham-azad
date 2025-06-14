
import React from 'react';

const ResumeSection = () => {
  const experience = [
    {
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      description: 'Lead development of scalable web applications using React, Node.js, and AWS',
      achievements: [
        'Reduced application load time by 40%',
        'Led team of 4 developers',
        'Implemented CI/CD pipeline'
      ]
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Developed MVP and scaling infrastructure for B2B SaaS platform',
      achievements: [
        'Built platform from 0 to 10k users',
        'Integrated payment systems',
        'Optimized database performance'
      ]
    },
    {
      company: 'Digital Agency',
      position: 'Frontend Developer',
      period: '2019 - 2020',
      description: 'Created responsive websites and web applications for various clients',
      achievements: [
        'Delivered 20+ client projects',
        'Improved client satisfaction by 25%',
        'Mentored junior developers'
      ]
    }
  ];

  const education = [
    {
      degree: 'Computer Science, B.S.',
      school: 'Tech University',
      period: '2015 - 2019',
      gpa: '3.8/4.0'
    }
  ];

  const certifications = [
    'AWS Certified Developer',
    'Google Cloud Platform Professional',
    'MongoDB Certified Developer',
    'React Advanced Certification'
  ];

  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-green-300 text-xl mb-2">$ cat resume.md</h2>
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
      
      {/* Education */}
      <div className="mb-6">
        <h3 className="text-green-400 text-lg mb-3">## Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="p-4 bg-green-900/20 rounded border border-green-800">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-green-300 font-semibold">{edu.degree}</h4>
                <div className="text-green-500 text-sm">{edu.school}</div>
                <div className="text-green-600 text-xs">GPA: {edu.gpa}</div>
              </div>
              <span className="text-green-600 text-sm">{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Certifications */}
      <div className="mb-6">
        <h3 className="text-green-400 text-lg mb-3">## Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {certifications.map((cert, index) => (
            <div key={index} className="p-2 bg-green-900/20 rounded border border-green-800">
              <span className="text-green-500 text-sm">✓ {cert}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3 bg-green-900/20 rounded border border-green-800">
        <div className="text-xs text-green-600">
          $ wc -l resume.md<br/>
          42 resume.md
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
