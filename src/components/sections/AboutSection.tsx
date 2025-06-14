
import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = `$ cat about.txt

Hello, I'm a Full Stack Developer with a passion for creating 
innovative digital solutions. I specialize in modern web 
technologies and enjoy building applications that make a 
difference.

With expertise in React, Node.js, Python, and cloud technologies,
I've contributed to various projects ranging from e-commerce 
platforms to data visualization tools.

When I'm not coding, you can find me exploring new technologies,
contributing to open-source projects, or enjoying a good cup of 
coffee while planning the next big idea.

Currently based in San Francisco, always excited about new 
opportunities and collaborations.

$ ls -la personal/
drwxr-xr-x  2 dev dev 4096 Dec 14 2024 hobbies/
-rw-r--r--  1 dev dev  512 Dec 14 2024 interests.txt
-rw-r--r--  1 dev dev  256 Dec 14 2024 goals.md
drwxr-xr-x  2 dev dev 4096 Dec 14 2024 projects/

$ echo "Always learning, always building."`;

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
    <div className="h-full">
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
            <span className="text-green-400 ml-2">San Francisco, CA</span>
          </div>
          <div>
            <span className="text-green-600">Role:</span>
            <span className="text-green-400 ml-2">Full Stack Developer</span>
          </div>
          <div>
            <span className="text-green-600">Experience:</span>
            <span className="text-green-400 ml-2">5+ Years</span>
          </div>
          <div>
            <span className="text-green-600">Focus:</span>
            <span className="text-green-400 ml-2">Web Technologies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
