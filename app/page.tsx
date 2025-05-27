'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
}

export default function FeedbackForm() {
  const [form, setForm] = useState<FeedbackFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Feedback submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          name="message"
          placeholder="Your feedback"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
