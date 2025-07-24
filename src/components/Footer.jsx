import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center mt-10">
      <p className="text-sm">Made with ❤️ using React & Tailwind CSS</p>
      <a
        href="https://github.com/Rameshkumar1803/MealDB-app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-400 hover:underline"
      >
        View on GitHub
      </a>
    </footer>
  );
};

export default Footer;
