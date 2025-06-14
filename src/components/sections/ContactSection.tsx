
import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent successfully!');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contacts = [
    {
      platform: 'Email',
      handle: 'dev@example.com',
      icon: Mail,
      color: 'text-green-400'
    },
    {
      platform: 'GitHub',
      handle: 'github.com/username',
      icon: Github,
      color: 'text-green-400'
    },
    {
      platform: 'LinkedIn',
      handle: 'linkedin.com/in/username',
      icon: Linkedin,
      color: 'text-green-400'
    }
  ];

  return (
    <div className="h-full overflow-y-auto max-h-96">
      <div className="mb-4">
        <h2 className="text-green-300 text-xl mb-2">$ ./contact.sh</h2>
      </div>
      
      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-green-400 text-lg mb-3">Connection established:</h3>
        <div className="space-y-3">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-900/20 rounded border border-green-800 hover:border-green-600 transition-colors cursor-pointer">
                <Icon size={18} className={contact.color} />
                <div>
                  <div className="text-green-300 text-sm font-semibold">{contact.platform}</div>
                  <div className="text-green-500 text-xs">{contact.handle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Contact Form */}
      <div>
        <h3 className="text-green-400 text-lg mb-3">$ nano message.txt</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-500 text-sm mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 focus:border-green-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-green-500 text-sm mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 focus:border-green-400 focus:outline-none"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-green-500 text-sm mb-1">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 focus:border-green-400 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-green-500 text-sm mb-1">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 focus:border-green-400 focus:outline-none resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-2 bg-green-800 text-green-300 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </div>
      
      <div className="mt-6 p-3 bg-green-900/20 rounded border border-green-800">
        <div className="text-xs text-green-600">
          $ ping status<br/>
          Response time: Always fast<br/>
          Availability: 24/7<br/>
          Status: Ready to collaborate
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
