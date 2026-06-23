import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Users, ClipboardCheck, LogOut, Camera, Calendar, Clock } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock Stats Data for Muhurtham Studios Overview
  const [stats] = useState({
    totalProjects: 24,
    activeJobs: 8,
    pendingDeliveries: 3,
    todayPresentStaff: 5
  });

  // Quick Tracking Overview of Jobs
  const [recentJobs] = useState([
    { id: "MS-JOB-8942", client: "Anand & Priya", type: "Wedding", staff: "Editor Team", status: "In Progress" },
    { id: "MS-JOB-9011", client: "Kiran Birthday", type: "Birthday Bash", staff: "Design Team", status: "Pending" }
  ]);

  // Secure Sign-Out Logic
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Destroys the admin session token
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Admin Header Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <Camera className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-widest uppercase">Studio Admin</h2>
              <p className="text-[10px] text-neutral-500">Console Control Node</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-amber-500 text-neutral-950 font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-lg shadow-amber-500/10"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
            <button 
              onClick={() => navigate('/admin/jobcards')}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-850 font-bold text-xs rounded-xl tracking-wider uppercase transition-all"
            >
              <ClipboardList className="w-4 h-4 text-amber-500" /> Job Cards
            </button>
            <button 
              onClick={() => navigate('/admin/staff')}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-850 font-bold text-xs rounded-xl tracking-wider uppercase transition-all"
            >
              <Users className="w-4 h-4 text-amber-500" /> Staff List
            </button>
            <button 
              onClick={() => navigate('/admin/attendance')}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-850 font-bold text-xs rounded-xl tracking-wider uppercase transition-all"
            >
              <ClipboardCheck className="w-4 h-4 text-amber-500" /> Attendance Log
            </button>
          </nav>
        </div>

        {/* Secure Exit Button Node */}
        <button 
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 text-xs font-bold rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout Panel
        </button>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Upper Dashboard header row */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-neutral-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">STUDIO OVERVIEW</h1>
            <p className="text-xs text-neutral-400 mt-1">Real-time analytical data grid control matrix</p>
          </div>
          <div className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-500" /> Live Date: 2026-06-23
          </div>
        </div>

        {/* Stats Grid Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-xl">
            <p className="text-xs text-neutral-400 font-bold tracking-wider uppercase">Total Projects</p>
            <h3 className="text-3xl font-black text-white mt-2 font-mono">{stats.totalProjects}</h3>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-xl border-l-2 border-l-amber-500">
            <p className="text-xs text-neutral-400 font-bold tracking-wider uppercase">Active Job Cards</p>
            <h3 className="text-3xl font-black text-amber-500 mt-2 font-mono">{stats.activeJobs}</h3>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-xl">
            <p className="text-xs text-neutral-400 font-bold tracking-wider uppercase">Pending Deliveries</p>
            <h3 className="text-3xl font-black text-white mt-2 font-mono">{stats.pendingDeliveries}</h3>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-xl border-l-2 border-l-emerald-500">
            <p className="text-xs text-neutral-400 font-bold tracking-wider uppercase">Active Staff (Today)</p>
            <h3 className="text-3xl font-black text-emerald-400 mt-2 font-mono">{stats.todayPresentStaff}</h3>
          </div>
        </div>

        {/* Recent Actions Tracker Panel Grid */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Live Project Tracking Stream
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-bold tracking-wider text-neutral-400 uppercase bg-neutral-950/40">
                  <th className="py-3 px-4">Job ID</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Work Node</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850 text-xs font-medium">
                {recentJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-neutral-950/30 transition-colors">
                    <td className="py-4 px-4 font-mono text-neutral-400">{job.id}</td>
                    <td className="py-4 px-4 text-white font-bold">{job.client}</td>
                    <td className="py-4 px-4 text-amber-500">{job.type}</td>
                    <td className="py-4 px-4 text-neutral-300">{job.staff}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${job.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-800 text-neutral-400'}`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}