import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Camera } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.userId.trim().toUpperCase() === 'MSMAA01') {
      // Set secure admin token session inside localStorage
      localStorage.setItem('adminToken', 'SECRET_MUHURTHAM_ADMIN_NODE_KEY');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Secret Admin ID!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col justify-center items-center px-4 font-sans text-neutral-200">
      
      <div className="flex flex-col items-center mb-8">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-full mb-3">
          <Shield className="w-12 h-12 text-amber-500" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide text-white">
          STUDIO CONTROL CONSOLE
        </h1>
        <p className="text-xs text-amber-500 mt-1 uppercase tracking-widest font-mono">Secret Admin Node</p>
      </div>

      <div className="w-full max-w-md bg-neutral-900/80 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Secret Admin ID
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
              placeholder="Enter Admin ID"
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Secret PassKey
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold rounded-xl hover:from-amber-400 transition-all shadow-lg"
          >
            AUTHORIZE CONSOLE →
          </button>
        </form>
      </div>
    </div>
  );
}