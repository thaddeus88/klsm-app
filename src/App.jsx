import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// Inline SVG Icon Components
const IconWrapper = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);

const LayoutDashboard = (p) => <IconWrapper {...p}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></IconWrapper>;
const ClipboardList = (p) => <IconWrapper {...p}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></IconWrapper>;
const ShieldAlert = (p) => <IconWrapper {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></IconWrapper>;
const Users = (p) => <IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconWrapper>;
const LogOut = (p) => <IconWrapper {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></IconWrapper>;
const Plus = (p) => <IconWrapper {...p}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>;
const Trash2 = (p) => <IconWrapper {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>;
const Settings = (p) => <IconWrapper {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></IconWrapper>;
const Key = (p) => <IconWrapper {...p}><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></IconWrapper>;
const Camera = (p) => <IconWrapper {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconWrapper>;
const BarChart3 = (p) => <IconWrapper {...p}><path d="M3 3v18h18"/><rect width="4" height="7" x="7" y="10" rx="1"/><rect width="4" height="12" x="15" y="5" rx="1"/></IconWrapper>;
const UserPlus = (p) => <IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></IconWrapper>;
const Check = (p) => <IconWrapper {...p}><path d="M20 6 9 17l-5-5"/></IconWrapper>;
const Clock = (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconWrapper>;
const Edit2 = (p) => <IconWrapper {...p}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></IconWrapper>;
const Save = (p) => <IconWrapper {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></IconWrapper>;
const AlertTriangle = (p) => <IconWrapper {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></IconWrapper>;
const Download = (p) => <IconWrapper {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></IconWrapper>;
const X = (p) => <IconWrapper {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>;
const Flame = (p) => <IconWrapper {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></IconWrapper>;

const initialZones = [
  "Zone 1 – Laboratory, CPO Despatch, Oil Storage Tank & FFB Grading",
  "Zone 2 – Workshop",
  "Zone 3 – Boiler, Engine Room & RO Water Treatment",
  "Zone 4 – Biogas Plant (Digester, Scrubber, Flare, Gas Engine, ETP)",
  "Zone 5 – Production Area",
  "Zone 6 – Store & Diesel Skid Tank",
  "Zone 7 - Mill's Clinic",
  "Zone 8 – Security",
  "Zone 9 – Office"
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialUsers = [
  { 
    id: 1, 
    name: "John Doe", 
    role: "Inspector", 
    zones: ["Zone 1 – Laboratory, CPO Despatch, Oil Storage Tank & FFB Grading", "Zone 2 – Workshop"], 
    freq: "2 times/day", 
    password: "1234",
    timeWindows: [{ start: "08:00", end: "10:00" }, { start: "14:00", end: "16:00" }],
    offDays: ["Sunday"]
  },
  { 
    id: 2, 
    name: "Admin Jane", 
    role: "Admin Level 1", 
    zones: ["All"], 
    freq: "N/A", 
    password: "1234",
    timeWindows: [{ start: "00:00", end: "23:59" }],
    offDays: []
  }
];

const initialParameters = [
  { id: 1, name: "Management & Documented Information" },
  { id: 2, name: "Housekeeping" },
  { id: 3, name: "PPE" },
  { id: 4, name: "Machinery Safety" },
  { id: 5, name: "Electrical Safety" },
  { id: 6, name: "Chemical Safety" },
  { id: 7, name: "Fire Fighting & Emergency" },
  { id: 8, name: "Environment" }
];

const hydrantLocations = ["H.1 Office", "H.2 Supervisor Room", "H.3 Oil Room", "H.4 Kernel Plant", "H.5 Boiler Station", "H.6 Biogas Scrubber", "H.7 Digester Tank", "H.8 Digester Tank", "H.9 Digester Tank", "H.10 Gas Engine"];
const hydrantItems = ["Fire Canvas Hose", "Coupling", "Nozzle", "Fire Hydrant Box", "Valve"];

const hoseReelLocations = ["HR.1 Sterilizer", "HR.2 Supervisor Room", "HR.3 EFB Press", "HR.4 PCF Station", "HR.5 PCF Station", "HR.6 Kernel Plant Station", "HR.7 Kernel Plant Station", "HR.8 Boiler", "HR.9 Boiler", "HR.10 Engine Room", "HR.11 Oil Room", "HR.12 Oil Room", "HR.13 Engine Gas Plant", "HR.14 Engine Gas Plant", "HR.15 Kernel Silo (Top)", "HR.16 Kernel Silo (Top)"];
const hoseReelItems = ["Keadaan Hose Reel", "Catatan"];

const pumpItemsList = ["Bateri", "Tangki Diesel (Penuh)", "Minyak Enjin", "Air Radiator", "Panel Elektrik(Auto) *", "Injap Keluar & Masuk *", "Tolok Tekanan *", "Pam *", "Kebersihan *", "Motor Elektrik *"];
const pumpTypes = ["Diesel Engine Pump", "Electric Motor Pump", "Electric Jockey Pump"];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [params] = useState(initialParameters);
  
  // TOAST NOTIFICATION STATE
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // CLOUD STATE INITIALIZATION
  const [personnel, setPersonnel] = useState(initialUsers);
  const [inspections, setInspections] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [loginError, setLoginError] = useState('');

  // Time Lock State
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
  
  // Form States
  const [photoPreview, setPhotoPreview] = useState({});
  const [attachedPhotos, setAttachedPhotos] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Personnel State
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState(null);
  const [passwordEditId, setPasswordEditId] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState("");

  // Form states for adding new user
  const [newUserWindows, setNewUserWindows] = useState([{ start: "08:00", end: "17:00" }]);
  const [newUserOffDays, setNewUserOffDays] = useState([]);

  // Fire Fighting Checklist States
  const [ffActiveTab, setFfActiveTab] = useState('extinguisher');
  const [fireExtinguishers, setFireExtinguishers] = useState([{ id: 1, type: '', expiry: '', location: '', mfgDate: '' }]);
  const [hydrantCheck, setHydrantCheck] = useState({});
  const [hoseReelCheck, setHoseReelCheck] = useState({});
  const [pumpCheck, setPumpCheck] = useState({});

  // FIREBASE REAL-TIME LISTENERS
  useEffect(() => {
    if (!db) return;
    const unsubs = [];

    try {
      unsubs.push(onSnapshot(collection(db, 'personnel'), (snap) => {
        if (!snap.empty) {
          setPersonnel(snap.docs.map(d => ({ ...d.data(), id: parseInt(d.id) })));
        }
      }));

      unsubs.push(onSnapshot(collection(db, 'inspections'), (snap) => {
        setInspections(snap.docs.map(d => d.data()));
      }));

      unsubs.push(onSnapshot(collection(db, 'accidents'), (snap) => {
        setAccidents(snap.docs.map(d => d.data()));
      }));

      unsubs.push(onSnapshot(collection(db, 'fireExtinguishers'), (snap) => {
        if (!snap.empty) setFireExtinguishers(snap.docs.map(d => d.data()));
      }));

      unsubs.push(onSnapshot(doc(db, 'fireEquipment', 'hydrantCheck'), (docSnap) => {
        if (docSnap.exists()) setHydrantCheck(docSnap.data());
      }));

      unsubs.push(onSnapshot(doc(db, 'fireEquipment', 'hoseReelCheck'), (docSnap) => {
        if (docSnap.exists()) setHoseReelCheck(docSnap.data());
      }));

      unsubs.push(onSnapshot(doc(db, 'fireEquipment', 'pumpCheck'), (docSnap) => {
        if (docSnap.exists()) setPumpCheck(docSnap.data());
      }));
    } catch (error) {
      console.error("Firebase connection error:", error);
    }

    return () => unsubs.forEach(unsub => unsub());
  }, []);

  // LIVE CLOCK
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // ROLE & ACCESS LOGIC
  const isAdmin1 = currentUser?.role === 'Admin Level 1' || currentUser?.role === 'Admin';
  const isAdmin2 = currentUser?.role === 'Admin Level 2';
  const isAnyAdmin = isAdmin1 || isAdmin2;
  const isFireEqReadOnly = isAdmin2; 

  const userWindows = currentUser?.timeWindows || [{ start: "00:00", end: "23:59" }];
  const isTimeValid = userWindows.some(w => (!w.start || !w.end) || (currentTime >= w.start && currentTime <= w.end));

  const checkIsOffDay = (user) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return user.offDays?.includes(today);
  };

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

  // --- FIREBASE WRITE ACTIONS ---

  const saveEditedPassword = async (userId) => {
    if (newPasswordValue.trim() === "") {
        showToast("Password cannot be empty.");
        return;
    }
    const userToUpdate = personnel.find(p => p.id === userId);
    const updatedUser = { ...userToUpdate, password: newPasswordValue };
    
    await setDoc(doc(db, 'personnel', userId.toString()), updatedUser);
    setPasswordEditId(null);
    setNewPasswordValue("");
    showToast("Password updated successfully.");
  };

  const addPersonnel = async (e) => {
    e.preventDefault();
    const checkedZones = Array.from(e.target.zone || [])
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
      
    const selectedRole = e.target.role.value;
    const isNewUserAdmin = selectedRole.includes('Admin');

    const newPerson = {
      id: Date.now(),
      name: e.target.name.value,
      role: selectedRole,
      zones: isNewUserAdmin ? ['All'] : checkedZones,
      freq: e.target.freq.value,
      password: e.target.password.value,
      timeWindows: [...newUserWindows],
      offDays: [...newUserOffDays]
    };

    await setDoc(doc(db, 'personnel', newPerson.id.toString()), newPerson);
    setNewUserWindows([{ start: "08:00", end: "17:00" }]);
    setNewUserOffDays([]);
    e.target.reset();
    showToast("Personnel added to Cloud successfully!");
  };

  const saveEditedUser = async () => {
    await setDoc(doc(db, 'personnel', editUserForm.id.toString()), editUserForm);
    setEditingUserId(null);
    setEditUserForm(null);
    showToast("Schedule updated in Cloud successfully.");
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'personnel', id.toString()));
    showToast("User removed from Cloud.");
  };

  const handleInspectionSubmit = async (e) => {
    e.preventDefault();
    if (!isTimeValid) {
       showToast('❌ Time window expired. Cannot submit inspection.');
       return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);
    let results = {};
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('res-')) {
        results[key.replace('res-', '')] = value;
      }
    }

    const newInspection = {
      id: Date.now(),
      date: new Date().toISOString(),
      zone: selectedZone,
      inspector: currentUser.name,
      results: results,
      remarks: formData.get('remarks'),
      photos: attachedPhotos 
    };

    try {
      await setDoc(doc(db, 'inspections', newInspection.id.toString()), newInspection);
      setIsSubmitting(false);
      setPhotoPreview({});
      setAttachedPhotos({});
      setActiveTab('dashboard');
      showToast('✅ Inspection Saved to Cloud!');
    } catch (err) {
      showToast('❌ Error connecting to database.');
      setIsSubmitting(false);
    }
  };

  const handleAccidentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAccident = {
      id: Date.now(),
      date: formData.get('accDate'),
      injured: formData.get('accInjured'),
      damage: formData.get('accDamage'),
      details: formData.get('accDetails'),
      reportedBy: currentUser.name,
      timestamp: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'accidents', newAccident.id.toString()), newAccident);
    e.target.reset();
    setActiveTab('dashboard');
    showToast('🚨 Accident Report Saved to Cloud!');
  };

  // Fire Equipment Cloud Writers
  const addExtinguisher = async () => {
    const newExt = { id: Date.now(), type: '', expiry: '', location: '', mfgDate: '' };
    await setDoc(doc(db, 'fireExtinguishers', newExt.id.toString()), newExt);
  };

  const updateExtinguisher = async (id, field, value) => {
    const ext = fireExtinguishers.find(e => e.id === id);
    if (ext) {
       await setDoc(doc(db, 'fireExtinguishers', id.toString()), { ...ext, [field]: value });
    }
  };

  const deleteExtinguisher = async (id) => {
    await deleteDoc(doc(db, 'fireExtinguishers', id.toString()));
  };

  const updateHydrantCheck = async (key, value) => {
    const newData = {...hydrantCheck, [key]: value};
    setHydrantCheck(newData);
    await setDoc(doc(db, 'fireEquipment', 'hydrantCheck'), newData);
  };

  const updateHoseReelCheck = async (key, value) => {
    const newData = {...hoseReelCheck, [key]: value};
    setHoseReelCheck(newData);
    await setDoc(doc(db, 'fireEquipment', 'hoseReelCheck'), newData);
  };

  const updatePumpCheck = async (key, value) => {
    const newData = {...pumpCheck, [key]: value};
    setPumpCheck(newData);
    await setDoc(doc(db, 'fireEquipment', 'pumpCheck'), newData);
  };

  const displayedZones = isAnyAdmin 
    ? initialZones 
    : initialZones.filter(z => currentUser?.zones.includes(z));

  // Analytics Calculations
  const zonePerformanceData = initialZones.map(zone => {
    const zoneInspections = (typeof inspections !== 'undefined' ? inspections : []).filter(i => i.zone === zone);
    if (zoneInspections.length === 0) return 0;
    let memuaskan = 0; let totalScored = 0;
    zoneInspections.forEach(insp => {
      Object.values(insp.results || {}).forEach(val => {
        if (!val) return;
        const v = String(val).toLowerCase();
        if (v === "memuaskan" || v === "pass" || v.includes("🟢")) { memuaskan++; totalScored++; }
        if (v === "tidak memuaskan" || v === "fail" || v.includes("🔴")) { totalScored++; }
      });
    });
    return totalScored > 0 ? Math.round((memuaskan / totalScored) * 100) : 0;
  });

  const allMonthlyCounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(monthIdx => {
    return (typeof inspections !== 'undefined' ? inspections : []).filter(i => new Date(i.date || Date.now()).getMonth() === monthIdx).length;
  });
  
  const maxMonthlyCount = Math.max(...allMonthlyCounts, 0);
  const maxMonthlyScale = Math.max(2, maxMonthlyCount % 2 === 0 ? maxMonthlyCount : maxMonthlyCount + 1);

  const allMonthlyCompliances = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(monthIdx => {
    const monthInspections = (typeof inspections !== 'undefined' ? inspections : []).filter(i => new Date(i.date || Date.now()).getMonth() === monthIdx);
    let pass = 0; let total = 0;
    monthInspections.forEach(insp => {
      Object.values(insp.results || {}).forEach(val => {
        if (!val) return;
        const v = String(val).toLowerCase();
        if (v === "memuaskan" || v === "pass" || v.includes("🟢")) { pass++; total++; }
        if (v === "tidak memuaskan" || v === "fail" || v.includes("🔴")) { total++; }
      });
    });
    return total > 0 ? Math.round((pass / total) * 100) : 0;
  });
  
  const maxCompValue = Math.max(...allMonthlyCompliances, 0);
  const maxCompScale = Math.max(20, Math.ceil(maxCompValue / 20) * 20); // Scale by 20s up to 100

  // Export Zone Compliance Data
  const exportComplianceReport = () => {
    let csv = "Zone,Total Inspections,Compliance Score (%)\n";
    initialZones.forEach((zone, idx) => {
      const count = (typeof inspections !== 'undefined' ? inspections : []).filter(i => i.zone === zone).length;
      const score = zonePerformanceData[idx];
      csv += `"${zone}",${count},${score}%\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zone_Compliance_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Login Screen render
  if (activeTab === 'login') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-between items-center w-full font-sans relative">
        {toastMessage && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 z-50 animate-bounce">
            {toastMessage}
          </div>
        )}

        <div className="flex-1 flex items-center justify-center w-full px-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border-t-4 border-orange-600">
            <ShieldAlert className="mx-auto text-orange-600 mb-4" size={48} />
            <h1 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">KLSM HSE Hub</h1>
            <p className="text-sm text-slate-500 mb-6 font-medium">Authorized Personnel Only</p>
            
            {loginError && (
              <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-lg font-semibold border border-red-200">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select User</label>
                <select name="userSelect" className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none font-medium">
                  {personnel.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
                <input type="password" name="password" placeholder="Enter password" className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none" required />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/30 transition-all">Secure Login</button>
            </form>
          </div>
        </div>
        <div className="text-center p-6 text-xs text-slate-500 font-medium">
          &copy; 2026 KLSMHSE &bull; Developed by ThadYap
        </div>
      </div>
    );
  }

  // Main App Dashboard Render
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800 relative">
      
      {toastMessage && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 z-50 transition-all">
          {toastMessage}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 shadow-xl z-10 print:hidden shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-black mb-8 text-orange-500 tracking-tight flex items-center gap-2">
            <ShieldAlert size={24}/> KLSM HSE Hub
          </h1>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'dashboard' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><LayoutDashboard size={20}/> Dashboard</button>
            
            <button onClick={() => setActiveTab('report-accident')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'report-accident' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><AlertTriangle size={20}/> Report Accident</button>
            
            {/* Admin Only Tabs */}
            {isAnyAdmin && (
               <button onClick={() => setActiveTab('fire-fighting')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'fire-fighting' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Flame size={20}/> Fire Equipment</button>
            )}
            
            {isAnyAdmin && (
               <button onClick={() => setActiveTab('admin-analytics')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'admin-analytics' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><BarChart3 size={20}/> Analytics</button>
            )}

            {isAdmin1 && (
               <button onClick={() => setActiveTab('admin-settings')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'admin-settings' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Settings size={20}/> Settings</button>
            )}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-800">
           <p className="text-xs text-slate-400 font-semibold mb-1">Logged in as:</p>
           <p className="text-sm font-bold text-white mb-4">{currentUser.name}</p>
           <button onClick={() => {setCurrentUser(null); setActiveTab('login');}} className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl font-bold transition-colors"><LogOut size={20}/> Sign Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Your Assigned Zones</h2>
                  <div className="mt-2 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                    <ClipboardList size={16}/> Daily Requirement: {currentUser?.freq || 'N/A'}
                  </div>
                </div>
                <div className={`text-sm font-bold flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-lg border ${isTimeValid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  <Clock size={16}/> Assigned Windows: {userWindows.map((w,i) => <span key={i} className="bg-white/50 px-1 rounded">{w.start}-{w.end}</span>)}
                </div>
              </div>

              {displayedZones.length === 0 ? (
                 <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 font-medium">You currently have no zones assigned to you.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedZones.map((zone, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                      <h3 className="font-bold mb-6 text-slate-800 leading-snug">{zone}</h3>
                      {isTimeValid ? (
                        <button onClick={() => { setSelectedZone(zone); setActiveTab('inspection-form'); }} className="bg-slate-900 text-white w-full py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                          <ClipboardList size={18}/> Start Inspection
                        </button>
                      ) : (
                        <button disabled className="bg-slate-100 text-slate-400 border border-slate-200 w-full py-3 rounded-xl text-sm font-bold cursor-not-allowed flex items-center justify-center gap-2">
                          <Clock size={18}/> Outside Time Window
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FIRE FIGHTING EQUIPMENT TAB */}
          {activeTab === 'fire-fighting' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-4">
                 <div>
                   <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><Flame className="text-orange-600"/> Fire Fighting Equipment Checklist</h2>
                   <p className="text-sm font-medium text-slate-500 mt-1">Monthly inspection tracking for all fire safety equipment.</p>
                 </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                 <button onClick={() => setFfActiveTab('extinguisher')} className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${ffActiveTab === 'extinguisher' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Portable Fire Extinguisher</button>
                 <button onClick={() => setFfActiveTab('hose-pump')} className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${ffActiveTab === 'hose-pump' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Hose Reel, Hydrant &amp; Pump</button>
              </div>

              {ffActiveTab === 'extinguisher' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                        <tr>
                          <th className="p-4 w-12 text-center">No.</th>
                          <th className="p-4">Jenis Pemadam Api (ABC/CO2)</th>
                          <th className="p-4">Tarikh Luput</th>
                          <th className="p-4">Lokasi</th>
                          <th className="p-4">Tarikh Silinder Dibuat</th>
                          {!isFireEqReadOnly && <th className="p-4 w-16 text-center">Action</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {fireExtinguishers.map((ext, idx) => (
                          <tr key={ext.id} className="hover:bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-400 text-center">{idx + 1}</td>
                            <td className="p-4">
                              <select disabled={isFireEqReadOnly} value={ext.type} onChange={(e) => updateExtinguisher(ext.id, 'type', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-white disabled:bg-slate-100 disabled:text-slate-500">
                                <option value="" disabled>Pilih Jenis...</option>
                                <option value="ABC">ABC</option>
                                <option value="CO2">CO2</option>
                              </select>
                            </td>
                            <td className="p-4"><input disabled={isFireEqReadOnly} type="date" value={ext.expiry} onChange={(e) => updateExtinguisher(ext.id, 'expiry', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-slate-100 disabled:text-slate-500" /></td>
                            <td className="p-4"><input disabled={isFireEqReadOnly} type="text" placeholder="E.g. Office Area" value={ext.location} onChange={(e) => updateExtinguisher(ext.id, 'location', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-slate-100 disabled:text-slate-500" /></td>
                            <td className="p-4">
                               <input 
                                 disabled={isFireEqReadOnly}
                                 type="number" 
                                 min="1950"
                                 max="2100"
                                 placeholder="YYYY" 
                                 value={ext.mfgDate} 
                                 onChange={(e) => updateExtinguisher(ext.id, 'mfgDate', e.target.value)} 
                                 className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-white disabled:bg-slate-100 disabled:text-slate-500" 
                               />
                            </td>
                            {!isFireEqReadOnly && (
                               <td className="p-4 text-center">
                                 <button onClick={() => deleteExtinguisher(ext.id)} className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={18}/></button>
                               </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50">
                     {!isFireEqReadOnly && <button onClick={addExtinguisher} className="text-sm font-bold text-orange-600 flex items-center gap-2 hover:text-orange-700 bg-orange-100/50 px-4 py-2 rounded-lg"><Plus size={16}/> Add Row</button>}
                     
                     {isFireEqReadOnly ? (
                        <div className="ml-auto bg-slate-200 text-slate-500 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><ShieldAlert size={16}/> Read Only Mode</div>
                     ) : (
                        <div className="ml-auto bg-emerald-100 text-emerald-700 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Save size={16}/> Cloud Synced</div>
                     )}
                  </div>
                </div>
              )}

              {ffActiveTab === 'hose-pump' && (
                <div className="space-y-8 pb-10">
                  
                  {/* Table 1: Fire Hydrant */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 p-4"><h3 className="font-bold text-white flex items-center gap-2">Table 1: Fire Hydrant</h3></div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                          <tr>
                            <th className="p-4 border-r border-slate-100">Location</th>
                            {hydrantItems.map(item => <th key={item} className="p-4 text-center">{item}</th>)}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {hydrantLocations.map(loc => (
                            <tr key={loc} className="hover:bg-slate-50/50">
                              <td className="p-4 font-bold text-slate-700 border-r border-slate-100">{loc}</td>
                              {hydrantItems.map(item => {
                                const key = `${loc}-${item}`;
                                return (
                                  <td key={key} className="p-2 text-center">
                                    <select disabled={isFireEqReadOnly} value={hydrantCheck[key] || ''} onChange={(e) => updateHydrantCheck(key, e.target.value)} className="w-full max-w-[140px] p-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-white disabled:bg-slate-100 disabled:text-slate-500">
                                      <option value="" disabled>Status...</option>
                                      <option value="Memuaskan">Memuaskan</option>
                                      <option value="Tidak Memuaskan">Tidak Memuaskan</option>
                                      <option value="N/A">N/A</option>
                                    </select>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Table 2: Hose Reel */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 p-4"><h3 className="font-bold text-white flex items-center gap-2">Table 2: Hose Reel</h3></div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                          <tr>
                            <th className="p-4 border-r border-slate-100">Location</th>
                            {hoseReelItems.map(item => <th key={item} className="p-4 text-center">{item}</th>)}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {hoseReelLocations.map(loc => (
                            <tr key={loc} className="hover:bg-slate-50/50">
                              <td className="p-4 font-bold text-slate-700 border-r border-slate-100">{loc}</td>
                              {hoseReelItems.map(item => {
                                const key = `${loc}-${item}`;
                                return (
                                  <td key={key} className="p-2 text-center">
                                    {item === 'Catatan' ? (
                                      <input 
                                        disabled={isFireEqReadOnly}
                                        type="text" 
                                        placeholder="Add remarks..." 
                                        value={hoseReelCheck[key] || ''} 
                                        onChange={(e) => updateHoseReelCheck(key, e.target.value)} 
                                        className="w-full min-w-[200px] p-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-white disabled:bg-slate-100 disabled:text-slate-500"
                                      />
                                    ) : (
                                      <select disabled={isFireEqReadOnly} value={hoseReelCheck[key] || ''} onChange={(e) => updateHoseReelCheck(key, e.target.value)} className="w-full max-w-[140px] p-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-white disabled:bg-slate-100 disabled:text-slate-500">
                                        <option value="" disabled>Status...</option>
                                        <option value="Memuaskan">Memuaskan</option>
                                        <option value="Tidak Memuaskan">Tidak Memuaskan</option>
                                        <option value="N/A">N/A</option>
                                      </select>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Table 3: Fire Fighting Pump */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 p-4"><h3 className="font-bold text-white flex items-center gap-2">Table 3: Fire Fighting Pump</h3></div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                          <tr>
                            <th className="p-4 border-r border-slate-100">Tempat</th>
                            {pumpTypes.map(type => <th key={type} className="p-4 text-center">{type}</th>)}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {pumpItemsList.map(item => (
                            <tr key={item} className="hover:bg-slate-50/50">
                              <td className="p-4 font-bold text-slate-700 border-r border-slate-100">{item}</td>
                              {pumpTypes.map(type => {
                                const key = `${item}-${type}`;
                                
                                // Logical blackout boundaries check
                                const isDieselBlackout = type === "Diesel Engine Pump" && ["Panel Elektrik(Auto) *", "Injap Keluar & Masuk *", "Tolok Tekanan *", "Pam *", "Kebersihan *", "Motor Elektrik *"].includes(item);
                                const isElectricBlackout = (type === "Electric Motor Pump" || type === "Electric Jockey Pump") && ["Bateri", "Tangki Diesel (Penuh)", "Minyak Enjin", "Air Radiator"].includes(item);
                                
                                if (isDieselBlackout || isElectricBlackout) {
                                   return (
                                     <td key={key} className="p-2 text-center bg-slate-50">
                                        <div className="w-full h-8 bg-slate-800 rounded-md"></div>
                                     </td>
                                   );
                                }

                                return (
                                  <td key={key} className="p-2 text-center">
                                    <select disabled={isFireEqReadOnly} value={pumpCheck[key] || ''} onChange={(e) => updatePumpCheck(key, e.target.value)} className="w-full max-w-[200px] p-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-white disabled:bg-slate-100 disabled:text-slate-500">
                                      <option value="" disabled>Status...</option>
                                      <option value="Memuaskan">Memuaskan</option>
                                      <option value="Tidak Memuaskan">Tidak Memuaskan</option>
                                      <option value="N/A">N/A</option>
                                    </select>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                     {isFireEqReadOnly ? (
                        <div className="bg-slate-200 text-slate-500 px-8 py-3 rounded-xl font-black shadow-none flex items-center gap-2"><ShieldAlert size={20}/> Read Only Mode</div>
                     ) : (
                        <div className="bg-emerald-100 text-emerald-700 px-8 py-3 rounded-xl font-black shadow-lg flex items-center gap-2"><Save size={20}/> Cloud Synced</div>
                     )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* INSPECTION FORM TAB */}
          {activeTab === 'inspection-form' && (
            <div className="bg-white p-4 md:p-10 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto relative">
              {!isTimeValid && (
                 <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                    <Clock size={20}/> Time window has expired. This inspection is now locked and cannot be submitted.
                 </div>
              )}
              <div className="border-b border-slate-200 pb-4 mb-6">
                 <h2 className="text-2xl font-black text-slate-900">Conduct Inspection</h2>
                 <p className="text-sm font-bold text-orange-600 mt-1 flex items-center gap-1"><ClipboardList size={16}/> {selectedZone}</p>
              </div>
              
              <form onSubmit={handleInspectionSubmit} className="space-y-6">
                {params.map((p, idx) => (
                  <div key={p.id} className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                       <div className="font-black text-slate-400 text-xl w-6">{idx + 1}.</div>
                       <label className="font-medium text-slate-700 text-sm flex-1">{p.name}</label>
                       <div className="flex w-full sm:w-auto gap-2 items-center">
                         <select name={`res-${p.id}`} disabled={!isTimeValid} className="flex-1 sm:w-48 p-2 border border-slate-300 rounded-lg font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400" defaultValue="" required>
                            <option value="" disabled>Pilih Status...</option>
                            <option value="Memuaskan">🟢 Memuaskan</option>
                            <option value="Tidak Memuaskan">🔴 Tidak Memuaskan</option>
                            <option value="N/A">⚪ N/A</option>
                         </select>
                         
                         <label 
                            className={`flex items-center justify-center p-2 border rounded-lg transition-colors ${!isTimeValid ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed' : photoPreview[p.id] ? 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-inner cursor-pointer' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-orange-600 cursor-pointer'}`} 
                            title={photoPreview[p.id] ? "Photo Attached!" : "Attach Photo"}
                         >
                            {photoPreview[p.id] ? <Check size={20}/> : <Camera size={20}/>}
                            <input 
                              type="file" 
                              accept="image/*" 
                              capture="environment" 
                              className="hidden" 
                              disabled={!isTimeValid}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setPhotoPreview(prev => ({...prev, [p.id]: true}));
                                  setAttachedPhotos(prev => ({...prev, [p.id]: file.name}));
                                }
                              }}
                            />
                         </label>
                       </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 md:p-5 bg-orange-50 rounded-xl border border-orange-200 mt-8">
                   <label className="font-black text-orange-900 block mb-2 text-base md:text-lg">Overall Remarks / Corrective Actions</label>
                   <p className="text-xs text-orange-700 mb-3 font-medium">Add general observations or details regarding failed parameters.</p>
                   <textarea 
                      name="remarks"
                      disabled={!isTimeValid}
                      className="w-full p-3 md:p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white disabled:bg-slate-100 disabled:text-slate-400" 
                      rows="4" 
                      placeholder="Type your remarks here..."
                   ></textarea>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
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

          {/* REPORT ACCIDENT TAB */}
          {activeTab === 'report-accident' && (
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-red-200 max-w-3xl mx-auto">
              <div className="border-b border-slate-200 pb-6 mb-6">
                 <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><AlertTriangle className="text-red-600"/> Report an Accident / Incident</h2>
                 <p className="text-sm font-medium text-slate-500 mt-1">Please fill out the details immediately following an incident.</p>
              </div>
              <form onSubmit={handleAccidentSubmit} className="space-y-6">
                 <div>
                   <label className="block font-bold text-slate-700 mb-2">1. Date & Time of Accident</label>
                   <input type="datetime-local" name="accDate" className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" required/>
                 </div>
                 <div>
                   <label className="block font-bold text-slate-700 mb-2">2. Injured Person Involved</label>
                   <p className="text-xs text-slate-500 mb-2">Please include name, role, and days of MC (Medical Certificate) if applicable. Type &quot;None&quot; if no injuries.</p>
                   <input type="text" name="accInjured" placeholder="E.g. Ali bin Abu (Technician) - 3 Days MC" className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" required/>
                 </div>
                 <div>
                   <label className="block font-bold text-slate-700 mb-2">3. Property or Equipment Damage</label>
                   <input type="text" name="accDamage" placeholder="E.g. Forklift bent, shelving unit collapsed..." className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" required/>
                 </div>
                 <div>
                   <label className="block font-bold text-slate-700 mb-2">4. Full Accident Details</label>
                   <textarea name="accDetails" rows="5" placeholder="Describe exactly how the incident occurred..." className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" required></textarea>
                 </div>
                 <div className="pt-4 flex gap-4">
                    <button type="button" onClick={() => setActiveTab('dashboard')} className="w-1/3 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300">Cancel</button>
                    <button type="submit" className="w-2/3 bg-red-600 text-white py-3 rounded-xl font-black text-lg hover:bg-red-700 shadow-lg shadow-red-600/30">Submit Accident Report</button>
                 </div>
              </form>
            </div>
          )}

          {/* ADMIN ANALYTICS TAB */}
          {activeTab === 'admin-analytics' && (
            <div className="max-w-7xl mx-auto space-y-8 pb-10">
              <h2 className="text-2xl font-black text-slate-900">Analytics & Performance</h2>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                    <BarChart3 className="text-orange-600"/> Monthly Inspections Conducted
                  </h3>
                  <div className="flex-1 flex items-end justify-between gap-2 h-64 mt-4 pt-4 border-t border-slate-100 relative">
                    <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs font-bold text-slate-400">
                      <span>{maxMonthlyScale}</span>
                      <span>{Math.round(maxMonthlyScale / 2)}</span>
                      <span>0</span>
                    </div>
                    <div className="pl-8 flex w-full justify-between items-end h-full">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                        const count = allMonthlyCounts[idx];
                        const heightPct = count > 0 ? (count / maxMonthlyScale) * 100 : 0;
                        const isActiveMonth = idx === new Date().getMonth();
                        return (
                          <div key={month} className="flex flex-col items-center gap-2 group flex-1">
                            <div className="w-full relative flex justify-center items-end h-48 bg-slate-50 rounded-t-md">
                              <div className={`w-full max-w-[40px] rounded-t-md transition-all duration-500 ${isActiveMonth ? 'bg-orange-500' : 'bg-slate-300 group-hover:bg-orange-400'}`} style={{ height: `${heightPct}%` }}>
                                {count > 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black text-slate-700">{count}</span>}
                              </div>
                            </div>
                            <span className={`text-xs font-bold ${isActiveMonth ? 'text-orange-600' : 'text-slate-500'}`}>{month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                    <BarChart3 className="text-orange-600"/> Monthly Zone Compliance (Avg %)
                  </h3>
                  <div className="flex-1 flex items-end justify-between gap-2 h-64 mt-4 pt-4 border-t border-slate-100 relative">
                    <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs font-bold text-slate-400">
                      <span>{maxCompScale}%</span>
                      <span>{Math.round(maxCompScale / 2)}%</span>
                      <span>0%</span>
                    </div>
                    <div className="pl-10 flex w-full justify-between items-end h-full">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                         const compliance = allMonthlyCompliances[idx];
                         const heightPct = compliance > 0 ? (compliance / maxCompScale) * 100 : 0;
                         const colorClass = compliance >= 80 ? 'bg-emerald-500' : compliance >= 50 ? 'bg-amber-400' : compliance > 0 ? 'bg-red-500' : 'bg-slate-200';
                         const isActiveMonth = idx === new Date().getMonth();
                         return (
                           <div key={month} className="flex flex-col items-center gap-2 group flex-1">
                             <div className="w-full relative flex justify-center items-end h-48 bg-slate-50 rounded-t-md">
                               <div className={`w-full max-w-[40px] rounded-t-md transition-all duration-500 ${compliance > 0 ? colorClass : 'bg-transparent'} ${isActiveMonth && compliance===0 ? 'border-b-4 border-orange-500' : ''}`} style={{ height: `${heightPct}%` }}>
                                 {compliance > 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black text-slate-700">{compliance}%</span>}
                               </div>
                             </div>
                             <span className={`text-xs font-bold ${isActiveMonth ? 'text-orange-600' : 'text-slate-500'}`}>{month}</span>
                           </div>
                         );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Overall Compliance by Zone (All Time) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <BarChart3 className="text-orange-600"/> Overall Compliance by Zone (All Time)
                  </h3>
                  <button onClick={exportComplianceReport} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
                    <Download size={16}/> Export Report
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {initialZones.map((zone, idx) => {
                    const score = zonePerformanceData[idx];
                    const hasData = (typeof inspections !== 'undefined' ? inspections : []).some(i => i.zone === zone);
                    const color = score >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : score >= 50 ? 'text-amber-600 bg-amber-50 border-amber-200' : hasData ? 'text-red-600 bg-red-50 border-red-200' : 'text-slate-500 bg-slate-50 border-slate-200';
                    return (
                      <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between h-full ${color}`}>
                        <h4 className="font-bold text-sm mb-4 leading-snug">{zone}</h4>
                        <div className="flex items-end justify-between">
                          <span className="text-3xl font-black">{hasData ? `${score}%` : 'N/A'}</span>
                          <span className="text-xs font-bold uppercase opacity-70">Compliance</span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-2 mt-3 overflow-hidden">
                          <div className="bg-current h-full rounded-full transition-all duration-700" style={{ width: `${hasData ? score : 0}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><Users className="text-orange-600"/> Personnel Daily Progress</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                      <tr><th className="p-4 rounded-tl-xl">Inspector</th><th className="p-4">Assigned Zones</th><th className="p-4">Target Freq.</th><th className="p-4">Today&apos;s Progress</th><th className="p-4 rounded-tr-xl">Status</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {personnel.filter(p => p.role === 'Inspector').map(p => {
                        const isOffDay = checkIsOffDay(p);
                        return (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-800">{p.name}</td>
                          <td className="p-4 text-slate-600"><div className="flex flex-wrap gap-1">{p.zones.map(z => <span key={z} className="bg-slate-100 px-2 py-1 rounded text-xs">{z.split('–')[0]}</span>)}</div></td>
                          <td className="p-4 font-medium">{p.freq}</td>
                          <td className="p-4">
                            {isOffDay ? (
                               <span className="text-xs font-bold text-slate-400 italic">No target (Off Day)</span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px]"><div className="bg-orange-500 h-2.5 rounded-full" style={{width: '0%'}}></div></div>
                                <span className="text-xs font-bold text-slate-500">0/{p.freq.charAt(0) || 1}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                             {isOffDay ? (
                                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg">Excused</span>
                             ) : (
                                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg">Pending</span>
                             )}
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inspection History Log Table */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><ClipboardList className="text-orange-600"/> Inspection History Log</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                      <tr><th className="p-4 rounded-tl-xl">Date & Time</th><th className="p-4">Zone</th><th className="p-4">Inspector</th><th className="p-4">Score</th><th className="p-4 rounded-tr-xl">Remarks</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inspections.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-400 font-medium">No inspections recorded yet.</td></tr>
                      ) : (
                        inspections.slice().sort((a,b) => new Date(b.date) - new Date(a.date)).map(insp => {
                          let pass = 0; let total = 0;
                          Object.values(insp.results || {}).forEach(val => {
                            if (!val) return;
                            const v = String(val).toLowerCase();
                            if (v === "memuaskan" || v === "pass" || v.includes("🟢")) { pass++; total++; }
                            if (v === "tidak memuaskan" || v === "fail" || v.includes("🔴")) { total++; }
                          });
                          const pct = total > 0 ? Math.round((pass/total)*100) : 0;
                          return (
                            <tr key={insp.id} className="hover:bg-slate-50/50">
                              <td className="p-4 font-bold text-slate-800">{new Date(insp.date).toLocaleString()}</td>
                              <td className="p-4 text-slate-600 font-medium">{insp.zone}</td>
                              <td className="p-4 font-bold text-slate-700">{insp.inspector}</td>
                              <td className="p-4"><span className={`px-2 py-1 rounded-lg text-xs font-bold ${pct >= 80 ? 'bg-emerald-100 text-emerald-700' : pct >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{pct}% ({pass}/{total})</span></td>
                              <td className="p-4 text-slate-600 max-w-xs truncate" title={insp.remarks}>{insp.remarks || 'No remarks'}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Accident Records Table */}
              <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><AlertTriangle className="text-red-600"/> Accident / Incident Records</h3>
                  <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"><Download size={16}/> Export Excel</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-red-50 text-red-700 uppercase text-xs font-black">
                      <tr><th className="p-4 rounded-tl-xl">Date Reported</th><th className="p-4">Reported By</th><th className="p-4">Injured / MC</th><th className="p-4">Damage</th><th className="p-4 rounded-tr-xl">Details</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {accidents.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-400 font-medium">No accidents reported.</td></tr>
                      ) : (
                        accidents.map(acc => (
                          <tr key={acc.id} className="hover:bg-red-50/30">
                            <td className="p-4 font-bold text-slate-800">{new Date(acc.date).toLocaleString()}</td>
                            <td className="p-4 text-slate-600 font-medium">{acc.reportedBy}</td>
                            <td className="p-4 text-red-600 font-bold">{acc.injured}</td>
                            <td className="p-4 text-slate-600">{acc.damage}</td>
                            <td className="p-4 text-slate-600 max-w-xs truncate" title={acc.details}>{acc.details}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN SETTINGS TAB */}
          {activeTab === 'admin-settings' && (
            <div className="max-w-7xl mx-auto space-y-8 pb-10">
              <h2 className="text-2xl font-black text-slate-900">System Settings</h2>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800"><Users className="text-orange-600"/> Personnel Management</h3>
                
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-8">
                  <h4 className="font-bold text-sm mb-4 text-slate-700 uppercase">Register New Personnel</h4>
                  <form onSubmit={addPersonnel} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div><label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label><input name="name" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" required /></div>
                      <div>
                         <label className="block text-xs font-bold text-slate-500 mb-1">Role</label>
                         <select name="role" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                            <option value="Inspector">Inspector</option>
                            <option value="Admin Level 2">Admin Level 2</option>
                            <option value="Admin Level 1">Admin Level 1</option>
                         </select>
                      </div>
                      <div><label className="block text-xs font-bold text-slate-500 mb-1">Daily Frequency</label><input name="freq" placeholder="E.g. 2 times/day" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" required /></div>
                      <div><label className="block text-xs font-bold text-slate-500 mb-1">Initial Password</label><input name="password" type="text" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" required /></div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                           <label className="block text-xs font-bold text-slate-500">Inspection Time Windows</label>
                           <button type="button" onClick={() => setNewUserWindows([...newUserWindows, {start:"08:00", end:"17:00"}])} className="text-xs font-bold text-orange-600 flex items-center gap-1"><Plus size={14}/> Add Window</button>
                        </div>
                        <div className="space-y-2">
                           {newUserWindows.map((w, i) => (
                             <div key={i} className="flex items-center gap-2">
                                <input type="time" value={w.start} onChange={(e) => { const newW = [...newUserWindows]; newW[i].start = e.target.value; setNewUserWindows(newW); }} className="p-2 border rounded text-sm flex-1"/>
                                <span className="text-slate-400 font-bold">to</span>
                                <input type="time" value={w.end} onChange={(e) => { const newW = [...newUserWindows]; newW[i].end = e.target.value; setNewUserWindows(newW); }} className="p-2 border rounded text-sm flex-1"/>
                                {newUserWindows.length > 1 && <button type="button" onClick={() => setNewUserWindows(newUserWindows.filter((_, idx) => idx !== i))} className="text-red-500 p-1"><X size={16}/></button>}
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <label className="block text-xs font-bold text-slate-500 mb-2">Select Off Days</label>
                        <div className="flex flex-wrap gap-2">
                          {daysOfWeek.map(day => (
                            <label key={day} className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-colors ${newUserOffDays.includes(day) ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                              <input type="checkbox" className="hidden" checked={newUserOffDays.includes(day)} onChange={(e) => {
                                if(e.target.checked) setNewUserOffDays([...newUserOffDays, day]);
                                else setNewUserOffDays(newUserOffDays.filter(d => d !== day));
                              }}/>
                              {day.slice(0,3)}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">Assign Zones (Only required for Inspectors)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white p-4 rounded-lg border border-slate-200">
                         {initialZones.map((z, idx) => (
                           <label key={idx} className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                             <input type="checkbox" name="zone" value={z} className="mt-1 text-orange-600 focus:ring-orange-500 rounded" />
                             <span className="leading-tight">{z}</span>
                           </label>
                         ))}
                      </div>
                    </div>
                    <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors flex items-center gap-2"><UserPlus size={16}/> Add Personnel</button>
                  </form>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                      <tr><th className="p-4 rounded-tl-xl">Name</th><th className="p-4">Role</th><th className="p-4">Time Windows & Off Days</th><th className="p-4">Zones</th><th className="p-4 rounded-tr-xl text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {personnel.map(p => (
                      <React.Fragment key={p.id}>
                        <tr className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-800">{p.name}</td>
                          <td className="p-4"><span className={`px-2 py-1 rounded-lg text-xs font-bold ${p.role.includes('Admin') ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>{p.role}</span></td>
                          <td className="p-4">
                             <div className="flex flex-col gap-1 text-xs">
                               <div className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block w-max">
                                  {p.timeWindows?.map(w => `${w.start}-${w.end}`).join(', ') || 'N/A'}
                               </div>
                               <div className="text-red-600 font-bold">
                                  Off: {p.offDays?.length > 0 ? p.offDays.map(d=>d.slice(0,3)).join(', ') : 'None'}
                               </div>
                             </div>
                          </td>
                          <td className="p-4 text-xs text-slate-600 max-w-xs truncate">{p.zones.join(', ')}</td>
                          <td className="p-4 text-right">
                             <div className="flex justify-end gap-2">
                               <button onClick={() => { setEditingUserId(p.id); setEditUserForm(JSON.parse(JSON.stringify(p))); setPasswordEditId(null); }} title="Edit Schedule" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16}/></button>
                               <button onClick={() => { setPasswordEditId(p.id); setEditingUserId(null); setNewPasswordValue(""); }} title="Reset Password" className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"><Key size={16}/></button>
                               <button onClick={() => deleteUser(p.id)} title="Delete User" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                             </div>
                          </td>
                        </tr>

                        {passwordEditId === p.id && (
                          <tr className="bg-orange-50/50 border-b border-orange-100">
                             <td colSpan="5" className="p-4">
                                <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <h4 className="font-bold text-orange-800 flex items-center gap-2"><Key size={16}/> New Password for {p.name}:</h4>
                                    <input type="text" value={newPasswordValue} onChange={(e) => setNewPasswordValue(e.target.value)} placeholder="Type new password" className="border border-slate-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                     <button onClick={() => setPasswordEditId(null)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-300">Cancel</button>
                                     <button onClick={() => saveEditedPassword(p.id)} className="px-4 py-2 bg-orange-600 text-white font-bold text-sm rounded-lg hover:bg-orange-700 flex items-center gap-1"><Save size={16}/> Update Password</button>
                                  </div>
                                </div>
                             </td>
                          </tr>
                        )}

                        {editingUserId === p.id && (
                          <tr className="bg-blue-50/50 border-b border-blue-100">
                             <td colSpan="5" className="p-4">
                                <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
                                  <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Edit2 size={16}/> Editing Schedule: {p.name}</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                     <div>
                                        <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-600">Time Windows</label><button onClick={() => setEditUserForm({...editUserForm, timeWindows: [...editUserForm.timeWindows, {start:"08:00", end:"17:00"}]})} className="text-xs text-blue-600 font-bold">+ Add</button></div>
                                        <div className="space-y-2">
                                          {editUserForm.timeWindows.map((w, idx) => (
                                            <div key={idx} className="flex gap-2">
                                               <input type="time" value={w.start} onChange={(e) => { const nw = [...editUserForm.timeWindows]; nw[idx].start = e.target.value; setEditUserForm({...editUserForm, timeWindows: nw})}} className="border p-1 text-sm rounded flex-1"/>
                                               <input type="time" value={w.end} onChange={(e) => { const nw = [...editUserForm.timeWindows]; nw[idx].end = e.target.value; setEditUserForm({...editUserForm, timeWindows: nw})}} className="border p-1 text-sm rounded flex-1"/>
                                               {editUserForm.timeWindows.length > 1 && <button onClick={() => setEditUserForm({...editUserForm, timeWindows: editUserForm.timeWindows.filter((_,i)=>i!==idx)})} className="text-red-500 px-2"><X size={14}/></button>}
                                            </div>
                                          ))}
                                        </div>
                                     </div>
                                     <div>
                                        <label className="text-xs font-bold text-slate-600 mb-2 block">Off Days</label>
                                        <div className="flex flex-wrap gap-1">
                                          {daysOfWeek.map(day => (
                                            <label key={day} className={`px-2 py-1 rounded text-xs font-bold border cursor-pointer ${editUserForm.offDays.includes(day) ? 'bg-red-100 text-red-700 border-red-200' : 'bg-slate-50 text-slate-500'}`}>
                                              <input type="checkbox" className="hidden" checked={editUserForm.offDays.includes(day)} onChange={(e) => {
                                                const noff = e.target.checked ? [...editUserForm.offDays, day] : editUserForm.offDays.filter(d=>d!==day);
                                                setEditUserForm({...editUserForm, offDays: noff});
                                              }}/>
                                              {day.slice(0,3)}
                                            </label>
                                          ))}
                                        </div>
                                     </div>
                                  </div>
                                  <div className="flex justify-end gap-2">
                                     <button onClick={() => setEditingUserId(null)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-300">Cancel</button>
                                     <button onClick={saveEditedUser} className="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg flex items-center gap-1 hover:bg-blue-700"><Save size={16}/> Save Changes</button>
                                  </div>
                                </div>
                             </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="text-center p-4 text-xs text-slate-400 font-medium border-t border-slate-200 mt-auto">
            &copy; 2026 KLSMHSE &bull; Developed by ThadYap
          </div>
        </div>
      </main>
    </div>
  );
}