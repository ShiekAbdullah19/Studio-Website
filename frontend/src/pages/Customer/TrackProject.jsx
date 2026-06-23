import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, Calendar, User, Phone, DollarSign } from 'lucide-react';

export default function TrackProject() {
  const navigate = useNavigate();

  // Mock Project Data (English Content Only)
  const [projectDetails] = useState({
    workName: "Anand & Priya Marriage Function",
    workType: "Wedding Photography & Teaser Video",
    jobId: "MS-JOB-8942",
    queueNo: 3,
    jobsProcessStatus: "Editing In Progress", 
    currentlyOngoingProcess: "Color Grading & Audio Syncing",
    assignedEditor: "Santhosh Kumar",
    editorContactDetails: "+91 98765 43210",
    workTakenDate: "2026-06-15",
    estimatedDate: "2026-06-28",
    remainingDate: "5 Days Left",
    note: "Your teaser edits are looking extraordinary! Final rendering will be done after payment clearance.",
    amountDue: "₹15,000"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 font-sans p-4 md:p-8">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center border-b border-neutral-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide text-amber-500">
            MUHURTHAM STUDIOS
          </h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Live Project Tracking Portal</p>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-xs font-semibold rounded-xl transition-all"
        >
          Logout
        </button>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Status Banner */}
        <div className="bg-amber-500/10 border-b border-neutral-800 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Job ID: {projectDetails.jobId}</span>
            <h2 className="text-xl font-bold text-white mt-1">{projectDetails.workName}</h2>
            <p className="text-sm text-neutral-400 mt-0.5">{projectDetails.workType}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-950 rounded-xl border border-amber-500/30">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Queue No: #{projectDetails.queueNo}</span>
          </div>
        </div>

        {/* Project Technical Details Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Live Status */}
          <div className="space-y-6">
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/60">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Current Status</h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">{projectDetails.jobsProcessStatus}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Process: {projectDetails.currentlyOngoingProcess}</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/60 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Timeline</h3>
              <div className="flex items-center justify-between text-sm pt-2">
                <span className="text-neutral-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Booked Date:</span>
                <span className="font-semibold text-white">{projectDetails.workTakenDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" /> Estimated Delivery:</span>
                <span className="font-bold text-amber-400">{projectDetails.estimatedDate}</span>
              </div>
              <div className="border-t border-neutral-900 pt-2 flex justify-end">
                <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {projectDetails.remainingDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editor & Notes */}
          <div className="space-y-6">
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/60">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Assigned Editor Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white font-medium">
                  <User className="w-4 h-4 text-neutral-400" /> {projectDetails.assignedEditor}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Phone className="w-4 h-4 text-neutral-500" /> {projectDetails.editorContactDetails}
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/60">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Studio Note</h3>
              <p className="text-xs text-neutral-400 leading-relaxed italic">"{projectDetails.note}"</p>
            </div>
          </div>

        </div>

        {/* Pay Button Section */}
        <div className="bg-neutral-950 p-6 border-t border-neutral-800/80 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Pending Balance</p>
              <p className="text-2xl font-black text-emerald-400">{projectDetails.amountDue}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/customer/payment')}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/10 transform active:scale-[0.98] tracking-wider uppercase text-xs"
          >
            Proceed to Pay →
          </button>
        </div>

      </div>

    </div>
  );
}