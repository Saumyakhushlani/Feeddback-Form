"use client";
import React, { useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [resultData, setResultData] = useState(null); // <-- to store API result
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResultData(null);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setResultData(result); // save the result to state
        setFormData({ email: '', password: '' }); // clear form
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white text-black rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>

      {/* Show result */}
      {resultData && (
        <div className="mt-6 bg-white text-black p-4 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-lg font-bold mb-2">Login Response:</h3>
          <pre className="whitespace-pre-wrap break-words text-sm">
            {JSON.stringify(resultData, null, 2)}
          </pre>
        </div>
      )}

      {/* Show error */}
      {error && (
        <p className="mt-4 text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Page;
