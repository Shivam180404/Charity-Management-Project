import React from 'react';

const socialLinks = [
  {
    name: 'Facebook',
    icon: '📘',
    url: 'https://www.facebook.com/your-affiliate-link',
    description: 'Follow us on Facebook for updates and community engagement'
  },
  {
    name: 'Instagram',
    icon: '📸',
    url: 'https://www.instagram.com/your-affiliate-link',
    description: 'Follow us on Instagram for visual stories and impact'
  },
  {
    name: 'Gmail',
    icon: '📧',
    url: 'mailto:your-email@example.com',
    description: 'Contact us via email for inquiries and support'
  }
];

const SocialLinks = () => {
  const handleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Connect With Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((social) => (
            <div
              key={social.name}
              onClick={() => handleClick(social.url)}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl">{social.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">{social.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{social.description}</p>
              <div className="flex justify-end">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Connect →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            By connecting with us on social media, you'll stay updated with our latest initiatives and impact stories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks; 