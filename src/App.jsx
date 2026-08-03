import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCg7JF2MVE76XmTe78YohYL528-myxmUcw",
  authDomain: "klsm-workplace-inspection-hub.firebaseapp.com",
  projectId: "klsm-workplace-inspection-hub",
  storageBucket: "klsm-workplace-inspection-hub.firebasestorage.app",
  messagingSenderId: "240176737595",
  appId: "1:240176737595:web:f8f03a7b2f94a6fe5f9b1e",
  measurementId: "G-HXXK9GH568"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const IconWrapper = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);
const ShieldAlert = (p) => <IconWrapper {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></IconWrapper>;
const LayoutDashboard = (p) => <IconWrapper {...p}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></IconWrapper>;
const ClipboardList = (p) => <IconWrapper {...p}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></IconWrapper>;
const Users = (p) => <IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconWrapper>;
const LogOut = (p) => <IconWrapper {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></IconWrapper>;
const Settings = (p) => <IconWrapper {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></IconWrapper>;
const Key = (p) => <IconWrapper {...p}><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></IconWrapper>;
const Camera = (p) => <IconWrapper {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconWrapper>;
const BarChart3 = (p) => <IconWrapper {...p}><path d="M3 3v18h18"/><rect width="4" height="7" x="7" y="10" rx="1"/><rect width="4" height="12" x="15" y="5" rx="1"/></IconWrapper>;
const UserPlus = (p) => <IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></IconWrapper>;
const Trash2 = (p) => <IconWrapper {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>;
const Plus = (p) => <IconWrapper {...p}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>;
const Activity = (p) => <IconWrapper {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></IconWrapper>;
const FileText = (p) => <IconWrapper {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></IconWrapper>;
const FileSpreadsheet = (p) => <IconWrapper {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></IconWrapper>;
const Eye = (p) => <IconWrapper {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></IconWrapper>;
const ArrowLeft = (p) => <IconWrapper {...p}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></IconWrapper>;
const Pencil = (p) => <IconWrapper {...p}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></IconWrapper>;
const AlertTriangle = (p) => <IconWrapper {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></IconWrapper>;
const Check = (p) => <IconWrapper {...p}><polyline points="20 6 9 17 4 12"/></IconWrapper>;
const Clock = (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconWrapper>;
const Flame = (p) => <IconWrapper {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></IconWrapper>;

const initialZones = [
  "Zone 1 – Laboratory, CPO Despatch, Oil Storage Tank & FFB Grading",
  "Zone 2 – Workshop",
  "Zone 3 – Boiler, Engine Room & RO Water Treatment",
  "Zone 4 – Biogas Plant (Digester, Scrubber, Flare, Gas Engine, ETP)",
  "Zone 5 – Production Area",
  "Zone 6 – Store & Diesel Skid Tank",
  "Zone 7 – Mill’s Clinic",
  "Zone 8 – Security",
  "Zone 9 – Office"
];

const initialUsers = [
  { id: 1, name: "John Doe", role: "Inspector", zones: ["Zone 1 – Laboratory, CPO Despatch, Oil Storage Tank & FFB Grading", "Zone 2 – Workshop"], freq: "2", password: "1234", offDays: ["Sunday"], timeWindows: [{ start: "08:00", end: "12:00" }, { start: "14:00", end: "17:00" }] },
  { id: 2, name: "Admin Jane", role: "Level 1 Admin", zones: ["All"], freq: "N/A", password: "1234", offDays: [], timeWindows: [{ start: "00:00", end: "23:59" }] },
  { id: 3, name: "Manager Bob", role: "Level 2 Admin", zones: ["All"], freq: "N/A", password: "1234", offDays: [], timeWindows: [{ start: "00:00", end: "23:59" }] }
];

const initialParameters = [
  { id: 1, name: "Management & Documented Information", subParams: [] },
  { id: 2, name: "Housekeeping", subParams: [] },
  { id: 3, name: "PPE", subParams: [] },
  { id: 4, name: "Machinery Safety", subParams: [] },
  { id: 5, name: "Electrical Safety", subParams: [] },
  { id: 6, name: "Chemical Safety", subParams: [] },
  { id: 7, name: "Fire Fighting & Emergency", subParams: [] },
  { id: 8, name: "Environment", subParams: [] }
];

const hydrantLocations = [
  "H.1 Office", "H.2 Supervisor Room", "H.3 Oil Room", "H.4 Kernel Plant", "H.5 Boiler Station",
  "H.6 Biogas Scrubber", "H.7 Digester Tank", "H.8 Digester Tank", "H.9 Digester Tank", "H.10 Gas Engine"
];

const hoseReelLocations = [
  "HR.1 Sterilizer", "HR.2 Supervisor Room", "HR.3 EFB Press", "HR.4 PCF Station", "HR.5 PCF Station",
  "HR.6 Kernel Plant Station", "HR.7 Kernel Plant Station", "HR.8 Boiler", "HR.9 Boiler", "HR.10 Engine Room",
  "HR.11 Oil Room", "HR.12 Oil Room", "HR.13 Engine Gas Plant", "HR.14 Engine Gas Plant",
  "HR.15 Kernel Silo (Top)", "HR.16 Kernel Silo (Top)"
];

const pumpRows = [
  "Bateri", "Tangki Diesel (Penuh)", "Minyak Enjin", "Air Radiator",
  "Panel Elektrik(Auto) *", "Injap Keluar & Masuk *", "Tolok Tekanan *",
  "Pam *", "Kebersihan *", "Motor Elektrik *", "Cut In/Cut Out *"
];

const yearOptions = [];
for (let i = 2000; i <= 2050; i++) yearOptions.push(i);

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.5));
      };
      img.onerror = () => resolve(null); 
      img.src = event.target.result; 
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [params, setParams] = useState(initialParameters);
  const [personnel, setPersonnel] = useState(initialUsers);
  const [inspections, setInspections] = useState([]);
  const [accidents, setAccidents] = useState([]);
  
  const [fireData, setFireData] = useState({ extinguishers: [], hydrants: {}, hoseReels: {}, pumps: {} });
  const [fireTab, setFireTab] = useState('extinguisher');

  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [toastMsg, setToastMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  const [editingItem, setEditingItem] = useState({ id: null, subId: null, text: '' });
  const [editingOffDaysId, setEditingOffDaysId] = useState(null);
  const [tempOffDays, setTempOffDays] = useState([]);

  // Time allocation states for multiple windows
  const [editingTimeId, setEditingTimeId] = useState(null);
  const [tempTimeWindows, setTempTimeWindows] = useState([]);
  const [newTimeWindows, setNewTimeWindows] = useState([{ start: '08:00', end: '17:00' }]);
  
  const [historyFilter, setHistoryFilter] = useState('All');

  // Real-time clock for strict locking
  const [currentTime, setCurrentTime] = useState(() => {
    const d = new Date();
    return d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0');
  });
  
  const [attachedPhotos, setAttachedPhotos] = useState({});
  const [photoPreview, setPhotoPreview] = useState({});

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    // Real-time clock updater every 10 seconds to auto-lock forms
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0'));
    }, 10000);

    const unsubParams = onSnapshot(doc(db, "settings", "parameters"), (docSnap) => {
      if (docSnap.exists()) setParams(docSnap.data().paramsList);
      else setDoc(doc(db, "settings", "parameters"), { paramsList: initialParameters });
    });

    const unsubPersonnel = onSnapshot(doc(db, "settings", "personnel"), (docSnap) => {
      if (docSnap.exists()) setPersonnel(docSnap.data().personnelList);
      else setDoc(doc(db, "settings", "personnel"), { personnelList: initialUsers });
    });

    const unsubInspections = onSnapshot(collection(db, "inspections"), (snap) => {
      setInspections(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubAccidents = onSnapshot(collection(db, "accidents"), (snap) => {
      setAccidents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubFire = onSnapshot(doc(db, "settings", "fireEquipment"), (docSnap) => {
      if (docSnap.exists()) setFireData(docSnap.data());
      else setDoc(doc(db, "settings", "fireEquipment"), { extinguishers: [], hydrants: {}, hoseReels: {}, pumps: {} });
    });

    return () => { clearInterval(timer); unsubParams(); unsubPersonnel(); unsubInspections(); unsubAccidents(); unsubFire(); };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const userId = parseInt(e.target.userSelect.value);
    const password = e.target.password.value;
    const user = personnel.find(u => u.id === userId);
    
    if (user && user.password === password) {
      setCurrentUser(user);
      setActiveTab('dashboard');
      showToast(`Welcome back, ${user.name}!`);
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const saveFireData = async () => {
    try {
      setIsSubmitting(true);
      await setDoc(doc(db, "settings", "fireEquipment"), fireData);
      showToast('✅ Fire equipment checklist saved!');
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error saving fire equipment: ", error);
      showToast('❌ Error saving checklist.');
      setIsSubmitting(false);
    }
  };

  const handleExtinguisherChange = (idx, field, value) => {
    const newExt = [...fireData.extinguishers];
    newExt[idx][field] = value;
    setFireData({ ...fireData, extinguishers: newExt });
  };

  const addExtinguisher = () => {
    setFireData({
      ...fireData,
      extinguishers: [...(fireData.extinguishers || []), { no: '', type: 'ABC', expiry: '', location: '', year: new Date().getFullYear() }]
    });
  };

  const removeExtinguisher = (idx) => {
    const newExt = fireData.extinguishers.filter((_, i) => i !== idx);
    setFireData({ ...fireData, extinguishers: newExt });
  };

  const handleHydrantChange = (loc, field, value) => {
    setFireData({
      ...fireData,
      hydrants: {
        ...fireData.hydrants,
        [loc]: { ...(fireData.hydrants[loc] || {}), [field]: value }
      }
    });
  };

  const handleHoseReelChange = (loc, field, value) => {
    setFireData({
      ...fireData,
      hoseReels: {
        ...fireData.hoseReels,
        [loc]: { ...(fireData.hoseReels[loc] || {}), [field]: value }
      }
    });
  };

  const handlePumpChange = (row, col, value) => {
    setFireData({
      ...fireData,
      pumps: {
        ...fireData.pumps,
        [row]: { ...(fireData.pumps[row] || {}), [col]: value }
      }
    });
  };

  const exportToExcel = () => {
    if (inspections.length === 0) { showToast("No data to export."); return; }
    const headers = "Date,Zone,Inspector,Remarks\n";
    const rows = inspections.map(i => `"${new Date(i.date).toLocaleString()}","${i.zone}","${i.inspectorName}","${(i.remarks||'').replace(/"/g, '""')}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'KLSM_Historical_Inspections.csv'; a.click();
    showToast("Excel downloaded!");
  };

  const exportAccidentsToExcel = () => {
    if (accidents.length === 0) { showToast("No accident data to export."); return; }
    const headers = "Reported Date,Date of Accident,Injured Person & MC,Property/Equipment Damage,Accident Details,Reported By\n";
    const rows = accidents.map(a => `"${new Date(a.reportedAt).toLocaleString()}","${new Date(a.accidentDate).toLocaleString().replace(',', '')}","${(a.injuredPerson||'').replace(/"/g, '""')}","${(a.damage||'').replace(/"/g, '""')}","${(a.details||'').replace(/"/g, '""')}","${a.reportedBy}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'KLSM_Accident_Reports.csv'; a.click();
    showToast("Accident Excel downloaded!");
  };

  const displayedZones = currentUser?.role.includes('Admin') ? initialZones : initialZones.filter(z => currentUser?.zones.includes(z));
  const currentYear = new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Data Logic Restructured for Graph Fixes
  const monthlyCounts = new Array(12).fill(0);
  const monthlyCompData = Array.from({length: 12}, () => ({ sum: 0, count: 0 }));

  inspections.forEach(insp => {
    const d = new Date(insp.date);
    if(d.getFullYear() === currentYear) {
      const month = d.getMonth();
      monthlyCounts[month]++;
      let memuaskan = 0; let totalScored = 0;
      Object.values(insp.results || {}).forEach(val => {
        if (val === "Memuaskan") { memuaskan++; totalScored++; }
        if (val === "Tidak Memuaskan") { totalScored++; }
      });
      if(totalScored > 0) {
        monthlyCompData[month].sum += (memuaskan / totalScored) * 100;
        monthlyCompData[month].count++;
      }
    }
  });

  // Ensure minimum scale logic to prevent single counts blowing up graph sizes
  const maxCount = Math.max(...monthlyCounts, 10); 
  const monthlyCompDataMap = monthlyCompData.map(d => ({
    avg: d.count > 0 ? Math.round(d.sum / d.count) : 0,
    hasData: d.count > 0
  }));

  const zonePerformanceData = initialZones.map(zone => {
    const zoneInspections = inspections.filter(i => i.zone === zone);
    if (zoneInspections.length === 0) return { avg: 0, hasData: false }; // Tracks true empties vs 0%
    let memuaskan = 0; let totalScored = 0;
    zoneInspections.forEach(insp => {
      Object.values(insp.results || {}).forEach(val => {
        if (val === "Memuaskan") { memuaskan++; totalScored++; }
        if (val === "Tidak Memuaskan") { totalScored++; }
      });
    });
    return { avg: totalScored > 0 ? Math.round((memuaskan / totalScored) * 100) : 0, hasData: true };
  });

  // Multi-window live time validation
  const userWindows = currentUser?.timeWindows || [{ start: currentUser?.timeStart || "00:00", end: currentUser?.timeEnd || "23:59" }];
  const isTimeValid = userWindows.some(w => (!w.start || !w.end) || (currentTime >= w.start && currentTime <= w.end));
  const isLevel1Admin = currentUser?.role === 'Level 1 Admin';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white font-bold px-6 py-4 rounded-xl shadow-2xl z-50 animate-bounce print:hidden border border-slate-700 flex items-center gap-2">
          {toastMsg}
        </div>
      )}

      {/* LOGIN SCREEN */}
      {activeTab === 'login' ? (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center w-full relative p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border-t-4 border-orange-600 relative z-10">
            <ShieldAlert className="mx-auto text-orange-600 mb-4" size={48} />
            <h1 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">KLSM HSE Hub</h1>
            <p className="text-sm text-slate-500 mb-6 font-medium">Authorized Personnel Only</p>
            
            {loginError && <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-lg font-semibold border border-red-200">{loginError}</div>}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select User</label>
                <select name="userSelect" className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none font-medium">
                  {personnel.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
                <input type="password" name="password" placeholder="Enter password" defaultValue="1234" className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none" required />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/30 transition-all">Secure Login</button>
            </form>
          </div>
          <div className="absolute bottom-6 text-center text-xs text-slate-500 font-medium">
             &copy; 2026 KLSMHSE <span className="mx-2 hidden md:inline">•</span><br className="md:hidden" /> Developed by ThadYap
          </div>
        </div>
      ) : (
        <>
          {}
          <aside className="w-full md:w-64 bg-slate-900 text-white p-4 md:p-6 flex flex-row md:flex-col justify-between md:justify-start border-r border-slate-800 shadow-xl z-10 overflow-x-auto md:overflow-visible sticky top-0 md:h-screen print:hidden">
            <div className="flex items-center gap-2 mb-0 md:mb-8 mr-6 md:mr-0 shrink-0">
              <ShieldAlert size={24} className="text-orange-500"/> 
              <h1 className="text-lg md:text-xl font-black text-orange-500 tracking-tight hidden md:block">KLSM HSE Hub</h1>
            </div>
            
            <nav className="flex flex-row md:flex-col space-y-0 md:space-y-2 space-x-2 md:space-x-0 flex-1 overflow-x-auto no-scrollbar items-center md:items-stretch">
              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center whitespace-nowrap gap-2 md:gap-3 px-4 md:px-3 py-2 md:py-3 rounded-xl font-semibold transition-colors ${activeTab === 'dashboard' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <LayoutDashboard size={20}/> <span className="text-sm md:text-base">Dashboard</span>
              </button>
              <button onClick={() => setActiveTab('accident-report')} className={`flex items-center whitespace-nowrap gap-2 md:gap-3 px-4 md:px-3 py-2 md:py-3 rounded-xl font-semibold transition-colors ${activeTab === 'accident-report' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <AlertTriangle size={20}/> <span className="text-sm md:text-base">Report Accident</span>
              </button>
              {currentUser?.role.includes('Admin') && (
                <button onClick={() => setActiveTab('admin-analytics')} className={`flex items-center whitespace-nowrap gap-2 md:gap-3 px-4 md:px-3 py-2 md:py-3 rounded-xl font-semibold transition-colors ${activeTab === 'admin-analytics' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                  <BarChart3 size={20}/> <span className="text-sm md:text-base">Analytics</span>
                </button>
              )}
              {currentUser?.role.includes('Admin') && (
                <button onClick={() => setActiveTab('fire-equipment')} className={`flex items-center whitespace-nowrap gap-2 md:gap-3 px-4 md:px-3 py-2 md:py-3 rounded-xl font-semibold transition-colors ${activeTab === 'fire-equipment' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                  <Flame size={20}/> <span className="text-sm md:text-base">Fire Fighting Eqp</span>
                </button>
              )}
              {currentUser?.role === 'Level 1 Admin' && (
                <button onClick={() => setActiveTab('admin-settings')} className={`flex items-center whitespace-nowrap gap-2 md:gap-3 px-4 md:px-3 py-2 md:py-3 rounded-xl font-semibold transition-colors ${activeTab === 'admin-settings' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                  <Settings size={20}/> <span className="text-sm md:text-base">Settings</span>
                </button>
              )}
            </nav>

            <div className="hidden md:block pt-4 border-t border-slate-800 mt-auto mb-4">
               <p className="text-xs text-slate-400 font-semibold mb-1">Logged in as:</p>
               <p className="text-sm font-bold text-white">{currentUser.name}</p>
            </div>
            <button onClick={() => {setCurrentUser(null); setActiveTab('login');}} className="flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 md:px-3 py-2 md:py-3 ml-2 md:ml-0 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl font-bold transition-colors shrink-0">
              <LogOut size={20}/> <span className="hidden md:inline">Sign Out</span>
            </button>
          </aside>

          {}
          <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 w-full print:p-0 print:bg-white">
            <div className="flex-1 p-4 md:p-8 print:p-0">
              
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-2">
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-slate-900">Your Assigned Zones</h2>
                      <div className="text-sm font-bold text-slate-500 mt-1.5 flex items-center gap-1.5">
                        <ClipboardList size={16} className="text-orange-500"/>
                        Target Daily Requirement: <span className="text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md border border-orange-200">{currentUser?.freq || 'N/A'}</span>
                      </div>
                    </div>
                    <div className={`text-sm font-bold flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-lg border ${isTimeValid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      <Clock size={16}/> Assigned Window: {userWindows.map((w,i) => <span key={i} className="bg-white/50 px-1 rounded">{w.start}-{w.end}</span>)}
                    </div>
                  </div>
                  
                  {displayedZones.length === 0 ? (
                     <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">You currently have no zones assigned to you.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {displayedZones.map((zone, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                          <h3 className="font-bold mb-6 text-slate-800 leading-snug text-sm md:text-base">{zone}</h3>
                          
                          {isTimeValid ? (
                            <button onClick={() => { setSelectedZone(zone); setActiveTab('inspection-form'); }} className="bg-slate-900 text-white w-full py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                              <ClipboardList size={18}/> Start Inspection
                            </button>
                          ) : (
                            <button disabled className="bg-slate-100 text-slate-400 border border-slate-200 w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                              <Clock size={18}/> Outside Time Window
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {}
              {/* ACCIDENT REPORT TAB */}
              {activeTab === 'accident-report' && (
                <div className="bg-white p-4 md:p-10 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto border-t-4 border-t-red-600">
                  <div className="border-b border-slate-200 pb-4 md:pb-6 mb-4 md:mb-6">
                     <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2"><AlertTriangle className="text-red-600"/> Report an Accident / Incident</h2>
                     <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Please fill out the following details as accurately as possible.</p>
                  </div>
                  <form onSubmit={handleAccidentSubmit} className="space-y-6">
                    <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="font-bold text-slate-800 block mb-2 text-sm md:text-base">1. Date & Time of Accident</label>
                      <input type="datetime-local" name="accidentDate" className="w-full p-3 border border-slate-300 rounded-lg font-medium text-slate-700 focus:ring-2 focus:ring-red-500 outline-none bg-white" required />
                    </div>
                    <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="font-bold text-slate-800 block mb-2 text-sm md:text-base">2. Injured Person Involved (if any)</label>
                      <p className="text-xs text-slate-500 mb-3">Please include name and days of MC if applicable.</p>
                      <input type="text" name="injuredPerson" placeholder="E.g. Ali Bin Abu - 3 Days MC" className="w-full p-3 border border-slate-300 rounded-lg font-medium text-slate-700 focus:ring-2 focus:ring-red-500 outline-none bg-white" />
                    </div>
                    <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="font-bold text-slate-800 block mb-2 text-sm md:text-base">3. Property or Equipment Damage (if any)</label>
                      <input type="text" name="damage" placeholder="E.g. Forklift front bumper dented" className="w-full p-3 border border-slate-300 rounded-lg font-medium text-slate-700 focus:ring-2 focus:ring-red-500 outline-none bg-white" />
                    </div>
                    <div className="p-4 md:p-5 bg-red-50 rounded-xl border border-red-200 mt-8">
                       <label className="font-black text-red-900 block mb-2 text-base md:text-lg">4. Accident Details</label>
                       <p className="text-xs text-red-700 mb-3 font-medium">Provide a full description of how the accident occurred.</p>
                       <textarea name="details" className="w-full p-3 md:p-4 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm bg-white" rows="5" placeholder="Describe the incident in detail..." required></textarea>
                    </div>
                    <div className="pt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
                       <button type="button" onClick={() => setActiveTab('dashboard')} className="w-full sm:w-1/3 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition-colors">Cancel</button>
                       <button type="submit" className="w-full sm:w-2/3 bg-red-600 text-white py-3 rounded-xl font-black text-base md:text-lg hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all">Submit Accident Report</button>
                    </div>
                  </form>
                </div>
              )}

              {}
              {/* ANALYTICS TAB */}
              {activeTab === 'admin-analytics' && (
                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                     <h2 className="text-xl md:text-2xl font-black text-slate-900">Analytics & History</h2>
                     <div className="flex flex-wrap gap-2">
                       <button onClick={exportToExcel} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"><FileSpreadsheet size={16}/> Export Inspections</button>
                       <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"><FileText size={16}/> Save PDF</button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 print:hidden">
                    
                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                       <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2"><BarChart3 className="text-orange-600"/> Monthly Inspections ({currentYear})</h3>
                       <div className="mt-8 ml-6 md:ml-8 relative">
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[1, 0.75, 0.5, 0.25, 0].map((ratio, i) => (
                               <div key={i} className="border-t border-slate-100 w-full h-0 relative">
                                  <span className="absolute -left-6 md:-left-8 -translate-y-1/2 text-[10px] text-slate-400 font-medium">{Math.round(maxCount * ratio)}</span>
                               </div>
                            ))}
                          </div>
                          <div className="flex items-end gap-1 md:gap-3 h-48 border-b border-slate-300 relative z-10 pb-0">
                            {monthlyCounts.map((count, idx) => (
                               <div key={idx} className="flex-1 flex flex-col items-center justify-end group relative h-full">
                                  <span className="text-xs font-bold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">{count}</span>
                                  <div className="w-full bg-orange-500 rounded-t-sm transition-all duration-300 group-hover:bg-orange-600" style={{ height: `${(count / maxCount) * 100}%`, minHeight: count > 0 ? '4px' : '0px' }}></div>
                               </div>
                            ))}
                          </div>
                          <div className="flex gap-1 md:gap-3 mt-2 relative z-10">
                            {months.map(m => <div key={m} className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-bold">{m}</div>)}
                          </div>
                       </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                       <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2"><Activity className="text-orange-600"/> Average Zone Compliance ({currentYear})</h3>
                       <div className="mt-8 ml-6 md:ml-8 relative">
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[100, 75, 50, 25, 0].map((val, i) => (
                               <div key={i} className="border-t border-slate-100 w-full h-0 relative">
                                  <span className="absolute -left-6 md:-left-8 -translate-y-1/2 text-[10px] text-slate-400 font-medium">{val}%</span>
                               </div>
                            ))}
                          </div>
                          <div className="flex items-end gap-1 md:gap-3 h-48 border-b border-slate-300 relative z-10 pb-0">
                            {monthlyCompDataMap.map((data, idx) => (
                               <div key={idx} className="flex-1 flex flex-col items-center justify-end group relative h-full">
                                  {data.hasData ? (
                                    <>
                                      <span className="text-xs font-bold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">{data.avg}%</span>
                                      <div className={`w-full rounded-t-sm transition-all duration-300 ${data.avg >= 90 ? 'bg-emerald-500 hover:bg-emerald-600' : (data.avg >= 70 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-500 hover:bg-red-600')}`} style={{ height: `${Math.max(data.avg, 2)}%` }}></div>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[10px] font-bold text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">N/A</span>
                                      <div className="w-full bg-slate-100 hover:bg-slate-200 rounded-t-sm transition-all duration-300" style={{ height: '2%' }}></div>
                                    </>
                                  )}
                               </div>
                            ))}
                          </div>
                          <div className="flex gap-1 md:gap-3 mt-2 relative z-10">
                            {months.map(m => <div key={m} className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-bold">{m}</div>)}
                          </div>
                       </div>
                    </div>
                    
                    {/* ZONE PERFORMANCE GRAPH */}
                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
                       <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2"><BarChart3 className="text-orange-600"/> Overall Compliance by Zone (All Time)</h3>
                       <div className="mt-8 ml-6 md:ml-8 relative">
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[100, 75, 50, 25, 0].map((val, i) => (
                               <div key={i} className="border-t border-slate-100 w-full h-0 relative">
                                  <span className="absolute -left-6 md:-left-8 -translate-y-1/2 text-[10px] text-slate-400 font-medium">{val}%</span>
                               </div>
                            ))}
                          </div>
                          <div className="flex items-end gap-1 md:gap-3 h-48 border-b border-slate-300 relative z-10 pb-0">
                            {zonePerformanceData.map((data, idx) => (
                               <div key={idx} className="flex-1 flex flex-col items-center justify-end group relative h-full">
                                  {data.hasData ? (
                                    <>
                                      <span className="text-xs font-bold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">{data.avg}%</span>
                                      <div className={`w-full rounded-t-sm transition-all duration-300 ${data.avg >= 90 ? 'bg-emerald-500 hover:bg-emerald-600' : (data.avg >= 70 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-500 hover:bg-red-600')}`} style={{ height: `${Math.max(data.avg, 2)}%` }}></div>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[10px] font-bold text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">N/A</span>
                                      <div className="w-full bg-slate-100 hover:bg-slate-200 rounded-t-sm transition-all duration-300" style={{ height: '2%' }}></div>
                                    </>
                                  )}
                               </div>
                            ))}
                          </div>
                          <div className="flex gap-1 md:gap-3 mt-2 relative z-10">
                            {initialZones.map((z, idx) => <div key={idx} className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-bold truncate px-1" title={z}>Z{idx+1}</div>)}
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  {/* ACCIDENTS TABLE */}
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-red-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:p-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                      <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2"><AlertTriangle className="text-red-600 print:text-black"/> Accident Records</h3>
                      <button onClick={exportAccidentsToExcel} className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors print:hidden"><FileSpreadsheet size={14}/> Export Accidents</button>
                    </div>
                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[800px]">
                        <thead className="bg-red-50 text-red-800 uppercase text-xs font-black print:bg-white print:text-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Date of Accident</th><th className="p-3 md:p-4">Reported By</th><th className="p-3 md:p-4">Injured Person & MC</th><th className="p-3 md:p-4">Property Damage</th><th className="p-3 md:p-4 rounded-tr-xl">Details</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                          {accidents.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-slate-500 italic">No accidents reported.</td></tr>}
                          {accidents.sort((a,b) => new Date(b.reportedAt) - new Date(a.reportedAt)).map(acc => (
                            <tr key={acc.id} className="hover:bg-slate-50/50">
                              <td className="p-3 md:p-4 font-bold text-slate-800">{new Date(acc.accidentDate).toLocaleString()}</td>
                              <td className="p-3 md:p-4 font-medium text-slate-600">{acc.reportedBy}</td>
                              <td className="p-3 md:p-4">{acc.injuredPerson}</td>
                              <td className="p-3 md:p-4 text-slate-600">{acc.damage}</td>
                              <td className="p-3 md:p-4 text-xs text-slate-500 max-w-xs truncate" title={acc.details}>{acc.details}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {}
                  {/* PERSONNEL DAILY PROGRESS */}
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:p-0">
                    <h3 className="font-bold text-base md:text-lg mb-4 text-slate-800 flex items-center gap-2"><BarChart3 className="text-orange-600 print:text-black"/> Personnel Daily Progress</h3>
                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black print:bg-white print:text-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Personnel</th><th className="p-3 md:p-4">Target Freq.</th><th className="p-3 md:p-4">Completed Today</th><th className="p-3 md:p-4 rounded-tr-xl">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                          {personnel.map(p => {
                            const target = parseInt(p.freq) || 0;
                            const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                            const isOffDay = p.offDays && p.offDays.includes(todayName);
                            const actualTarget = isOffDay ? 0 : target;
                            const today = new Date().toLocaleDateString();
                            const completedToday = inspections.filter(i => i.inspectorName === p.name && new Date(i.date).toLocaleDateString() === today).length;
                            
                            // Handling for Admin / No target cases
                            const hasNoTarget = target === 0 && !isOffDay;
                            const percentage = actualTarget > 0 ? Math.min((completedToday / actualTarget) * 100, 100) : (completedToday > 0 ? 100 : 0);
                            
                            return (
                              <tr key={p.id} className="hover:bg-slate-50/50">
                                <td className="p-3 md:p-4 font-bold text-slate-800">
                                  {p.name} <span className="text-xs text-slate-400 font-normal ml-1 hidden sm:inline">({p.role})</span>
                                </td>
                                <td className="p-3 md:p-4 font-medium">
                                  {isOffDay ? <span className="text-slate-400 italic">Off Day</span> : (hasNoTarget ? <span className="text-slate-400 italic">N/A</span> : `${p.freq} times`)}
                                </td>
                                <td className="p-3 md:p-4">
                                  {isOffDay ? <span className="text-slate-400 italic text-sm font-medium">No inspection required</span> : (
                                    <div className="flex items-center gap-2">
                                      <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px] print:hidden">
                                        <div className="bg-orange-500 h-2.5 rounded-full" style={{width: `${percentage}%`}}></div>
                                      </div>
                                      <span className="text-xs font-bold text-slate-500 print:text-black">
                                        {completedToday}{hasNoTarget ? '' : `/${target}`}
                                      </span>
                                    </div>
                                  )}
                                </td>
                                <td className="p-3 md:p-4">
                                  {isOffDay ? <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg">Off Day</span> : 
                                     (hasNoTarget ? 
                                       (completedToday > 0 ? <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">Active</span> : <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg">No Target</span>) : 
                                       (percentage >= 100 ? <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg">Complete</span> : <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg">In Progress</span>)
                                     )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {}
                  {/* ZONE COMPLIANCE PERFORMANCE */}
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:p-0">
                    <h3 className="font-bold text-base md:text-lg mb-4 text-slate-800 flex items-center gap-2"><Activity className="text-orange-600 print:text-black"/> Zone Compliance Performance</h3>
                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black print:bg-white print:text-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Zone</th><th className="p-3 md:p-4">Last Inspected</th><th className="p-3 md:p-4">Issues Found</th><th className="p-3 md:p-4">Compliance Rate</th><th className="p-3 md:p-4">Status</th><th className="p-3 md:p-4 rounded-tr-xl print:hidden">Action</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                          {initialZones.map((zone, idx) => {
                            const zoneInspections = inspections.filter(i => i.zone === zone).sort((a, b) => new Date(b.date) - new Date(a.date));
                            const latest = zoneInspections[0];
                            let compliance = 0; let issues = 0; let status = "N/A"; let lastInspected = "Never";
                            if (latest) {
                              lastInspected = new Date(latest.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
                              let memuaskan = 0; let totalScored = 0;
                              Object.values(latest.results || {}).forEach(val => {
                                if (val === "Memuaskan") { memuaskan++; totalScored++; }
                                if (val === "Tidak Memuaskan") { issues++; totalScored++; }
                              });
                              compliance = totalScored > 0 ? Math.round((memuaskan / totalScored) * 100) : 100;
                              status = compliance >= 90 ? 'Good' : (compliance >= 70 ? 'Warning' : 'Critical');
                            }
                            const statusColors = { 'Good': 'bg-emerald-100 text-emerald-700', 'Warning': 'bg-amber-100 text-amber-700', 'Critical': 'bg-red-100 text-red-700', 'N/A': 'bg-slate-100 text-slate-700' };
                            return (
                              <tr key={idx} className="hover:bg-slate-50/50">
                                <td className="p-3 md:p-4 font-bold text-slate-800 max-w-[200px] truncate print:whitespace-normal" title={zone}>{zone}</td>
                                <td className="p-3 md:p-4 text-slate-600 print:text-black">{lastInspected}</td>
                                <td className="p-3 md:p-4 font-medium">{issues > 0 ? <span className="text-red-600">{issues}</span> : <span className="text-slate-400">0</span>}</td>
                                <td className="p-3 md:p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px] print:hidden">
                                      <div className={`h-2.5 rounded-full ${compliance >= 90 ? 'bg-emerald-500' : (compliance >= 70 ? 'bg-amber-500' : (status === 'N/A' ? 'bg-transparent' : 'bg-red-500'))}`} style={{width: `${status === 'N/A' ? 0 : compliance}%`}}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 print:text-black">{status === 'N/A' ? '-' : `${compliance}%`}</span>
                                  </div>
                                </td>
                                <td className="p-3 md:p-4"><span className={`px-2 py-1 text-xs font-bold rounded-lg print:border print:border-black ${statusColors[status]}`}>{status}</span></td>
                                <td className="p-3 md:p-4 print:hidden">
                                  <button onClick={() => { setSelectedReport(latest); setActiveTab('view-report'); }} disabled={!latest} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${latest ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}><Eye size={14}/> View</button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ALL HISTORICAL RECORDS */}
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                      <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2"><ClipboardList className="text-orange-600"/> All Historical Records</h3>
                      <select 
                        value={historyFilter} 
                        onChange={(e) => setHistoryFilter(e.target.value)}
                        className="p-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 outline-none bg-slate-50 focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="All">All Zones</option>
                        {initialZones.map((z, idx) => <option key={idx} value={z}>{z}</option>)}
                      </select>
                    </div>
                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Date & Time</th><th className="p-3 md:p-4">Zone</th><th className="p-3 md:p-4">Inspector</th><th className="p-3 md:p-4 rounded-tr-xl">Action</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[...inspections]
                            .filter(insp => historyFilter === 'All' || insp.zone === historyFilter)
                            .sort((a,b) => new Date(b.date) - new Date(a.date))
                            .map(insp => (
                            <tr key={insp.id} className="hover:bg-slate-50/50">
                              <td className="p-3 md:p-4 font-medium text-slate-700">{new Date(insp.date).toLocaleString()}</td>
                              <td className="p-3 md:p-4 text-slate-800 font-bold">{insp.zone}</td>
                              <td className="p-3 md:p-4 text-slate-600">{insp.inspectorName}</td>
                              <td className="p-3 md:p-4"><button onClick={() => { setSelectedReport(insp); setActiveTab('view-report'); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-100 text-orange-700 hover:bg-orange-200"><Eye size={14}/> View</button></td>
                            </tr>
                          ))}
                          {inspections.filter(insp => historyFilter === 'All' || insp.zone === historyFilter).length === 0 && (
                            <tr><td colSpan="4" className="p-4 text-center text-slate-500 italic">No records found.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* FIRE FIGHTING EQUIPMENT TAB */}
              {activeTab === 'fire-equipment' && currentUser?.role.includes('Admin') && (
                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2"><Flame className="text-red-600"/> Fire Fighting Equipment Checklist</h2>
                    {isLevel1Admin && (
                       <button onClick={saveFireData} disabled={isSubmitting} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all">
                         {isSubmitting ? 'Saving...' : 'Save Checklist Data'}
                       </button>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:border-none print:shadow-none">
                     <div className="flex border-b border-slate-200 bg-slate-50 print:hidden">
                       <button onClick={() => setFireTab('extinguisher')} className={`flex-1 py-4 text-sm md:text-base font-bold transition-colors ${fireTab === 'extinguisher' ? 'bg-white text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:bg-slate-100'}`}>Portable Fire Extinguisher</button>
                       <button onClick={() => setFireTab('hose')} className={`flex-1 py-4 text-sm md:text-base font-bold transition-colors ${fireTab === 'hose' ? 'bg-white text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:bg-slate-100'}`}>Hose Reel, Hydrant & Pump</button>
                     </div>

                     <div className="p-4 md:p-6">
                       {fireTab === 'extinguisher' && (
                         <div>
                            <h3 className="font-bold text-lg mb-4 text-slate-800 border-b-2 border-slate-100 pb-2">Portable Fire Extinguisher Inventory</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm text-left border-collapse border border-slate-300">
                                <thead className="bg-slate-100 text-slate-700 font-black">
                                  <tr>
                                    <th className="p-3 border border-slate-300 w-16 text-center">No.</th>
                                    <th className="p-3 border border-slate-300">Jenis Pemadam Api (ABC/CO2)</th>
                                    <th className="p-3 border border-slate-300">Tarikh Luput</th>
                                    <th className="p-3 border border-slate-300">Lokasi</th>
                                    <th className="p-3 border border-slate-300">Tarikh Silinder Dibuat</th>
                                    {isLevel1Admin && <th className="p-3 border border-slate-300 w-16 text-center print:hidden">Action</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {(fireData.extinguishers || []).length === 0 && (
                                    <tr><td colSpan={isLevel1Admin ? 6 : 5} className="p-4 text-center text-slate-500 italic">No records found. Click 'Add Row' to create one.</td></tr>
                                  )}
                                  {(fireData.extinguishers || []).map((ext, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                      <td className="p-2 border border-slate-300 text-center">
                                        <input disabled={!isLevel1Admin} type="text" value={ext.no} onChange={e => handleExtinguisherChange(idx, 'no', e.target.value)} className="w-full p-1 border border-slate-200 rounded text-center disabled:bg-transparent disabled:border-transparent" />
                                      </td>
                                      <td className="p-2 border border-slate-300">
                                        <select disabled={!isLevel1Admin} value={ext.type} onChange={e => handleExtinguisherChange(idx, 'type', e.target.value)} className="w-full p-1 border border-slate-200 rounded disabled:bg-transparent disabled:border-transparent disabled:appearance-none">
                                          <option value="ABC">ABC</option>
                                          <option value="CO2">CO2</option>
                                        </select>
                                      </td>
                                      <td className="p-2 border border-slate-300">
                                        <input disabled={!isLevel1Admin} type="date" value={ext.expiry} onChange={e => handleExtinguisherChange(idx, 'expiry', e.target.value)} className="w-full p-1 border border-slate-200 rounded disabled:bg-transparent disabled:border-transparent" />
                                      </td>
                                      <td className="p-2 border border-slate-300">
                                        <input disabled={!isLevel1Admin} type="text" value={ext.location} onChange={e => handleExtinguisherChange(idx, 'location', e.target.value)} className="w-full p-1 border border-slate-200 rounded disabled:bg-transparent disabled:border-transparent" />
                                      </td>
                                      <td className="p-2 border border-slate-300">
                                        <select disabled={!isLevel1Admin} value={ext.year} onChange={e => handleExtinguisherChange(idx, 'year', e.target.value)} className="w-full p-1 border border-slate-200 rounded disabled:bg-transparent disabled:border-transparent disabled:appearance-none">
                                          {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                      </td>
                                      {isLevel1Admin && (
                                        <td className="p-2 border border-slate-300 text-center print:hidden">
                                          <button onClick={() => removeExtinguisher(idx)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {isLevel1Admin && (
                              <button onClick={addExtinguisher} className="mt-4 flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg text-sm font-bold transition-colors print:hidden">
                                <Plus size={16}/> Add Row
                              </button>
                            )}
                         </div>
                       )}

                       {fireTab === 'hose' && (
                         <div className="space-y-10">
                            {/* Table 1: Fire Hydrant */}
                            <div>
                               <h3 className="font-bold text-lg mb-4 text-slate-800 border-b-2 border-slate-100 pb-2">Table 1: Fire Hydrant</h3>
                               <div className="overflow-x-auto">
                                 <table className="w-full text-sm text-left border-collapse border border-slate-300">
                                   <thead className="bg-slate-100 text-slate-700 font-black">
                                     <tr>
                                       <th className="p-3 border border-slate-300 w-48">Location</th>
                                       {["Fire Canvas Hose", "Coupling", "Nozzle", "Fire Hydrant Box", "Valve"].map(h => <th key={h} className="p-3 border border-slate-300 text-center">{h}</th>)}
                                     </tr>
                                   </thead>
                                   <tbody>
                                     {hydrantLocations.map(loc => (
                                       <tr key={loc} className="hover:bg-slate-50/50">
                                         <td className="p-3 border border-slate-300 font-bold text-slate-800">{loc}</td>
                                         {["hose", "coupling", "nozzle", "box", "valve"].map(field => (
                                            <td key={field} className="p-2 border border-slate-300">
                                              <select disabled={!isLevel1Admin} value={fireData.hydrants?.[loc]?.[field] || ''} onChange={(e) => handleHydrantChange(loc, field, e.target.value)} className="w-full p-1 border border-slate-200 rounded text-xs disabled:bg-transparent disabled:border-transparent disabled:appearance-none font-semibold">
                                                <option value="" disabled>Select...</option>
                                                <option value="Memuaskan">Memuaskan</option>
                                                <option value="Tidak Memuaskan">Tidak Memuaskan</option>
                                                <option value="N/A">N/A</option>
                                              </select>
                                            </td>
                                         ))}
                                       </tr>
                                     ))}
                                   </tbody>
                                 </table>
                               </div>
                            </div>

                            {/* Table 2: Hose Reel */}
                            <div>
                               <h3 className="font-bold text-lg mb-4 text-slate-800 border-b-2 border-slate-100 pb-2">Table 2: Hose Reel</h3>
                               <div className="overflow-x-auto">
                                 <table className="w-full text-sm text-left border-collapse border border-slate-300">
                                   <thead className="bg-slate-100 text-slate-700 font-black">
                                     <tr>
                                       <th className="p-3 border border-slate-300 w-48">Location</th>
                                       <th className="p-3 border border-slate-300 w-48 text-center">Keadaan Hose Reel</th>
                                       <th className="p-3 border border-slate-300">Catatan</th>
                                     </tr>
                                   </thead>
                                   <tbody>
                                     {hoseReelLocations.map(loc => (
                                       <tr key={loc} className="hover:bg-slate-50/50">
                                         <td className="p-3 border border-slate-300 font-bold text-slate-800">{loc}</td>
                                         <td className="p-2 border border-slate-300">
                                            <select disabled={!isLevel1Admin} value={fireData.hoseReels?.[loc]?.condition || ''} onChange={(e) => handleHoseReelChange(loc, 'condition', e.target.value)} className="w-full p-1 border border-slate-200 rounded text-xs disabled:bg-transparent disabled:border-transparent disabled:appearance-none font-semibold">
                                                <option value="" disabled>Select...</option>
                                                <option value="Memuaskan">Memuaskan</option>
                                                <option value="Tidak Memuaskan">Tidak Memuaskan</option>
                                                <option value="N/A">N/A</option>
                                            </select>
                                         </td>
                                         <td className="p-2 border border-slate-300">
                                            <input disabled={!isLevel1Admin} type="text" value={fireData.hoseReels?.[loc]?.remark || ''} onChange={(e) => handleHoseReelChange(loc, 'remark', e.target.value)} className="w-full p-1 border border-slate-200 rounded text-xs disabled:bg-transparent disabled:border-transparent" placeholder="Remarks..." />
                                         </td>
                                       </tr>
                                     ))}
                                   </tbody>
                                 </table>
                               </div>
                            </div>

                            {/* Table 3: Fire Fighting Pump */}
                            <div>
                               <h3 className="font-bold text-lg mb-4 text-slate-800 border-b-2 border-slate-100 pb-2">Table 3: Fire Fighting Pump</h3>
                               <div className="overflow-x-auto">
                                 <table className="w-full text-sm text-left border-collapse border border-slate-300">
                                   <thead className="bg-slate-100 text-slate-700 font-black">
                                     <tr>
                                       <th className="p-3 border border-slate-300 w-48">Tempat</th>
                                       <th className="p-3 border border-slate-300 text-center">Diesel Engine Pump</th>
                                       <th className="p-3 border border-slate-300 text-center">Electric Motor Pump</th>
                                       <th className="p-3 border border-slate-300 text-center">Electric Jockey Pump</th>
                                     </tr>
                                   </thead>
                                   <tbody>
                                     {pumpRows.map(row => {
                                        // Specific blackout conditions based on prompt
                                        const isDieselBlackedOut = ["Panel Elektrik(Auto) *", "Injap Keluar & Masuk *", "Tolok Tekanan *", "Pam *", "Kebersihan *", "Motor Elektrik *"].includes(row);
                                        const isElectricBlackedOut = ["Bateri", "Tangki Diesel (Penuh)", "Minyak Enjin", "Air Radiator"].includes(row);
                                        
                                        return (
                                           <tr key={row} className="hover:bg-slate-50/50">
                                             <td className="p-3 border border-slate-300 font-bold text-slate-800">{row}</td>
                                             <td className={`p-2 border border-slate-300 ${isDieselBlackedOut ? 'bg-slate-800' : ''}`}>
                                                {!isDieselBlackedOut && (
                                                   <input disabled={!isLevel1Admin} type="text" value={fireData.pumps?.[row]?.diesel || ''} onChange={(e) => handlePumpChange(row, 'diesel', e.target.value)} className="w-full p-1.5 border border-slate-200 rounded text-xs font-semibold text-center disabled:bg-transparent disabled:border-transparent" />
                                                )}
                                             </td>
                                             <td className={`p-2 border border-slate-300 ${isElectricBlackedOut ? 'bg-slate-800' : ''}`}>
                                                {!isElectricBlackedOut && (
                                                   <input disabled={!isLevel1Admin} type="text" value={fireData.pumps?.[row]?.electric || ''} onChange={(e) => handlePumpChange(row, 'electric', e.target.value)} className="w-full p-1.5 border border-slate-200 rounded text-xs font-semibold text-center disabled:bg-transparent disabled:border-transparent" />
                                                )}
                                             </td>
                                             <td className={`p-2 border border-slate-300 ${isElectricBlackedOut ? 'bg-slate-800' : ''}`}>
                                                {!isElectricBlackedOut && (
                                                   <input disabled={!isLevel1Admin} type="text" value={fireData.pumps?.[row]?.jockey || ''} onChange={(e) => handlePumpChange(row, 'jockey', e.target.value)} className="w-full p-1.5 border border-slate-200 rounded text-xs font-semibold text-center disabled:bg-transparent disabled:border-transparent" />
                                                )}
                                             </td>
                                           </tr>
                                        )
                                     })}
                                   </tbody>
                                 </table>
                               </div>
                            </div>
                         </div>
                       )}
                     </div>
                  </div>
                </div>
              )}

              {/* INDIVIDUAL REPORT VIEW */}
              {activeTab === 'view-report' && selectedReport && (
                <div className="max-w-4xl mx-auto bg-white p-4 md:p-10 rounded-2xl shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 mb-6 print:border-b-2 print:border-black">
                    <div>
                      <button onClick={() => setActiveTab('admin-analytics')} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 mb-4 print:hidden transition-colors"><ArrowLeft size={16}/> Back to Analytics</button>
                      <h2 className="text-2xl font-black text-slate-900">Inspection Report</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                        <p className="text-sm"><span className="font-bold text-slate-500 print:text-black">Zone:</span> <span className="font-bold text-slate-800 print:text-black">{selectedReport.zone}</span></p>
                        <p className="text-sm"><span className="font-bold text-slate-500 print:text-black">Inspector:</span> <span className="font-bold text-slate-800 print:text-black">{selectedReport.inspectorName}</span></p>
                        <p className="text-sm"><span className="font-bold text-slate-500 print:text-black">Date:</span> <span className="font-bold text-slate-800 print:text-black">{new Date(selectedReport.date).toLocaleString()}</span></p>
                      </div>
                    </div>
                    <button onClick={() => window.print()} className="mt-4 sm:mt-0 flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors print:hidden"><FileText size={16}/> Save PDF</button>
                  </div>

                  <div className="space-y-6">
                    <table className="w-full text-sm text-left border border-slate-200 print:border-black">
                      <thead className="bg-slate-50 print:bg-white print:border-b-2 print:border-black">
                        <tr><th className="p-3 md:p-4 font-black text-slate-700 print:text-black">Checklist Item</th><th className="p-3 md:p-4 font-black text-slate-700 print:text-black w-48">Result</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 print:divide-black">
                        {Object.entries(selectedReport.results || {}).map(([item, result], idx) => {
                          let resColor = "text-slate-600";
                          if (result === "Memuaskan") resColor = "text-emerald-600";
                          if (result === "Tidak Memuaskan") resColor = "text-red-600";
                          const photoData = selectedReport.photos && selectedReport.photos[item];

                          return (
                            <tr key={idx} className="print:break-inside-avoid">
                              <td className="p-3 md:p-4 text-slate-800 font-medium print:text-black">
                                {item}
                                {photoData && (
                                  <div className="mt-3 mb-1">
                                    <img src={photoData} alt="Attached Evidence" className="max-w-[200px] h-auto rounded-lg border border-slate-300 shadow-sm print:max-w-[150px] print:border-black" />
                                  </div>
                                )}
                              </td>
                              <td className={`p-3 md:p-4 font-bold ${resColor} print:text-black align-top`}>{result}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200 print:bg-white print:border print:border-black print:break-inside-avoid">
                       <label className="font-black text-slate-900 block mb-2 text-base md:text-lg print:text-black">Remarks / Corrective Actions</label>
                       <p className="text-sm text-slate-800 whitespace-pre-wrap print:text-black">{selectedReport.remarks}</p>
                    </div>
                  </div>
                </div>
              )}

              {}
              {/* SETTINGS TAB */}
              {activeTab === 'admin-settings' && currentUser?.role === 'Level 1 Admin' && (
                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">System Settings</h2>
                  
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <h3 className="font-bold text-base md:text-lg mb-6 flex items-center gap-2 text-slate-800"><Users className="text-orange-600"/> Personnel Management</h3>
                    
                    <div className="bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-200 mb-8">
                      <h4 className="font-bold text-sm mb-4 text-slate-700 uppercase">Register New Personnel</h4>
                      <form onSubmit={addPersonnel} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div><label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label><input name="name" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm" required /></div>
                          <div><label className="block text-xs font-bold text-slate-500 mb-1">Role</label><select name="role" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm"><option>Inspector</option><option>Level 1 Admin</option><option>Level 2 Admin</option></select></div>
                          <div><label className="block text-xs font-bold text-slate-500 mb-1">Daily Frequency</label><input name="freq" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm" required /></div>
                          <div><label className="block text-xs font-bold text-slate-500 mb-1">Initial Password</label><input name="password" type="text" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm" required /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2">Assign Zones (Ignored for Admins)</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-4 rounded-lg border border-slate-200 h-48 overflow-y-auto">
                               {initialZones.map((z, idx) => (<label key={idx} className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer"><input type="checkbox" name="zone" value={z} className="mt-1 text-orange-600 focus:ring-orange-500 rounded" /><span className="leading-tight">{z}</span></label>))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 mb-2">Select Off Days</label>
                              <div className="grid grid-cols-2 gap-2 bg-white p-4 rounded-lg border border-slate-200">
                                 {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, idx) => (<label key={idx} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"><input type="checkbox" name="offDays" value={day} className="text-orange-600 focus:ring-orange-500 rounded" /><span className="leading-tight">{day}</span></label>))}
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                              <label className="block text-xs font-bold text-slate-500 mb-2">Inspection Time Windows</label>
                              <div className="flex flex-col gap-2">
                                {newTimeWindows.map((tw, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <input type="time" value={tw.start} onChange={(e) => { const nw = [...newTimeWindows]; nw[idx].start = e.target.value; setNewTimeWindows(nw); }} className="border border-slate-300 p-2 rounded-lg text-sm w-full" />
                                    <span className="text-slate-500 text-sm font-bold">to</span>
                                    <input type="time" value={tw.end} onChange={(e) => { const nw = [...newTimeWindows]; nw[idx].end = e.target.value; setNewTimeWindows(nw); }} className="border border-slate-300 p-2 rounded-lg text-sm w-full" />
                                    {idx > 0 && <button type="button" onClick={() => setNewTimeWindows(newTimeWindows.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>}
                                  </div>
                                ))}
                                <button type="button" onClick={() => setNewTimeWindows([...newTimeWindows, {start: "08:00", end: "17:00"}])} className="text-xs text-orange-600 font-bold flex items-center gap-1 mt-1 w-max"><Plus size={14}/> Add Time Window</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600"><UserPlus size={16}/> Add Personnel</button>
                      </form>
                    </div>

                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Name</th><th className="p-3 md:p-4">Role</th><th className="p-3 md:p-4">Assigned Zones</th><th className="p-3 md:p-4">Off Days</th><th className="p-3 md:p-4 min-w-[180px]">Time Windows</th><th className="p-3 md:p-4 rounded-tr-xl text-right">Actions</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {personnel.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="p-3 md:p-4 font-bold text-slate-800">{p.name}</td>
                            <td className="p-3 md:p-4"><span className={`px-2 py-1 rounded-lg text-xs font-bold ${p.role.includes('Admin') ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>{p.role}</span></td>
                            <td className="p-3 md:p-4 text-xs text-slate-600 max-w-[150px] truncate">{p.zones.join(', ')}</td>
                            
                            <td className="p-3 md:p-4 text-xs text-slate-600 font-medium">
                              {editingOffDaysId === p.id ? (
                                 <div className="flex flex-col gap-2 min-w-[200px]">
                                   <div className="flex flex-wrap gap-2 bg-white p-2 border border-slate-200 rounded-lg shadow-inner">
                                     {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, idx) => (
                                       <label key={idx} className="flex items-center gap-1 cursor-pointer">
                                         <input type="checkbox" checked={tempOffDays.includes(day)} onChange={(e) => { e.target.checked ? setTempOffDays([...tempOffDays, day]) : setTempOffDays(tempOffDays.filter(d => d !== day)); }} className="text-orange-600 rounded" />
                                         <span className="leading-tight">{day.substring(0,3)}</span>
                                       </label>
                                     ))}
                                   </div>
                                   <div className="flex gap-2">
                                     <button onClick={() => saveOffDays(p.id)} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-700">Save</button>
                                     <button onClick={() => setEditingOffDaysId(null)} className="bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg font-bold hover:bg-slate-400">Cancel</button>
                                   </div>
                                 </div>
                              ) : (
                                 <div className="flex items-center gap-2"><span className="flex-1">{(p.offDays || []).join(', ') || 'None'}</span><button onClick={() => { setEditingOffDaysId(p.id); setTempOffDays(p.offDays || []); }} className="p-1.5 text-slate-400 hover:text-orange-600 rounded-md"><Pencil size={14}/></button></div>
                              )}
                            </td>

                            <td className="p-3 md:p-4 text-xs text-slate-600 font-medium">
                              {editingTimeId === p.id ? (
                                 <div className="flex flex-col gap-2">
                                   <div className="flex flex-col gap-1 bg-white p-2 border border-slate-200 rounded-lg max-h-32 overflow-y-auto">
                                     {tempTimeWindows.map((tw, idx) => (
                                       <div key={idx} className="flex items-center gap-1">
                                         <input type="time" value={tw.start} onChange={e => { const nw = [...tempTimeWindows]; nw[idx].start = e.target.value; setTempTimeWindows(nw); }} className="border border-slate-300 p-1 rounded w-full" />
                                         <span>-</span>
                                         <input type="time" value={tw.end} onChange={e => { const nw = [...tempTimeWindows]; nw[idx].end = e.target.value; setTempTimeWindows(nw); }} className="border border-slate-300 p-1 rounded w-full" />
                                         <button onClick={() => setTempTimeWindows(tempTimeWindows.filter((_, i) => i !== idx))} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={12}/></button>
                                       </div>
                                     ))}
                                     <button onClick={() => setTempTimeWindows([...tempTimeWindows, {start: "08:00", end: "17:00"}])} className="text-[10px] text-orange-600 font-bold self-start mt-1 flex items-center gap-1"><Plus size={10}/> Add Window</button>
                                   </div>
                                   <div className="flex gap-2">
                                     <button onClick={() => saveTimeWindow(p.id)} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-700">Save</button>
                                     <button onClick={() => setEditingTimeId(null)} className="bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg font-bold hover:bg-slate-400">Cancel</button>
                                   </div>
                                 </div>
                              ) : (
                                 <div className="flex items-start gap-2">
                                   <div className="flex flex-col gap-1 flex-1">
                                     {(p.timeWindows || [{start: p.timeStart || '00:00', end: p.timeEnd || '23:59'}]).map((w, i) => (
                                        <span key={i} className="whitespace-nowrap bg-slate-100 px-2 py-1 rounded border border-slate-200">{w.start || '00:00'} - {w.end || '23:59'}</span>
                                     ))}
                                   </div>
                                   <button onClick={() => { setEditingTimeId(p.id); setTempTimeWindows(p.timeWindows || [{start: p.timeStart || '00:00', end: p.timeEnd || '23:59'}]); }} className="p-1.5 text-slate-400 hover:text-orange-600 rounded-md"><Pencil size={14}/></button>
                                 </div>
                              )}
                            </td>

                            <td className="p-3 md:p-4 text-right">
                               <div className="flex justify-end gap-2">
                                 <button onClick={() => editPassword(p.id)} className="p-2 text-slate-400 hover:text-orange-600 rounded-lg" title="Edit Password"><Key size={16}/></button>
                                 <button onClick={() => deleteUser(p.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg" title="Delete User"><Trash2 size={16}/></button>
                               </div>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* PARAMETERS MANAGEMENT */}
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <h3 className="font-bold text-base md:text-lg mb-2 flex items-center gap-2 text-slate-800"><ClipboardList className="text-orange-600"/> Parameter Management</h3>
                    <p className="text-sm text-slate-500 mb-6">These parameters build the dynamic inspection form.</p>
                    
                    <div className="space-y-4">
                      {params.map(p => (
                        <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden">
                           <div className="bg-slate-50 p-3 md:p-4 border-b border-slate-200 font-black text-slate-800 flex justify-between items-center text-sm md:text-base">
                              {editingItem.id === p.id && editingItem.subId === null ? (
                                 <div className="flex-1 flex items-center gap-2 mr-4">
                                   <input value={editingItem.text} onChange={(e) => setEditingItem({...editingItem, text: e.target.value})} className="w-full border border-orange-300 p-2 rounded-lg text-sm" autoFocus />
                                   <button onClick={saveEdit} className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-bold">Save</button>
                                   <button onClick={() => setEditingItem({ id: null, subId: null, text: '' })} className="bg-slate-300 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold">Cancel</button>
                                 </div>
                              ) : (
                                 <><span className="flex-1">{p.name}</span><div className="flex items-center gap-3"><span className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">{p.subParams.length} items</span><button onClick={() => setEditingItem({ id: p.id, subId: null, text: p.name })} className="text-slate-400 hover:text-orange-600"><Pencil size={16}/></button><button onClick={() => deleteMainParam(p.id)} className="text-slate-400 hover:text-red-600"><Trash2 size={16}/></button></div></>
                              )}
                           </div>
                           <div className="p-3 md:p-4 bg-white">
                              <ul className="space-y-2 mb-4">
                                {p.subParams.length === 0 && <li className="text-sm text-slate-400 italic">No sub-parameters added yet.</li>}
                                {p.subParams.map(sp => (
                                   <li key={sp.id} className="flex justify-between items-center bg-slate-50 p-2 md:p-2.5 rounded-lg border border-slate-100 text-xs md:text-sm font-medium text-slate-700">
                                     {editingItem.id === p.id && editingItem.subId === sp.id ? (
                                        <div className="flex-1 flex items-center gap-2">
                                          <input value={editingItem.text} onChange={(e) => setEditingItem({...editingItem, text: e.target.value})} className="w-full border border-orange-300 p-1.5 rounded-md text-sm" autoFocus />
                                          <button onClick={saveEdit} className="bg-emerald-600 text-white px-2 py-1.5 rounded-md text-xs font-bold">Save</button>
                                          <button onClick={() => setEditingItem({ id: null, subId: null, text: '' })} className="bg-slate-300 text-slate-700 px-2 py-1.5 rounded-md text-xs font-bold">Cancel</button>
                                        </div>
                                     ) : (
                                        <><span className="flex-1 pr-4">{sp.text}</span><div className="flex items-center gap-2"><button onClick={() => setEditingItem({ id: p.id, subId: sp.id, text: sp.text })} className="text-slate-400 hover:text-orange-600"><Pencil size={16}/></button><button onClick={() => removeSubParam(p.id, sp.id)} className="text-slate-400 hover:text-red-600"><Trash2 size={16}/></button></div></>
                                     )}
                                   </li>
                                ))}
                              </ul>
                              <form onSubmit={(e) => addSubParam(e, p.id)} className="flex flex-col sm:flex-row gap-2 mt-4"><input name="subParamText" className="flex-1 border border-slate-300 p-2 md:p-2.5 rounded-lg text-sm bg-slate-50" required /><button type="submit" className="w-full sm:w-auto bg-slate-200 text-slate-700 px-4 py-2 md:py-2.5 rounded-lg text-sm font-bold"><Plus size={16}/> Add Item</button></form>
                           </div>
                        </div>
                      ))}
                      <form onSubmit={addMainParam} className="flex flex-col sm:flex-row gap-2 pt-6 border-t border-slate-100 mt-6"><input name="newMainParam" className="flex-1 border border-orange-300 p-3 rounded-xl text-sm" required /><button type="submit" className="w-full sm:w-auto bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-700"><Plus size={16}/> New Category</button></form>
                    </div>
                  </div>
                </div>
              )}

              {}
              {/* INSPECTION FORM TAB */}
              {activeTab === 'inspection-form' && (
                <div className="bg-white p-4 md:p-10 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto relative">
                  
                  {/* Warning banner if time expires while form is open */}
                  {!isTimeValid && (
                     <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold flex items-center gap-2 print:hidden shadow-sm">
                        <Clock size={20}/> Time window has expired. This inspection is now locked and cannot be submitted.
                     </div>
                  )}

                  <div className="border-b border-slate-200 pb-4 md:pb-6 mb-4 md:mb-6 flex justify-between items-start print:hidden">
                     <div>
                       <h2 className="text-xl md:text-2xl font-black text-slate-900">Conduct Inspection</h2>
                       <p className="text-xs md:text-sm font-bold text-orange-600 mt-1 flex items-center gap-1"><ClipboardList size={16}/> {selectedZone}</p>
                     </div>
                     <button type="button" onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-bold transition-colors">
                        <FileText size={16}/> Print Blank Form
                     </button>
                  </div>
                  
                  <form onSubmit={handleInspectionSubmit} className="space-y-6">
                    {params.map(p => (
                      <div key={p.id} className="mb-8">
                        <h3 className="font-black text-slate-800 text-lg md:text-xl mb-4 pb-2 border-b-2 border-slate-100 print:text-black print:border-black">{p.name}</h3>
                        
                        <div className="space-y-3">
                          {p.subParams.length === 0 ? (
                             <p className="text-sm text-slate-400 italic print:text-black">No specific checklist items defined for this category.</p>
                          ) : (
                            p.subParams.map(sp => {
                              const itemKey = `[${p.name}] ${sp.text}`;
                              return (
                                <div key={sp.id} className="p-3 md:p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 md:gap-6 justify-between items-start sm:items-center print:border-black print:bg-white print:break-inside-avoid">
                                   <label className="font-medium text-slate-700 text-sm flex-1 print:text-black">{sp.text}</label>
                                   
                                   <div className="flex w-full sm:w-auto gap-2 items-center print:hidden">
                                     <select name={`res-${itemKey}`} disabled={!isTimeValid} className="flex-1 sm:w-48 p-2 border border-slate-300 rounded-lg font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400" defaultValue="" required>
                                        <option value="" disabled>Pilih Status...</option>
                                        <option value="Memuaskan">🟢 Memuaskan</option>
                                        <option value="Tidak Memuaskan">🔴 Tidak Memuaskan</option>
                                        <option value="N/A">⚪ N/A</option>
                                     </select>
                                     
                                     <label 
                                        className={`flex items-center justify-center p-2 border rounded-lg transition-colors ${!isTimeValid ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed' : photoPreview[itemKey] ? 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-inner cursor-pointer' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-orange-600 cursor-pointer'}`} 
                                        title={photoPreview[itemKey] ? "Photo Attached!" : "Attach Photo"}
                                     >
                                        {photoPreview[itemKey] ? <Check size={20}/> : <Camera size={20}/>}
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          capture="environment" 
                                          className="hidden" 
                                          disabled={!isTimeValid}
                                          onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                              const file = e.target.files[0];
                                              setAttachedPhotos(prev => ({...prev, [itemKey]: file}));
                                              setPhotoPreview(prev => ({...prev, [itemKey]: true}));
                                            }
                                          }}
                                        />
                                     </label>
                                   </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-4 md:p-5 bg-orange-50 rounded-xl border border-orange-200 mt-8 print:border-black print:bg-white print:break-inside-avoid">
                       <label className="font-black text-orange-900 block mb-2 text-base md:text-lg print:text-black">Overall Remarks / Corrective Actions</label>
                       <p className="text-xs text-orange-700 mb-3 font-medium print:hidden">Add general observations or details regarding failed parameters.</p>
                       <textarea 
                          name="remarks"
                          disabled={!isTimeValid}
                          className="w-full p-3 md:p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white print:border-black disabled:bg-slate-100 disabled:text-slate-400" 
                          rows="4" 
                          placeholder="Type your remarks here..."
                       ></textarea>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-3 md:gap-4 print:hidden">
                       <button type="button" onClick={() => { setActiveTab('dashboard'); setPhotoPreview({}); setAttachedPhotos({}); setIsSubmitting(false); }} className="w-full sm:w-1/3 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition-colors">Cancel</button>
                       <button 
                          type="submit" 
                          disabled={isSubmitting || !isTimeValid} 
                          className={`w-full sm:w-2/3 py-3 rounded-xl font-black text-base md:text-lg shadow-lg transition-all ${
                            !isTimeValid ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' 
                            : isSubmitting ? 'bg-orange-400 text-orange-100 cursor-not-allowed' 
                            : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/30'
                          }`}
                       >
                         {!isTimeValid ? 'Locked: Time Expired' : isSubmitting ? '⏳ Processing...' : 'Submit Final Inspection'}
                       </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="mt-auto py-6 text-center text-xs text-slate-400 font-medium print:hidden border-t border-slate-200 bg-slate-50 w-full">
               &copy; 2026 KLSMHSE <br className="md:hidden" /><span className="hidden md:inline mx-2">•</span> Developed by ThadYap
            </div>
          </main>
        </>
      )}
    </div>
  );
}