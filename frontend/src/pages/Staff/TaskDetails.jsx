import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, CloudLightning, RefreshCw } from 'lucide-react';

export default function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  // Dynamic state for matching workflow inputs
  const [taskData, setTaskData] = useState({
    jobId: taskId || "MS-JOB-8942",
    workName: "Anand & Priya Marriage Function",
    workType: "Wedding Photography & Teaser Video",
    jobsProcessStatus: "Editing In Progress",
    currentlyOngoingProcess: "Color Grading & Audio Syncing",
    note: "Teaser first draft is looking good. Working on final background audio track integration."
  });

  const [syncing, setSyncing] = useState(false);

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleCloudSync = (e) => {
    e.preventDefault();
    setSyncing(true);
    
    setTimeout(() => {
      setSyncing(false);
      alert("Data Saved in Backend Database with Cloud Sync Successfully!");
      navigate('/staff/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 font-sans p-4 md:p-8">
      
      {/* Navigation Top Bar */}
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
        <button
          onClick={() => navigate('/staff/dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-amber-500 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cards
        </button>
        <span className="text-xs font-mono text-neutral-500 bg-neutral-900 px-3 py-1 border border-neutral-850 rounded-lg">
          Workflow Node: Job Card Management
        </span>
      </div>

      {/* Main Form Block */}
      <div className="max-w-3xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="mb-6">
          <span className="text-[11px] font-mono text-amber-500 uppercase font-bold tracking-widest bg-amber-500/10 px-2.5 py-1 rounded">
            Active Job ID: {taskData.jobId}
          </span>
          <h2 className="text-2xl font-black text-white mt-3">{taskData.workName}</h2>
          <p className="text-xs text-neutral-400 mt-1">{taskData.workType}</p>
        </div>

        <form onSubmit={handleCloudSync} className="space-y-6">
          
          {/* Main Status Selection Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Jobs Process Status
            </label>
            <select
              name="jobsProcessStatus"
              value={taskData.jobsProcessStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm font-medium text-white transition-colors cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="Editing In Progress">Editing In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Detailed Ongoing Text Sub-process input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Currently Ongoing Process Detail
            </label>
            <input
              type="text"
              name="currentlyOngoingProcess"
              value={taskData.currentlyOngoingProcess}
              onChange={handleInputChange}
              required
              placeholder="e.g., Color Grading / Final Rendering / Selection"
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm text-white transition-colors"
            />
          </div>

          {/* Internal or External Notes field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Staff Editor Note (Visible to Customer)
            </label>
            <textarea
              name="note"
              rows="4"
              value={taskData.note}
              onChange={handleInputChange}
              required
              placeholder="Write update note regarding the project progress..."
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm text-white transition-colors resize-none leading-relaxed"
            ></textarea>
          </div>

          {/* Cloud Sync Database Action Buttons */}
          <div className="pt-4 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium">
              <CloudLightning className="w-4 h-4 text-amber-500" />
              <span>Saves data directly into centralized cloud storage</span>
            </div>
            
            <button
              type="submit"
              disabled={syncing}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {syncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Data with Cloud Sync
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}