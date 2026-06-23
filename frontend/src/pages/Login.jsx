import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Users } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('customer'); // customer, staff
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (loginType === 'staff') {
      if (formData.userId.trim() !== '' && formData.password.trim() !== '') {
        navigate('/staff/dashboard');
      } else {
        setError('Please enter valid Staff ID and Password!');
      }
    } else if (loginType === 'customer') {
      if (formData.userId.trim() !== '' && formData.password.trim() !== '') {
        navigate('/customer/track');
      } else {
        setError('Please enter valid Customer tracking ID!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col justify-center items-center px-4 font-sans text-neutral-200">
      
      <div className="flex flex-col items-center mb-8">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-full mb-3">
          <Camera className="w-12 h-12 text-amber-500" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
          MUHURTHAM STUDIOS
        </h1>
        <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Management Portal Login</p>
      </div>

      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-md border border-neutral-800 p-8 rounded-2xl shadow-2xl">
        
        {/* Only 2 Tabs Displayed Now */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800/60 mb-6">
          <button
            type="button"
            onClick={() => { setLoginType('customer'); setError(''); }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${loginType === 'customer' ? 'bg-amber-500 text-neutral-950 shadow-md' : 'text-neutral-400 hover:text-neutral-200'}`}
          >
            <Users className="w-4 h-4" />
            Customer Portal
          </button>
          <button
            type="button"
            onClick={() => { setLoginType('staff'); setError(''); }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${loginType === 'staff' ? 'bg-amber-500 text-neutral-950 shadow-md' : 'text-neutral-400 hover:text-neutral-200'}`}
          >
            <User className="w-4 h-4" />
            Staff Member
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center field">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              {loginType === 'staff' ? 'Staff ID / Username' : 'Customer ID'}
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Password Key
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 text-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold rounded-xl hover:from-amber-400 transition-all shadow-lg mt-2"
          >
            LOGIN TO PORTAL →
          </button>
        </form>

      </div>
    </div>
  );
}