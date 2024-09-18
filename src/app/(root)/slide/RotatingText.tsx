import React from 'react';

const RotatingText: React.FC = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="relative h-20 overflow-hidden">
        <div className="animate-slide relative text-4xl font-bold">
          <div className="slide-item">Hello World!</div>
          <div className="slide-item">Welcome to Next.js</div>
          <div className="slide-item">TypeScript & TailwindCSS</div>
        </div>
      </div>
    </div>
  );
};

export default RotatingText;
