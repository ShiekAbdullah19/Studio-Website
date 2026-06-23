import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, MapPin, CheckCircle, Clock, ListTodo, LogOut, Award, RefreshCw } from 'lucide-react';

export default function StaffDashboard() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loadingLocation, setLoadingLocation] = useState(false);
  
  // Camera States
  const [imgSrc, setImgSrc] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Mock Tasks
  const [assignedTasks] = useState([
    { id: "MS-JOB-8942", name: "Anand & Priya Marriage", type: "Teaser Editing", status: "In Progress", deadline: "2026-06-28" },
    { id: "MS-JOB-9011", name: "Kiran Birthday Bash", type: "Album Design", status: "Pending", deadline: "2026-07-02" }
  ]);

  // GPS Location Trigger Logic
  const handleGetLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4)
          });
          setLoadingLocation(false);
        },
        () => {
          alert("Unable to retrieve location. Please grant permission.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
    }
  };

  // Webcam Capture screenshot snap
  const captureSelfie = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setCameraActive(false);
    }
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    if (!imgSrc) {
      alert("Please activate your camera and take a selfie first!");
      return;
    }
    if (!location.lat || !location.lng) {
      alert("Please click 'Get GPS Coordinates' to map your workspace area!");
      return;
    }
    setAttendanceMarked(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 font-sans p-4 md:p-8">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center border-b border-neutral-800 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <Camera className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-wider">STAFF PORTAL</h1>
            <p className="text-xs text-neutral-400">Welcome Back, Editor Team</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 text-xs font-bold rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Attendance Node */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" /> Daily Attendance
            </h2>

            {!attendanceMarked ? (
              <form onSubmit={handleAttendanceSubmit} className="space-y-4">
                
                {/* Real Live Web Camera Block container */}
                <div className="relative border border-neutral-800 bg-neutral-950 rounded-xl overflow-hidden min-h-[220px] flex flex-col items-center justify-center p-2 text-center">
                  {cameraActive ? (
                    <div className="w-full h-full flex flex-col items-center">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-auto rounded-lg"
                        videoConstraints={{ width: 400, height: 400, facingMode: "user" }}
                      />
                      <button
                        type="button"
                        onClick={captureSelfie}
                        className="mt-3 px-4 py-1.5 bg-amber-500 text-neutral-950 text-xs font-bold rounded-lg uppercase tracking-wider"
                      >
                        Capture Snap
                      </button>
                    </div>
                  ) : imgSrc ? (
                    <div className="w-full text-center">
                      <img src={imgSrc} alt="Selfie Preview" className="mx-auto max-h-[160px] rounded-lg border border-neutral-800" />
                      <button
                        type="button"
                        onClick={() => setCameraActive(true)}
                        className="mt-3 flex items-center gap-1 mx-auto text-[11px] text-neutral-400 hover:text-amber-500 font-medium"
                      >
                        <RefreshCw className="w-3 h-3" /> Retake Selfie
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setCameraActive(true)}
                      className="w-full h-full p-6 cursor-pointer hover:bg-neutral-900/40 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                      <Camera className="w-8 h-8 text-neutral-500" />
                      <span className="text-xs text-neutral-400 font-medium">Click to Activate WebCam</span>
                    </div>
                  )}
                </div>

                {/* GPS trigger */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/60 space-y-3">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="w-full py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-bold text-amber-500 rounded-lg flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" /> {loadingLocation ? "Tracking GPS..." : "Get GPS Coordinates"}
                  </button>
                  
                  {location.lat && (
                    <div className="text-[11px] text-neutral-400 text-center font-mono bg-neutral-900 p-1.5 rounded border border-neutral-850">
                      Lat: {location.lat} | Lng: {location.lng}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xl hover:from-amber-400 transition-all shadow-lg"
                >
                  Submit Check-In
                </button>
              </form>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-emerald-400">Checked In Active</p>
                {imgSrc && (
                  <img src={imgSrc} alt="Verified Entry" className="mx-auto max-h-[100px] rounded border border-emerald-500/30 mt-2" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Job Cards Display Module */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-amber-500" /> Assigned Job Cards
            </h2>

            <div className="space-y-4">
              {assignedTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-neutral-950 border border-neutral-850 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700 transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-neutral-500 tracking-wider bg-neutral-900 px-2 py-0.5 border border-neutral-800 rounded">
                      {task.id}
                    </span>
                    <h3 className="text-base font-bold text-white pt-1">{task.name}</h3>
                    <p className="text-xs text-amber-500 font-medium">{task.type}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-neutral-900 pt-3 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${task.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-800 text-neutral-400'}`}>
                        <Clock className="w-3 h-3" /> {task.status}
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-1">Due: {task.deadline}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/staff/task/${task.id}`)}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-bold text-white rounded-xl transition-all"
                    >
                      Update Job Card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}