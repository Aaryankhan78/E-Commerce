import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2 bg-white dark:bg-zinc-800 dark:text-white dark:border-gray-600"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded p-2 bg-white dark:bg-zinc-800 dark:text-white dark:border-gray-600"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Message</label>
          <textarea
            name="message"
            className="w-full border rounded p-2 h-32 bg-white dark:bg-zinc-800 dark:text-white dark:border-gray-600"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
