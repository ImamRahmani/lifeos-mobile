import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Dumbbell, 
  Wallet, 
  CheckCircle2, 
  Circle,
  Home, 
  Plus, 
  Trash2, 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Edit3,
  Target,
  Zap,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  Filter,
  Save,
  ArrowLeft,
  Settings,
  Download,
  Upload,
  FileJson,
  RotateCcw
} from 'lucide-react';

// --- Utility Components ---

const Card = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 transition-all duration-300 hover:shadow-md ${className}`}
  >
    {children}
  </div>
);

const Button = ({ onClick, children, variant = "primary", className = "", size = "md", type="button" }) => {
  const baseStyle = "font-medium rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm";
  
  const variants = {
    primary: "bg-slate-800 text-white hover:bg-slate-700 shadow-slate-200",
    secondary: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
    accent: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200",
    success: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200",
    ghost: "bg-transparent text-slate-400 hover:text-slate-600 shadow-none"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

// --- Settings & Backup Modal ---
const SettingsModal = ({ onClose }) => {
  const fileInputRef = useRef(null);

  const handleBackup = () => {
    const data = {
      lifeos_gym: localStorage.getItem('lifeos_gym'),
      lifeos_cyber: localStorage.getItem('lifeos_cyber'),
      lifeos_finance: localStorage.getItem('lifeos_finance'),
      lifeos_tasks: localStorage.getItem('lifeos_tasks'),
      backup_date: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifeos_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestore = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        // Basic validation
        if (data.lifeos_gym) localStorage.setItem('lifeos_gym', data.lifeos_gym);
        if (data.lifeos_cyber) localStorage.setItem('lifeos_cyber', data.lifeos_cyber);
        if (data.lifeos_finance) localStorage.setItem('lifeos_finance', data.lifeos_finance);
        if (data.lifeos_tasks) localStorage.setItem('lifeos_tasks', data.lifeos_tasks);
        
        alert("Data berhasil dipulihkan! Aplikasi akan dimuat ulang.");
        window.location.reload();
      } catch (error) {
        alert("Gagal memulihkan data. File mungkin rusak atau format salah.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
      if(confirm("PERINGATAN: Ini akan menghapus SEMUA data aplikasi secara permanen. Anda yakin?")) {
          localStorage.clear();
          window.location.reload();
      }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={20}/>
        </button>
        
        <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
            <Settings size={20} className="text-slate-400"/> Pengaturan Data
        </h3>
        <p className="text-sm text-slate-500 mb-6">Amankan datamu secara berkala.</p>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
             <h4 className="font-bold text-indigo-700 text-sm mb-1 flex items-center gap-2"><Download size={14}/> Backup Data</h4>
             <p className="text-xs text-indigo-600/70 mb-3">Unduh semua data ke file JSON.</p>
             <Button onClick={handleBackup} variant="primary" className="w-full bg-indigo-600 hover:bg-indigo-500" size="sm">
                Download Backup
             </Button>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
             <h4 className="font-bold text-emerald-700 text-sm mb-1 flex items-center gap-2"><Upload size={14}/> Restore Data</h4>
             <p className="text-xs text-emerald-600/70 mb-3">Pulihkan data dari file backup JSON.</p>
             <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleRestore}
                accept=".json"
                className="hidden"
             />
             <Button onClick={() => fileInputRef.current.click()} variant="success" className="w-full" size="sm">
                Pilih File Backup
             </Button>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <button onClick={handleReset} className="w-full py-3 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Trash2 size={14}/> Reset Semua Data (Bahaya)
             </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- Sub-Modules ---

// 1. DASHBOARD
const Dashboard = ({ setActiveTab, stats, userName, requestNotification, setShowSettings }) => {
  const hours = new Date().getHours();
  const greeting = hours < 11 ? 'Selamat Pagi' : hours < 15 ? 'Selamat Siang' : hours < 19 ? 'Selamat Sore' : 'Selamat Malam';

  return (
    <div className="space-y-6 animate-fade-in pb-28">
      {/* Header Section */}
      <header className="flex justify-between items-start pt-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight font-display">{greeting}.</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
             Mode Fokus: Aktif
          </p>
        </div>
        <div className="flex gap-2">
            <button onClick={() => setShowSettings(true)} className="p-3 bg-white rounded-full shadow-sm border border-slate-100 text-slate-400 hover:text-slate-800 transition-colors">
                <Settings size={20} />
            </button>
            <button onClick={requestNotification} className="p-3 bg-white rounded-full shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-500 transition-colors">
                <Bell size={20} />
            </button>
        </div>
      </header>

      {/* Quote Card */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
            <p className="text-lg font-medium leading-relaxed font-serif italic opacity-90">"Jangan sibuk, tapi produktiflah."</p>
            <div className="mt-4 flex items-center gap-2 opacity-60 text-xs uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-white"></span>
                Daily Stoic
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col justify-between group hover:border-emerald-200 cursor-pointer" onClick={() => setActiveTab('utility')}>
          <div className="p-3 bg-emerald-50 w-fit rounded-2xl mb-3 text-emerald-600 group-hover:scale-110 transition-transform">
            <Wallet size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Keuangan</p>
            <p className="text-lg font-bold text-slate-800 truncate">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(stats.balance)}
            </p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between group hover:border-indigo-200 cursor-pointer" onClick={() => setActiveTab('cyber')}>
          <div className="p-3 bg-indigo-50 w-fit rounded-2xl mb-3 text-indigo-600 group-hover:scale-110 transition-transform">
            <Shield size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Cyber Streak</p>
            <div className="flex items-end gap-1.5">
              <p className="text-2xl font-bold text-slate-800 leading-none">{stats.streak}</p>
              <span className="text-xs text-slate-400 font-medium mb-0.5">Hari 🔥</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Focus */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-lg px-1">Agenda Penting</h3>
        
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer" onClick={() => setActiveTab('cyber')}>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                 <Zap size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700">Misi CyberSec</p>
                <p className="text-xs text-slate-500 truncate">{stats.todayCyberTask || "Belum ada misi"}</p>
              </div>
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300">
                  <ChevronDown size={16} className="-rotate-90" />
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer" onClick={() => setActiveTab('gym')}>
               <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                 <Dumbbell size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700">Jadwal Gym</p>
                <p className="text-xs text-slate-500 truncate">{stats.todayWorkout}</p>
              </div>
               <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300">
                  <ChevronDown size={16} className="-rotate-90" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// 2. CYBER PATH MODULE
const CyberModule = ({ updateStreak, setTodayTask }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('lifeos_cyber');
    return saved ? JSON.parse(saved) : {
      goal: "Certified Ethical Hacker (CEH)",
      streak: 0,
      lastStudyDate: null,
      progress: 0,
      dailyTasks: [
        { id: 1, text: "Baca berita CyberSec terbaru", completed: false },
        { id: 2, text: "Latihan 1 Box di HackTheBox", completed: false },
        { id: 3, text: "Review Networking Basics", completed: false }
      ]
    };
  });

  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState('');
  const [isAddingMission, setIsAddingMission] = useState(false);
  const [newMissionText, setNewMissionText] = useState('');

  useEffect(() => {
    localStorage.setItem('lifeos_cyber', JSON.stringify(data));
    updateStreak(data.streak);
    const task = data.dailyTasks.find(t => !t.completed);
    setTodayTask(task ? task.text : "Semua selesai! 🎉");
  }, [data, updateStreak, setTodayTask]);

  const toggleTask = (id) => {
    const newTasks = data.dailyTasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    
    const allCompleted = newTasks.every(t => t.completed);
    const today = new Date().toDateString();
    
    let newStreak = data.streak;
    let lastDate = data.lastStudyDate;

    if (allCompleted && newTasks.length > 0 && data.lastStudyDate !== today) {
       newStreak += 1;
       lastDate = today;
       if (Notification.permission === 'granted') {
         new Notification("Cyber Streak Naik! 🚀", { body: "Konsistensi adalah kunci. Teruskan!" });
       }
    }

    const completedCount = newTasks.filter(t => t.completed).length;
    const newProgress = newTasks.length > 0 ? (completedCount / newTasks.length) * 100 : 0;

    setData({
      ...data,
      dailyTasks: newTasks,
      streak: newStreak,
      lastStudyDate: lastDate,
      progress: newProgress
    });
  };

  const saveGoal = () => {
    if (tempGoal.trim()) {
      setData({ ...data, goal: tempGoal });
      setIsEditingGoal(false);
    }
  };

  const addMission = (e) => {
    e.preventDefault();
    if (newMissionText.trim()) {
       const newId = Date.now(); // Generate unique ID
       const newTasks = [...data.dailyTasks, { id: newId, text: newMissionText, completed: false }];
       // Recalculate progress immediately
       const completedCount = newTasks.filter(t => t.completed).length;
       const newProgress = (completedCount / newTasks.length) * 100;
       
       setData({
           ...data,
           dailyTasks: newTasks,
           progress: newProgress
       });
       setNewMissionText('');
       setIsAddingMission(false);
    }
  };

  const deleteMission = (id, e) => {
      e.stopPropagation(); // Mencegah toggle saat tombol hapus diklik
      const newTasks = data.dailyTasks.filter(t => t.id !== id);
      const completedCount = newTasks.filter(t => t.completed).length;
      const newProgress = newTasks.length > 0 ? (completedCount / newTasks.length) * 100 : 0;
      
      setData({
          ...data,
          dailyTasks: newTasks,
          progress: newProgress
      });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-28">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="text-indigo-500 fill-indigo-100" /> 
          Cyber Path
        </h2>
        {!isEditingGoal && (
            <button 
                onClick={() => { setTempGoal(data.goal); setIsEditingGoal(true); }} 
                className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-500 hover:text-indigo-600 font-medium"
            >
                Ubah Goal
            </button>
        )}
      </div>

      {isEditingGoal ? (
        <Card className="border-indigo-200 bg-indigo-50/50">
            <label className="text-xs font-bold text-indigo-700 uppercase mb-2 block">Set Goal Baru</label>
            <input 
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                className="w-full p-3 rounded-xl border border-indigo-200 text-slate-700 focus:outline-indigo-500 bg-white mb-3"
                placeholder="Contoh: OSCP Certified"
                autoFocus
            />
            <div className="flex gap-2">
                <Button onClick={saveGoal} variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-500">Simpan</Button>
                <Button onClick={() => setIsEditingGoal(false)} variant="secondary" size="sm">Batal</Button>
            </div>
        </Card>
      ) : (
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-900/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Current Objective</p>
                <h3 className="text-xl font-bold mb-6 leading-tight">{data.goal}</h3>
                
                <div className="flex items-end gap-4">
                    <div className="flex-1">
                        <div className="flex justify-between text-xs text-indigo-100 mb-2 font-medium">
                            <span>Progress Harian</span>
                            <span>{Math.round(data.progress)}%</span>
                        </div>
                        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-700 ease-out" style={{width: `${data.progress}%`}}></div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl text-center min-w-[60px] border border-white/10">
                        <p className="text-xl font-bold leading-none">{data.streak}</p>
                        <p className="text-[9px] text-indigo-100 mt-1 uppercase">Streak</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 px-1">Misi Harian</h3>
        
        {isAddingMission && (
            <form onSubmit={addMission} className="mb-4 bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm animate-slide-down">
                <input 
                    value={newMissionText}
                    onChange={(e) => setNewMissionText(e.target.value)}
                    placeholder="Misi baru (e.g. Belajar Linux 1 jam)"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-indigo-500 mb-3"
                    autoFocus
                />
                <div className="flex gap-2 justify-end">
                    <Button type="button" onClick={() => setIsAddingMission(false)} variant="ghost" size="sm">Batal</Button>
                    <Button type="submit" variant="accent" size="sm">Tambah</Button>
                </div>
            </form>
        )}

        <div className="space-y-3">
          {data.dailyTasks.length === 0 && !isAddingMission && (
              <p className="text-center text-slate-400 text-sm italic py-4">Belum ada misi hari ini.</p>
          )}
          
          {data.dailyTasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${task.completed ? 'bg-indigo-50/50 border-indigo-100' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${task.completed ? 'bg-indigo-500 border-indigo-500 scale-110' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                {task.completed && <CheckCircle2 size={14} className="text-white" />}
              </div>
              <span className={`flex-1 text-sm font-medium transition-colors ${task.completed ? 'text-indigo-400 line-through decoration-indigo-200' : 'text-slate-700'}`}>
                {task.text}
              </span>
              <button 
                onClick={(e) => deleteMission(task.id, e)}
                className="text-slate-300 hover:text-rose-500 p-2"
              >
                  <Trash2 size={16}/>
              </button>
            </div>
          ))}
        </div>
        
        {!isAddingMission && (
            <button 
                onClick={() => setIsAddingMission(true)}
                className="w-full py-4 mt-4 text-sm font-medium text-slate-400 border border-dashed border-slate-300 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2 group"
            >
                <Plus size={18} className="group-hover:text-indigo-500 transition-colors"/> Tambah Misi
            </button>
        )}
      </div>
    </div>
  );
};

// 3. GYM MODULE
const GymModule = () => {
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('lifeos_gym');
    return saved ? JSON.parse(saved) : {
      'Senin': { focus: 'Push (Dada/Tricep)', exercises: ['Bench Press 4x10', 'Tricep Dip 3x12'] },
      'Selasa': { focus: 'Pull (Punggung/Bicep)', exercises: ['Pull Up 4xMax', 'Bicep Curl 3x12'] },
      'Rabu': { focus: 'Rest / Cardio', exercises: ['Lari 30 Menit'] },
      'Kamis': { focus: 'Legs (Kaki)', exercises: ['Squat 4x8', 'Leg Press 3x12'] },
      'Jumat': { focus: 'Upper Body', exercises: ['Overhead Press 4x10', 'Lateral Raise 4x15'] },
      'Sabtu': { focus: 'Active Recovery', exercises: ['Yoga'] },
      'Minggu': { focus: 'Rest', exercises: [] },
    };
  });

  const todayName = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  const [selectedDay, setSelectedDay] = useState(todayName);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ focus: '', exercises: [] });
  const [newEx, setNewEx] = useState('');

  useEffect(() => {
    localStorage.setItem('lifeos_gym', JSON.stringify(schedule));
  }, [schedule]);

  const startEdit = () => {
    setEditData({ ...schedule[selectedDay] });
    setIsEditing(true);
  };

  const saveEdit = () => {
    setSchedule({ ...schedule, [selectedDay]: editData });
    setIsEditing(false);
  };

  const removeEx = (idx) => {
    const next = [...editData.exercises];
    next.splice(idx, 1);
    setEditData({ ...editData, exercises: next });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-28">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Dumbbell className="text-emerald-500 fill-emerald-100" /> 
          Gym & Fit
        </h2>
        {!isEditing && (
            <button onClick={startEdit} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-500 hover:text-emerald-600 font-medium flex items-center gap-1">
                <Edit3 size={14} /> Edit Jadwal
            </button>
        )}
      </div>

      {isEditing ? (
        <Card className="border-emerald-200 bg-emerald-50/30">
          <div className="space-y-4">
             <div>
                <label className="text-xs font-bold text-emerald-700 uppercase mb-1 block">Fokus Latihan</label>
                <input 
                    value={editData.focus} 
                    onChange={e => setEditData({...editData, focus: e.target.value})}
                    className="w-full p-3 rounded-xl border border-emerald-200 text-slate-700 focus:outline-emerald-500 bg-white"
                />
             </div>
             <div>
                <label className="text-xs font-bold text-emerald-700 uppercase mb-2 block">Daftar Gerakan</label>
                <div className="space-y-2">
                    {editData.exercises.map((ex, i) => (
                        <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-emerald-100 text-sm shadow-sm">
                            <span className="text-slate-600">{ex}</span> 
                            <button onClick={() => removeEx(i)} className="text-rose-400 hover:bg-rose-50 p-2 rounded"><Trash2 size={16}/></button>
                        </div>
                    ))}
                </div>
             </div>
             <div className="flex gap-2">
                <input 
                    value={newEx}
                    onChange={e => setNewEx(e.target.value)}
                    placeholder="Tambah gerakan..."
                    className="flex-1 p-3 rounded-xl border border-emerald-200 text-sm bg-white focus:outline-emerald-500"
                    onKeyDown={e => {
                        if(e.key === 'Enter' && newEx) {
                            setEditData({...editData, exercises: [...editData.exercises, newEx]});
                            setNewEx('');
                        }
                    }}
                />
                <Button size="md" variant="success" onClick={() => {
                     if(newEx) {
                        setEditData({...editData, exercises: [...editData.exercises, newEx]});
                        setNewEx('');
                    }
                }}><Plus size={20}/></Button>
             </div>
             <div className="flex gap-3 pt-2">
                 <Button onClick={saveEdit} variant="success" className="flex-1">Simpan</Button>
                 <Button onClick={() => setIsEditing(false)} variant="secondary" className="flex-1">Batal</Button>
             </div>
          </div>
        </Card>
      ) : (
        <Card className="bg-emerald-500 text-white shadow-emerald-200 shadow-xl border-none relative overflow-hidden min-h-[200px] flex flex-col justify-center">
            {/* Pattern */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
           
           <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">
                            {selectedDay === todayName ? 'Latihan Hari Ini' : `Jadwal ${selectedDay}`}
                        </p>
                        <h3 className="text-3xl font-bold">{schedule[selectedDay]?.focus || "Rest"}</h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                         <Calendar size={20} className="text-white"/>
                    </div>
               </div>
               
               <div className="bg-black/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                   <ul className="space-y-3">
                     {(schedule[selectedDay]?.exercises || []).map((ex, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 flex-shrink-0"></div>
                            {ex}
                        </li>
                     ))}
                     {(!schedule[selectedDay]?.exercises?.length) && <li className="text-emerald-100 italic text-sm">Tidak ada jadwal latihan. Istirahatlah.</li>}
                   </ul>
               </div>
           </div>
        </Card>
      )}

      {/* Day Selector */}
      <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 px-1">Pilih Hari</h4>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-1">
            {Object.keys(schedule).map(day => (
                <button
                    key={day}
                    onClick={() => { setSelectedDay(day); setIsEditing(false); }}
                    className={`px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedDay === day ? 'bg-slate-800 text-white shadow-lg shadow-slate-200 scale-105' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                >
                    {day.substring(0,3)}
                </button>
            ))}
          </div>
      </div>
    </div>
  );
};

