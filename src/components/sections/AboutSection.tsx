
import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = `$ cat about.txt

Hello, I'm Shubham Azad, a Computer Science enthusiast and aspiring 
Full Stack Developer currently pursuing my B.Tech in Computer Science 
from Sahyadri College of Engineering and Management.

With a strong foundation in cybersecurity, software development, and 
emerging technologies, I specialize in building secure and scalable 
web applications using modern tech stacks including React.js, Node.js, 
Python, and Flutter.

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
    </div>
  );
};

export default AboutSection;
