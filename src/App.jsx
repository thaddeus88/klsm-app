import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, onSnapshot } from "firebase/firestore";

// Firebase Configuration embedded directly for single-file compilation
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
  { id: 1, name: "John Doe", role: "Inspector", zones: ["Zone 1 – Laboratory, CPO Despatch, Oil Storage Tank & FFB Grading", "Zone 2 – Workshop"], freq: "2", password: "1234", offDays: ["Sunday"] },
  { id: 2, name: "Admin Jane", role: "Level 1 Admin", zones: ["All"], freq: "N/A", password: "1234", offDays: [] },
  { id: 3, name: "Manager Bob", role: "Level 2 Admin", zones: ["All"], freq: "N/A", password: "1234", offDays: [] }
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

// Re-built to guarantee it waits for images to load properly
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
        // Compress to 50% quality JPEG
        resolve(canvas.toDataURL('image/jpeg', 0.5));
      };
      img.onerror = () => resolve(null); // Return null safely if error
      img.src = event.target.result; // Setting src AFTER onload is bound prevents hanging!
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
  
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [toastMsg, setToastMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New Loading State
  
  const [editingItem, setEditingItem] = useState({ id: null, subId: null, text: '' });
  const [editingOffDaysId, setEditingOffDaysId] = useState(null);
  const [tempOffDays, setTempOffDays] = useState([]);
  
  // Dedicated state variables for bulletproof photo uploads
  const [attachedPhotos, setAttachedPhotos] = useState({});
  const [photoPreview, setPhotoPreview] = useState({});

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
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

    return () => { unsubParams(); unsubPersonnel(); unsubInspections(); unsubAccidents(); };
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

  const addPersonnel = async (e) => {
    e.preventDefault();
    const checkedZones = Array.from(e.target.querySelectorAll('input[name="zone"]:checked')).map(cb => cb.value);
    const checkedOffDays = Array.from(e.target.querySelectorAll('input[name="offDays"]:checked')).map(cb => cb.value);
    const newPerson = {
      id: Date.now(),
      name: e.target.name.value,
      role: e.target.role.value,
      zones: e.target.role.value.includes('Admin') ? ['All'] : checkedZones,
      freq: e.target.freq.value,
      password: e.target.password.value,
      offDays: checkedOffDays
    };
    
    const updatedPersonnel = [...personnel, newPerson];
    setPersonnel(updatedPersonnel);
    await setDoc(doc(db, "settings", "personnel"), { personnelList: updatedPersonnel });
    e.target.reset();
    showToast("New personnel added to cloud.");
  };

  const editPassword = async (userId) => {
    const newPass = prompt("Enter new password for this user:");
    if (newPass && newPass.trim() !== "") {
      const updatedPersonnel = personnel.map(p => p.id === userId ? { ...p, password: newPass } : p);
      setPersonnel(updatedPersonnel);
      await setDoc(doc(db, "settings", "personnel"), { personnelList: updatedPersonnel });
      showToast("Password updated successfully.");
    }
  };

  const deleteUser = async (userId) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      const updatedPersonnel = personnel.filter(u => u.id !== userId);
      setPersonnel(updatedPersonnel);
      await setDoc(doc(db, "settings", "personnel"), { personnelList: updatedPersonnel });
      showToast("Personnel deleted.");
    }
  };

  const saveOffDays = async (userId) => {
    const updatedPersonnel = personnel.map(p => p.id === userId ? { ...p, offDays: tempOffDays } : p);
    setPersonnel(updatedPersonnel);
    await setDoc(doc(db, "settings", "personnel"), { personnelList: updatedPersonnel });
    setEditingOffDaysId(null);
    showToast("Off days updated successfully.");
  };

  const addMainParam = async (e) => {
    e.preventDefault();
    const text = e.target.newMainParam.value.trim();
    if (!text) return;
    const newParam = { id: Date.now(), name: text, subParams: [] };
    const updatedParams = [...params, newParam];
    setParams(updatedParams);
    await setDoc(doc(db, "settings", "parameters"), { paramsList: updatedParams });
    e.target.reset();
    showToast("New parameter category added.");
  };

  const deleteMainParam = async (paramId) => {
    if(window.confirm("Delete this entire category and all its items?")) {
      const updatedParams = params.filter(p => p.id !== paramId);
      setParams(updatedParams);
      await setDoc(doc(db, "settings", "parameters"), { paramsList: updatedParams });
      showToast("Parameter category removed.");
    }
  };

  const addSubParam = async (e, paramId) => {
    e.preventDefault();
    const text = e.target.subParamText.value.trim();
    if (!text) return;
    const updatedParams = params.map(p => p.id === paramId ? { ...p, subParams: [...p.subParams, { id: Date.now(), text }] } : p);
    setParams(updatedParams);
    await setDoc(doc(db, "settings", "parameters"), { paramsList: updatedParams });
    e.target.reset();
  };

  const removeSubParam = async (paramId, subParamId) => {
    if(window.confirm("Remove this checklist item?")) {
      const updatedParams = params.map(p => p.id === paramId ? { ...p, subParams: p.subParams.filter(sp => sp.id !== subParamId) } : p);
      setParams(updatedParams);
      await setDoc(doc(db, "settings", "parameters"), { paramsList: updatedParams });
    }
  };

  const saveEdit = async () => {
    if (!editingItem.text.trim()) { setEditingItem({ id: null, subId: null, text: '' }); return; }
    let updatedParams;
    if (editingItem.subId === null) {
      updatedParams = params.map(p => p.id === editingItem.id ? { ...p, name: editingItem.text } : p);
    } else {
      updatedParams = params.map(p => {
        if (p.id === editingItem.id) return { ...p, subParams: p.subParams.map(sp => sp.id === editingItem.subId ? { ...sp, text: editingItem.text } : sp) };
        return p;
      });
    }
    setParams(updatedParams);
    await setDoc(doc(db, "settings", "parameters"), { paramsList: updatedParams });
    setEditingItem({ id: null, subId: null, text: '' });
    showToast("Parameter updated successfully.");
  };

  const handleInspectionSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    showToast('⏳ Processing photos and submitting...');
    
    const formData = new FormData(e.target);
    const results = {};
    const finalPhotos = {};
    
    // 1. Process all photos locked safely in our component state
    for (const [itemKey, file] of Object.entries(attachedPhotos)) {
      if (file) {
        try {
          const base64Data = await compressImage(file);
          if (base64Data) {
            finalPhotos[itemKey] = base64Data; // Securely attach compressed image to payload
          }
        } catch (err) {
          console.error("Photo compression error", err);
        }
      }
    }

    // 2. Process all text results from the form
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('res-')) {
        const questionName = key.replace('res-', '');
        results[questionName] = value;
      }
    }

    const inspectionData = {
      zone: selectedZone,
      inspectorName: currentUser.name,
      date: new Date().toISOString(),
      remarks: formData.get('remarks') || "None",
      results: results,
      photos: finalPhotos
    };

    try {
      await addDoc(collection(db, "inspections"), inspectionData);
      showToast('✅ Inspection Submitted Successfully!');
      setPhotoPreview({}); 
      setAttachedPhotos({});
      setIsSubmitting(false);
      setActiveTab('dashboard');
    } catch (error) {
      console.error("Error adding document: ", error);
      showToast('❌ Error submitting inspection.');
      setIsSubmitting(false);
    }
  };

  const handleAccidentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const accidentData = {
      accidentDate: formData.get('accidentDate'),
      injuredPerson: formData.get('injuredPerson') || "None",
      damage: formData.get('damage') || "None",
      details: formData.get('details'),
      reportedBy: currentUser.name,
      reportedAt: new Date().toISOString()
    };
    try {
      await addDoc(collection(db, "accidents"), accidentData);
      showToast('🚨 Accident Report Submitted Successfully!');
      setActiveTab('dashboard');
    } catch (error) {
      showToast('❌ Error submitting report.');
    }
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
  const maxCount = Math.max(...monthlyCounts, 1);
  const monthlyComp = monthlyCompData.map(d => d.count > 0 ? Math.round(d.sum / d.count) : 0);

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
          {/* SIDEBAR */}
          <aside className="w-full md:w-64 bg-slate-900 text-white p-4 md:p-6 flex flex-row md:flex-col justify-between md:justify-start border-r border-slate-800 shadow-xl z-10 overflow-x-auto md:overflow-visible sticky top-0 md:h-screen print:hidden">
            <div className="flex items-center gap-2 mb-0 md:mb-8 mr-6 md:mr-0 shrink-0">
              <ShieldAlert size={24} className="text-orange-500"/> 
              <h1 className="text-lg md:text-xl font-black text-orange-500 tracking-tight hidden md:block">KLSM Hub</h1>
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

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 w-full print:p-0 print:bg-white">
            <div className="flex-1 p-4 md:p-8 print:p-0">
              
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-xl md:text-2xl font-black mb-6 text-slate-900">Your Assigned Zones</h2>
                  {displayedZones.length === 0 ? (
                     <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">You currently have no zones assigned to you.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {displayedZones.map((zone, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                          <h3 className="font-bold mb-6 text-slate-800 leading-snug text-sm md:text-base">{zone}</h3>
                          <button onClick={() => { setSelectedZone(zone); setActiveTab('inspection-form'); }} className="bg-slate-900 text-white w-full py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                            <ClipboardList size={18}/> Start Inspection
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
                       <div className="flex items-end gap-1 md:gap-3 h-48 pt-4 border-b border-slate-200 mt-6">
                         {monthlyCounts.map((count, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center justify-end group">
                               <span className="text-xs font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{count}</span>
                               <div className="w-full bg-orange-500 rounded-t-md transition-all duration-300 group-hover:bg-orange-600" style={{ height: `${(count / maxCount) * 100}%`, minHeight: count > 0 ? '4px' : '0px' }}></div>
                            </div>
                         ))}
                       </div>
                       <div className="flex gap-1 md:gap-3 mt-2">
                         {months.map(m => <div key={m} className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-bold">{m}</div>)}
                       </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                       <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2"><Activity className="text-orange-600"/> Average Zone Compliance ({currentYear})</h3>
                       <div className="flex items-end gap-1 md:gap-3 h-48 pt-4 border-b border-slate-200 mt-6">
                         {monthlyComp.map((avg, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center justify-end group relative">
                               <span className="text-xs font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">{avg}%</span>
                               <div className={`w-full rounded-t-md transition-all duration-300 ${avg >= 90 ? 'bg-emerald-500 group-hover:bg-emerald-600' : (avg >= 70 ? 'bg-amber-500 group-hover:bg-amber-600' : 'bg-red-500 group-hover:bg-red-600')}`} style={{ height: `${avg}%`, minHeight: avg > 0 ? '4px' : '0px' }}></div>
                            </div>
                         ))}
                       </div>
                       <div className="flex gap-1 md:gap-3 mt-2">
                         {months.map(m => <div key={m} className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-bold">{m}</div>)}
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

                  {/* PERSONNEL DAILY PROGRESS */}
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:p-0">
                    <h3 className="font-bold text-base md:text-lg mb-4 text-slate-800 flex items-center gap-2"><BarChart3 className="text-orange-600 print:text-black"/> Personnel Daily Progress</h3>
                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black print:bg-white print:text-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Inspector</th><th className="p-3 md:p-4">Target Freq.</th><th className="p-3 md:p-4">Completed Today</th><th className="p-3 md:p-4 rounded-tr-xl">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                          {personnel.filter(p => p.role === 'Inspector').map(p => {
                            const target = parseInt(p.freq) || 0;
                            const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                            const isOffDay = p.offDays && p.offDays.includes(todayName);
                            const actualTarget = isOffDay ? 0 : target;
                            const today = new Date().toLocaleDateString();
                            const completedToday = inspections.filter(i => i.inspectorName === p.name && new Date(i.date).toLocaleDateString() === today).length;
                            const percentage = actualTarget > 0 ? Math.min((completedToday / actualTarget) * 100, 100) : 100;
                            return (
                              <tr key={p.id} className="hover:bg-slate-50/50">
                                <td className="p-3 md:p-4 font-bold text-slate-800">{p.name}</td>
                                <td className="p-3 md:p-4 font-medium">{isOffDay ? <span className="text-slate-400 italic">Off Day</span> : `${p.freq} times`}</td>
                                <td className="p-3 md:p-4">
                                  {isOffDay ? <span className="text-slate-400 italic text-sm font-medium">No inspection required</span> : (
                                    <div className="flex items-center gap-2">
                                      <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px] print:hidden"><div className="bg-orange-500 h-2.5 rounded-full" style={{width: `${percentage}%`}}></div></div>
                                      <span className="text-xs font-bold text-slate-500 print:text-black">{completedToday}/{target}</span>
                                    </div>
                                  )}
                                </td>
                                <td className="p-3 md:p-4">
                                  {isOffDay ? <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg">Off Day</span> : (percentage >= 100 ? <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg">Complete</span> : <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg">In Progress</span>)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

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
                    <h3 className="font-bold text-base md:text-lg mb-2 text-slate-800 flex items-center gap-2"><ClipboardList className="text-orange-600"/> All Historical Records</h3>
                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Date & Time</th><th className="p-3 md:p-4">Zone</th><th className="p-3 md:p-4">Inspector</th><th className="p-3 md:p-4 rounded-tr-xl">Action</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {inspections.sort((a,b) => new Date(b.date) - new Date(a.date)).map(insp => (
                            <tr key={insp.id} className="hover:bg-slate-50/50">
                              <td className="p-3 md:p-4 font-medium text-slate-700">{new Date(insp.date).toLocaleString()}</td>
                              <td className="p-3 md:p-4 text-slate-800 font-bold">{insp.zone}</td>
                              <td className="p-3 md:p-4 text-slate-600">{insp.inspectorName}</td>
                              <td className="p-3 md:p-4"><button onClick={() => { setSelectedReport(insp); setActiveTab('view-report'); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-100 text-orange-700 hover:bg-orange-200"><Eye size={14}/> View</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                          
                          // Correctly mapping exact keys
                          const photoData = selectedReport.photos && selectedReport.photos[item];

                          return (
                            <tr key={idx} className="print:break-inside-avoid">
                              <td className="p-3 md:p-4 text-slate-800 font-medium print:text-black">
                                {item}
                                {/* If a photo exists for this item, display it! */}
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
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2">Assign Zones (Ignored for Admins)</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 bg-white p-4 rounded-lg border border-slate-200 h-48 overflow-y-auto">
                             {initialZones.map((z, idx) => (<label key={idx} className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer"><input type="checkbox" name="zone" value={z} className="mt-1 text-orange-600 focus:ring-orange-500 rounded" /><span className="leading-tight">{z}</span></label>))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2">Select Off Days</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white p-4 rounded-lg border border-slate-200">
                             {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, idx) => (<label key={idx} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"><input type="checkbox" name="offDays" value={day} className="text-orange-600 focus:ring-orange-500 rounded" /><span className="leading-tight">{day}</span></label>))}
                          </div>
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600"><UserPlus size={16}/> Add Personnel</button>
                      </form>
                    </div>

                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                          <tr><th className="p-3 md:p-4 rounded-tl-xl">Name</th><th className="p-3 md:p-4">Role</th><th className="p-3 md:p-4">Assigned Zones</th><th className="p-3 md:p-4">Freq.</th><th className="p-3 md:p-4">Off Days</th><th className="p-3 md:p-4 rounded-tr-xl text-right">Actions</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {personnel.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="p-3 md:p-4 font-bold text-slate-800">{p.name}</td>
                            <td className="p-3 md:p-4"><span className={`px-2 py-1 rounded-lg text-xs font-bold ${p.role.includes('Admin') ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>{p.role}</span></td>
                            <td className="p-3 md:p-4 text-xs text-slate-600 max-w-[200px] truncate">{p.zones.join(', ')}</td>
                            <td className="p-3 md:p-4 font-medium">{p.freq}</td>
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
                            <td className="p-3 md:p-4 text-right">
                               <div className="flex justify-end gap-2">
                                 <button onClick={() => editPassword(p.id)} className="p-2 text-slate-400 hover:text-orange-600 rounded-lg"><Key size={16}/></button>
                                 <button onClick={() => deleteUser(p.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16}/></button>
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

              {/* INSPECTION FORM TAB */}
              {activeTab === 'inspection-form' && (
                <div className="bg-white p-4 md:p-10 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
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
                                     <select name={`res-${itemKey}`} className="flex-1 sm:w-48 p-2 border border-slate-300 rounded-lg font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 outline-none" defaultValue="" required>
                                        <option value="" disabled>Pilih Status...</option>
                                        <option value="Memuaskan">🟢 Memuaskan</option>
                                        <option value="Tidak Memuaskan">🔴 Tidak Memuaskan</option>
                                        <option value="N/A">⚪ N/A</option>
                                     </select>
                                     
                                     {/* BULLETPROOF PHOTO UPLOAD BUTTON */}
                                     <label 
                                        className={`flex items-center justify-center p-2 border rounded-lg transition-colors cursor-pointer ${photoPreview[itemKey] ? 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-inner' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-orange-600'}`} 
                                        title={photoPreview[itemKey] ? "Photo Attached!" : "Attach Photo"}
                                     >
                                        {photoPreview[itemKey] ? <Check size={20}/> : <Camera size={20}/>}
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          capture="environment" 
                                          className="hidden" 
                                          onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                              const file = e.target.files[0];
                                              // Save directly into reliable React state
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
                          className="w-full p-3 md:p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white print:border-black" 
                          rows="4" 
                          placeholder="Type your remarks here..."
                       ></textarea>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-3 md:gap-4 print:hidden">
                       <button type="button" onClick={() => { setActiveTab('dashboard'); setPhotoPreview({}); setAttachedPhotos({}); setIsSubmitting(false); }} className="w-full sm:w-1/3 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition-colors">Cancel</button>
                       <button type="submit" disabled={isSubmitting} className={`w-full sm:w-2/3 py-3 rounded-xl font-black text-base md:text-lg shadow-lg transition-all ${isSubmitting ? 'bg-orange-400 text-orange-100 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/30'}`}>
                         {isSubmitting ? '⏳ Processing...' : 'Submit Final Inspection'}
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