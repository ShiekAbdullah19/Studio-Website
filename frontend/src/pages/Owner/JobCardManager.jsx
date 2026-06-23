import React, { useState } from 'react';
import { Briefcase, Plus, User, Calendar, Clock, CheckCircle, FileText, X, DollarSign } from 'lucide-react';

export default function JobCardManager() {
  // Existing initial job cards state
  const [jobCards, setJobCards] = useState([
    { id: 'JOB-001', clientName: 'Suresh Kumar', projectType: 'Wedding Photography', staffAssigned: 'Anand Rao', status: 'In Progress', deadline: '2026-07-15', budget: '45,000' },
    { id: 'JOB-002', clientName: 'Meena Wedding', projectType: 'Pre-Wedding Shoot', staffAssigned: 'Santhosh Kumar', status: 'Pending', deadline: '2026-06-30', budget: '25,000' }
  ]);

  // Modal Popup Toggle State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Form Input States
  const [formData, setFormData] = useState({
    clientName: '',
    projectType: 'Wedding Photography',
    staffAssigned: 'Anand Rao',
    deadline: '',
    budget: '',
    notes: ''
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit to append new entry
  const handleCreateJobCard = (e) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.deadline) {
      alert("Please fill in the Client Name and Deadline, bro!");
      return;
    }

    // Dynamic ID calculation (Handles formatting perfectly)
    const nextIdNumber = jobCards.length + 1;
    const formattedId = `JOB-${String(nextIdNumber).padStart(3, '0')}`;

    // Format budget with commas if it exists
    const formattedBudget = formData.budget 
      ? Number(formData.budget).toLocaleString('en-IN') 
      : 'N/A';

    const newJob = {
      id: formattedId,
      clientName: formData.clientName,
      projectType: formData.projectType,
      staffAssigned: formData.staffAssigned,
      status: 'Pending',
      deadline: formData.deadline,
      budget: formattedBudget
    };

    setJobCards([newJob, ...jobCards]); // Adds new card to the top
    setIsModalOpen(false); // Close Modal
    
    // Reset Form Input
    setFormData({
      clientName: '',
      projectType: 'Wedding Photography',
      staffAssigned: 'Anand Rao',
      deadline: '',
      budget: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 p-6 font-sans relative">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-neutral-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide flex items-center gap-3">
            <Briefcase className="text-amber-500 w-8 h-8" /> OWNER JOB CARD MANAGER
          </h1>
          <p className="text-sm text-neutral-400 mt-1">Create new studio tracking entries, assign specific jobs to field staff, and monitor live statuses.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-extrabold px-5 py-3 rounded-xl hover:from-amber-400 transition-all shadow-lg text-sm tracking-wider"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> CREATE NEW JOB CARD
        </button>
      </div>

      {/* Grid Dashboard Layout Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobCards.map((job) => (
          <div key={job.id} className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-2xl shadow-2xl hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full">
                  {job.id}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  job.status === 'In Progress' 
                    ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
                    : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                }`}>
                  <Clock className="w-3.5 h-3.5" /> {job.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 tracking-wide">{job.clientName}</h3>
              <p className="text-xs text-amber-500 uppercase tracking-widest font-mono font-bold mb-4">{job.projectType}</p>

              <div className="space-y-3 border-t border-neutral-800/60 pt-4 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-neutral-500" />
                  <span>Staff Assigned: <strong className="text-white font-medium">{job.staffAssigned}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-neutral-500" />
                  <span>Delivery Deadline: <span className="text-neutral-400 font-mono font-semibold">{job.deadline}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-neutral-500" />
                  <span>Project Budget: <span className="text-emerald-400 font-bold">₹{job.budget}</span></span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/40 flex gap-2">
              <button className="flex-1 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> VIEW DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PopUp Form Modal Overlay Box */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            
            {/* Modal Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg bg-neutral-950 border border-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-black text-white tracking-wide mb-2 flex items-center gap-2">
              <Plus className="text-amber-500 w-5 h-5" /> CREATE NEW STUDIO JOB CARD
            </h2>
            <p className="text-xs text-neutral-400 mb-6">Enter event specific details to assign workflow pipelines seamlessly.</p>

            <form onSubmit={handleCreateJobCard} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Client Full Name *</label>
                <input 
                  type="text" 
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="e.g., Rajesh Kumar Wedding" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" 
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Project Domain</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                    <option value="Teaser Editing">Teaser Editing</option>
                    <option value="Album Design">Album Design</option>
                    <option value="Outdoor Video Shoot">Outdoor Video Shoot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Assign Field Staff</label>
                  <select 
                    name="staffAssigned"
                    value={formData.staffAssigned}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Anand Rao">Anand Rao (Editor)</option>
                    <option value="Santhosh Kumar">Santhosh Kumar (Designer)</option>
                    <option value="Saravanan Team">Saravanan Team (Cameraman)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Target Deadline *</label>
                  <input 
                    type="date" 
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Deal Budget (₹)</label>
                  <input 
                    type="number" 
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., 50000" 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Work Instructions / Notes (Optional)</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Mention raw file paths, drive links or target theme frames..." 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-neutral-950 border border-neutral-800 hover:bg-neutral-850 text-neutral-400 hover:text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black rounded-xl text-xs hover:from-amber-400 transition-all shadow-lg uppercase tracking-wider"
                >
                  Deploy Job Card
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}