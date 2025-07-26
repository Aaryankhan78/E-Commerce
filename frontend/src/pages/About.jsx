import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About E-Shop</h1>
        <p className="text-lg leading-8 mb-6">
          Welcome to <span className="text-primary font-semibold">E-Shop</span> – your one-stop destination for seamless and smart online shopping. 
          Our mission is to deliver a modern, user-friendly e-commerce experience that helps you discover quality products quickly and conveniently.
        </p>
        <p className="text-lg leading-8 mb-6">
          Built with <strong>React</strong>, <strong>Zustand</strong>, and <strong>Tailwind CSS</strong>, ShopEase empowers users with intuitive product browsing, 
          AI-powered recommendations, lightning-fast checkout, and a clean design tailored for all devices.
        </p>
        <p className="text-lg leading-8">
          This project is <strong>open-source</strong> and created with passion by developers and creators who believe online shopping should be smooth, beautiful, 
          and accessible to everyone.
        </p>
      </div>
    </section>
  );
};

export default About;