// 4. UTILITY MODULE (Finance & Tasks) - UPGRADED
const UtilityModule = ({ updateBalance }) => {
  const [activeSub, setActiveSub] = useState('tasks');
  const [showHistory, setShowHistory] = useState(false);
  
  // Finance Logic
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('lifeos_finance') || '[]'));
  const [finForm, setFinForm] = useState({ amount: '', desc: '', type: 'expense' });
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  
  // Task Logic
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('lifeos_tasks') || '[]'));
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
      title: '',
      desc: '',
      deadline: '',
      priority: 'normal' 
  });
  const [expandedTask, setExpandedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('lifeos_finance', JSON.stringify(transactions));
    const bal = transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
    updateBalance(bal);
  }, [transactions, updateBalance]);

  useEffect(() => {
    localStorage.setItem('lifeos_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- Handlers ---

  const addTx = () => {
    if(!finForm.amount || !finForm.desc) return;
    const newTx = { 
        id: Date.now(), 
        ...finForm, 
        amount: parseFloat(finForm.amount), 
        date: new Date().toLocaleDateString('id-ID'), // Format: DD/MM/YYYY or similar based on locale
        rawDate: new Date().toISOString() // Simpan ISO string untuk sorting lebih akurat
    };
    setTransactions([newTx, ...transactions]);
    setFinForm({ ...finForm, amount: '', desc: '' });
  };

  const deleteTx = (id) => {
      setTransactions(transactions.filter(t => t.id !== id));
  }

  const addTask = () => {
    if(!taskForm.title) return;
    setTasks([{ 
        id: Date.now(), 
        ...taskForm,
        completed: false 
    }, ...tasks]);
    setTaskForm({ title: '', desc: '', deadline: '', priority: 'normal' });
    setShowTaskForm(false);
  };

  const deleteTask = (id) => {
      setTasks(tasks.filter(t => t.id !== id));
      if(expandedTask === id) setExpandedTask(null);
  }

  const getPriorityColor = (p) => {
      switch(p) {
          case 'high': return 'bg-rose-100 text-rose-600 border-rose-200';
          case 'low': return 'bg-blue-50 text-blue-600 border-blue-200';
          default: return 'bg-slate-100 text-slate-600 border-slate-200';
      }
  };

  // --- Finance Filtering Logic ---
  const filteredTransactions = transactions.filter(t => {
      const txDate = new Date(t.rawDate || Date.now()); // Fallback for old data
      // Jika data lama cuma punya string 'date' lokal, sorting mungkin tidak 100% akurat tanpa parsing manual.
      // Asumsi data baru menggunakan rawDate. Untuk data lama (jika ada), kita coba parsing sederhana.
      
      return txDate.getMonth() === filterMonth && txDate.getFullYear() === filterYear;
  }).sort((a,b) => new Date(b.rawDate) - new Date(a.rawDate)); // Sort by newest

  const monthlyIncome = filteredTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const monthlyExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in pb-28">
      {/* Tab Switcher */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 relative">
         <button onClick={() => setActiveSub('tasks')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeSub === 'tasks' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Tugas</button>
         <button onClick={() => setActiveSub('money')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeSub === 'money' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Keuangan</button>
      </div>

      {activeSub === 'tasks' ? (
        <div className="space-y-4">
           {!showTaskForm ? (
                <button 
                    onClick={() => setShowTaskForm(true)}
                    className="w-full py-4 rounded-2xl border border-dashed border-slate-300 text-slate-400 font-medium hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-500 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={20}/> Tambah Tugas Baru
                </button>
           ) : (
               <Card className="border-indigo-100 animate-slide-down">
                   <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-slate-700">Tugas Baru</h3>
                       <button onClick={() => setShowTaskForm(false)} className="text-slate-400 hover:text-rose-500"><X size={20}/></button>
                   </div>
                   <div className="space-y-3">
                       <input 
                            placeholder="Judul Tugas..." 
                            value={taskForm.title}
                            onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-500 text-slate-700 font-medium"
                       />
                       <textarea 
                            placeholder="Keterangan / Detail..." 
                            value={taskForm.desc}
                            onChange={e => setTaskForm({...taskForm, desc: e.target.value})}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-500 text-sm h-24 resize-none"
                       />
                       <div className="flex gap-2">
                           <div className="flex-1 space-y-1">
                               <label className="text-[10px] uppercase font-bold text-slate-400">Tenggat</label>
                               <input 
                                    type="date"
                                    value={taskForm.deadline}
                                    onChange={e => setTaskForm({...taskForm, deadline: e.target.value})}
                                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                               />
                           </div>
                           <div className="flex-1 space-y-1">
                               <label className="text-[10px] uppercase font-bold text-slate-400">Prioritas</label>
                               <select 
                                    value={taskForm.priority}
                                    onChange={e => setTaskForm({...taskForm, priority: e.target.value})}
                                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                               >
                                   <option value="low">Santai</option>
                                   <option value="normal">Normal</option>
                                   <option value="high">Penting!</option>
                               </select>
                           </div>
                       </div>
                       <Button onClick={addTask} className="w-full mt-2" variant="primary">Simpan Tugas</Button>
                   </div>
               </Card>
           )}

           <div className="space-y-3">
              {tasks.length === 0 && !showTaskForm && (
                  <div className="text-center py-10 opacity-50">
                      <Target size={40} className="mx-auto mb-2 text-slate-300"/>
                      <p className="text-sm text-slate-500">Tidak ada tugas aktif.</p>
                  </div>
              )}
              
              {tasks.map(t => {
                  const isExpanded = expandedTask === t.id;
                  const isOverdue = t.deadline && new Date(t.deadline) < new Date().setHours(0,0,0,0) && !t.completed;
                  
                  return (
                    <div 
                        key={t.id} 
                        className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${t.completed ? 'border-slate-100 opacity-60' : isOverdue ? 'border-rose-200 shadow-rose-50' : 'border-slate-100 shadow-sm hover:shadow-md'}`}
                    >
                        <div className="p-4 flex items-start gap-3 cursor-pointer" onClick={() => setExpandedTask(isExpanded ? null : t.id)}>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTasks(tasks.map(x => x.id === t.id ? {...x, completed: !x.completed} : x));
                                }}
                                className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${t.completed ? 'bg-slate-400 border-slate-400' : isOverdue ? 'border-rose-400 text-rose-400' : 'border-slate-300 text-transparent hover:border-indigo-400'}`}
                            >
                                {t.completed && <CheckCircle2 size={14} className="text-white"/>}
                                {!t.completed && isOverdue && <AlertCircle size={14} />}
                            </button>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className={`font-medium text-sm truncate pr-2 ${t.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{t.title}</p>
                                    <div className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wide ${getPriorityColor(t.priority)}`}>
                                        {t.priority}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 mt-1.5">
                                    {t.deadline && (
                                        <p className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                                            <Calendar size={12}/> 
                                            {new Date(t.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            {isOverdue && " (Lewat!)"}
                                        </p>
                                    )}
                                    {t.desc && (
                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                            <Edit3 size={12}/> Detail
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <button className="text-slate-300">
                                {isExpanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                            </button>
                        </div>

                        {/* Expanded Details - Using custom delete button instead of prompt */}
                        {isExpanded && (
                            <div className="px-4 pb-4 pt-0 pl-12">
                                {t.desc && (
                                    <div className="bg-slate-50 p-3 rounded-xl mb-3 text-sm text-slate-600 leading-relaxed border border-slate-100">
                                        {t.desc}
                                    </div>
                                )}
                                <div className="flex justify-end">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTask(t.id);
                                        }}
                                        className="text-xs text-white bg-rose-500 hover:bg-rose-600 flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-rose-200"
                                    >
                                        <Trash2 size={14}/> Hapus Tugas
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                  );
              })}
           </div>
        </div>
      ) : (
        /* FINANCE MODULE */
        <div className="space-y-4">
           {showHistory ? (
               /* VIEW: HISTORY & REPORT */
               <div className="animate-slide-down">
                   <div className="flex items-center gap-2 mb-4">
                       <button onClick={() => setShowHistory(false)} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800"><ArrowLeft size={20}/></button>
                       <h3 className="font-bold text-slate-700 text-lg">Laporan Bulanan</h3>
                   </div>
                   
                   {/* Month Filter */}
                   <Card className="mb-4 bg-slate-50 border-none p-3">
                       <div className="flex gap-2">
                           <select 
                                value={filterMonth} 
                                onChange={e => setFilterMonth(parseInt(e.target.value))}
                                className="flex-1 p-2 rounded-lg border border-slate-200 text-sm focus:outline-indigo-500"
                           >
                               {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((m, i) => (
                                   <option key={i} value={i}>{m}</option>
                               ))}
                           </select>
                           <select 
                                value={filterYear} 
                                onChange={e => setFilterYear(parseInt(e.target.value))}
                                className="w-24 p-2 rounded-lg border border-slate-200 text-sm focus:outline-indigo-500"
                           >
                               {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                           </select>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400">Pemasukan</p>
                                <p className="text-emerald-500 font-bold text-sm">
                                    + {new Intl.NumberFormat('id-ID').format(monthlyIncome)}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400">Pengeluaran</p>
                                <p className="text-rose-500 font-bold text-sm">
                                    - {new Intl.NumberFormat('id-ID').format(monthlyExpense)}
                                </p>
                            </div>
                       </div>
                   </Card>

                   {/* Transaction List */}
                   <div className="space-y-3">
                       {filteredTransactions.length === 0 ? (
                           <div className="text-center py-8 text-slate-400 text-sm">Tidak ada transaksi di bulan ini.</div>
                       ) : (
                           filteredTransactions.map(t => (
                              <div key={t.id} className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                  <div>
                                      <p className="text-sm font-bold text-slate-700">{t.desc}</p>
                                      <p className="text-[10px] text-slate-400">{t.date}</p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {t.type === 'income' ? '+' : '-'} {new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(t.amount)}
                                    </span>
                                    <button onClick={() => deleteTx(t.id)} className="text-slate-300 hover:text-rose-400"><Trash2 size={14}/></button>
                                  </div>
                              </div>
                           ))
                       )}
                   </div>
               </div>
           ) : (
               /* VIEW: INPUT & RECENT */
               <div className="animate-fade-in space-y-4">
                    <Card className="p-5 space-y-4 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30">
                        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                            <button onClick={() => setFinForm({...finForm, type: 'expense'})} className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${finForm.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Pengeluaran</button>
                            <button onClick={() => setFinForm({...finForm, type: 'income'})} className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${finForm.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Pemasukan</button>
                        </div>
                        
                        <div className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 font-bold pl-2">Rp</span>
                            <input 
                                type="number" 
                                placeholder="0" 
                                value={finForm.amount} 
                                onChange={e => setFinForm({...finForm, amount: e.target.value})} 
                                className="w-full text-2xl font-bold text-slate-800 border-b-2 border-slate-100 pb-2 pl-10 focus:outline-none focus:border-slate-800 bg-transparent placeholder:text-slate-300 transition-colors"
                            />
                        </div>
                        
                        <input 
                            type="text" 
                            placeholder="Keterangan transaksi..." 
                            value={finForm.desc} 
                            onChange={e => setFinForm({...finForm, desc: e.target.value})} 
                            className="w-full text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-200 focus:outline-indigo-500"
                        />
                        
                        <Button onClick={addTx} className="w-full" size="md" variant={finForm.type === 'income' ? 'success' : 'danger'}>
                            Simpan {finForm.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                        </Button>
                    </Card>

                    <div className="space-y-3">
                        <div className="flex justify-between items-end px-1">
                             <h4 className="text-xs font-bold text-slate-400 uppercase">Riwayat Terakhir</h4>
                             <button onClick={() => setShowHistory(true)} className="text-xs text-indigo-500 font-medium flex items-center gap-1 hover:underline">
                                 Lihat Laporan <Calendar size={12}/>
                             </button>
                        </div>
                        
                        {transactions.slice(0, 3).map(t => (
                            <div key={t.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                        {t.type === 'income' ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">{t.desc}</p>
                                        <p className="text-[10px] text-slate-400">{t.date}</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {t.type === 'income' ? '+' : '-'} {new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(t.amount)}
                                </span>
                            </div>
                        ))}
                    </div>
               </div>
           )}
        </div>
      )}
    </div>
  );
};

// --- MAIN APP ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState(0);
  const [streak, setStreak] = useState(0);
  const [todayCyberTask, setTodayCyberTask] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const requestNotification = () => {
    if (!("Notification" in window)) {
      // Fallback UI could be added here
      console.log("Notifikasi tidak didukung");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("LifeOS Siap!", { body: "Notifikasi diaktifkan." });
        }
      });
    }
  };

  const getTodayWorkout = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const today = days[new Date().getDay()];
    const saved = localStorage.getItem('lifeos_gym');
    const schedule = saved ? JSON.parse(saved) : {};
    return schedule[today]?.focus || "Rest Day";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100">
      <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col shadow-2xl overflow-hidden">
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {activeTab === 'home' && (
            <Dashboard 
                setActiveTab={setActiveTab} 
                stats={{ balance, streak, todayWorkout: getTodayWorkout(), todayCyberTask }}
                userName="Bos"
                requestNotification={requestNotification}
                setShowSettings={setShowSettings}
            />
          )}
          {activeTab === 'cyber' && <CyberModule updateStreak={setStreak} setTodayTask={setTodayCyberTask} />}
          {activeTab === 'gym' && <GymModule />}
          {activeTab === 'utility' && <UtilityModule updateBalance={setBalance} />}
        </main>

        {/* Settings Modal Overlay */}
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

        {/* Floating Dock Nav */}
        <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto pointer-events-none z-50">
            <nav className="bg-white/80 backdrop-blur-xl border border-white/20 p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-auto flex justify-between items-center relative">
                {['home', 'cyber', 'gym', 'utility'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)} 
                        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${activeTab === tab ? 'bg-slate-800 text-white shadow-lg shadow-slate-400/50 -translate-y-2' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    >
                        {tab === 'home' && <Home size={24} />}
                        {tab === 'cyber' && <Shield size={24} />}
                        {tab === 'gym' && <Dumbbell size={24} />}
                        {tab === 'utility' && <CheckCircle2 size={24} />}
                        
                        {/* Active Dot Indicator */}
                        {activeTab === tab && (
                            <span className="absolute -bottom-3 w-1 h-1 rounded-full bg-slate-800"></span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
      </div>
    </div>
  );
};

export default App;