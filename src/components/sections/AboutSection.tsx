
import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = `$ cat about.txt

Hello, I'm Shubham Azad, a Computer Science enthusiast and aspiring 
Full Stack Developer currently pursuing my B.Tech in Computer Science 
from Sahyadri College of Engineering and Management.

With a strong foundation in cybersecurity, software development, and 
emerging technologies, I specialize in building secure and scalable 
web applications using modern tech stacks.

My expertise spans across multiple programming languages including 
C/C++, Java, Python, JavaScript, and frameworks like React.js, 
Node.js, and Flutter. I'm passionate about machine learning, 
artificial intelligence, and cybersecurity.

When I'm not coding, you can find me exploring digital infrastructure,
contributing to open-source projects, or working on innovative solutions
that bridge the gap between technology and real-world problems.

Currently based in Mangalore, Karnataka, always eager to learn and 
collaborate on exciting projects that make a meaningful impact.

$ ls -la personal/
drwxr-xr-x  2 dev dev 4096 Dec 14 2024 projects/
-rw-r--r--  1 dev dev  512 Dec 14 2024 certifications.txt
-rw-r--r--  1 dev dev  256 Dec 14 2024 achievements.md
drwxr-xr-x  2 dev dev 4096 Dec 14 2024 internships/

$ echo "Always learning, always innovating."`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full overflow-y-auto max-h-96">
      <div className="mb-4">
        <h2 className="text-green-300 text-xl mb-2">whoami</h2>
      </div>
      
      <div className="text-green-500 whitespace-pre-wrap font-mono text-sm leading-relaxed">
        {displayText}
        <span className="animate-pulse">_</span>
      </div>
      
      <div className="mt-6 p-4 bg-green-900/20 rounded border border-green-800">
        <div className="text-green-400 text-sm mb-2">Quick Facts:</div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-green-600">Location:</span>
            <span className="text-green-400 ml-2">Mangalore, Karnataka</span>
          </div>
          <div>
            <span className="text-green-600">Role:</span>
            <span className="text-green-400 ml-2">CS Undergraduate</span>
          </div>
          <div>
            <span className="text-green-600">CGPA:</span>
            <span className="text-green-400 ml-2">7.0/10</span>
          </div>
          <div>
            <span className="text-green-600">Focus:</span>
            <span className="text-green-400 ml-2">Full Stack Development</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
