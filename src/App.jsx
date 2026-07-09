import React, { useState } from 'react';

// We use built-in SVGs now so you don't need any external icon libraries!
const IconWrapper = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
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
  { id: 1, name: "John Doe", role: "Inspector", zones: ["Zone 1 – Laboratory, CPO Despatch, Oil Storage Tank & FFB Grading", "Zone 2 – Workshop"], freq: "2 times/day", password: "1234" },
  { id: 2, name: "Admin Jane", role: "Admin", zones: ["All"], freq: "N/A", password: "1234" }
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

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [params, setParams] = useState(initialParameters);
  const [personnel, setPersonnel] = useState(initialUsers);
  const [selectedZone, setSelectedZone] = useState(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const userId = parseInt(e.target.userSelect.value);
    const password = e.target.password.value;
    
    const user = personnel.find(u => u.id === userId);
    if (user && user.password === password) {
      setCurrentUser(user);
      setActiveTab('dashboard');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const addPersonnel = (e) => {
    e.preventDefault();
    const checkedZones = Array.from(e.target.zone)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    const newPerson = {
      id: Date.now(),
      name: e.target.name.value,
      role: e.target.role.value,
      zones: e.target.role.value === 'Admin' ? ['All'] : checkedZones,
      freq: e.target.freq.value,
      password: e.target.password.value
    };
    setPersonnel([...personnel, newPerson]);
    e.target.reset();
  };

  const resetPassword = (userId) => {
    const newPass = prompt("Enter new password for this user:");
    if (newPass) {
      setPersonnel(personnel.map(p => p.id === userId ? { ...p, password: newPass } : p));
      alert("Password updated successfully.");
    }
  };

  const displayedZones = currentUser?.role === 'Admin' 
    ? initialZones 
    : initialZones.filter(z => currentUser?.zones.includes(z));

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {activeTab === 'login' ? (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center w-full">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border-t-4 border-orange-600">
            <ShieldAlert className="mx-auto text-orange-600 mb-4" size={48} />
            <h1 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">KLSM Workplace Inspection Hub</h1>
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
                <input type="password" name="password" placeholder="Enter password (default: 1234)" className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none" required />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/30 transition-all">Secure Login</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col border-r border-slate-800 shadow-xl z-10">
            <h1 className="text-xl font-black mb-8 text-orange-500 tracking-tight flex items-center gap-2">
              <ShieldAlert size={24}/> KLSM Hub
            </h1>
            <nav className="space-y-2 flex-1">
              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'dashboard' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><LayoutDashboard size={20}/> Dashboard</button>
              {currentUser?.role === 'Admin' && (
                <>
                  <button onClick={() => setActiveTab('admin-analytics')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'admin-analytics' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><BarChart3 size={20}/> Analytics</button>
                  <button onClick={() => setActiveTab('admin-settings')} className={`flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${activeTab === 'admin-settings' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Settings size={20}/> Settings</button>
                </>
              )}
            </nav>
            <div className="pt-4 border-t border-slate-800 mb-4">
               <p className="text-xs text-slate-400 font-semibold mb-1">Logged in as:</p>
               <p className="text-sm font-bold text-white">{currentUser.name}</p>
            </div>
            <button onClick={() => {setCurrentUser(null); setActiveTab('login');}} className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl font-bold transition-colors"><LogOut size={20}/> Sign Out</button>
          </aside>

          <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
            {activeTab === 'dashboard' && (
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-black mb-6 text-slate-900">Your Assigned Zones</h2>
                {displayedZones.length === 0 ? (
                   <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">You currently have no zones assigned to you.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedZones.map((zone, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                        <h3 className="font-bold mb-6 text-slate-800 leading-snug">{zone}</h3>
                        <button onClick={() => { setSelectedZone(zone); setActiveTab('inspection-form'); }} className="bg-slate-900 text-white w-full py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                          <ClipboardList size={18}/> Start Inspection
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'admin-analytics' && (
              <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-2xl font-black text-slate-900">Analytics & Performance</h2>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><BarChart3 className="text-orange-600"/> Personnel Completion Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
                        <tr><th className="p-4 rounded-tl-xl">Inspector</th><th className="p-4">Assigned Zones</th><th className="p-4">Target Freq.</th><th className="p-4">Today's Progress</th><th className="p-4 rounded-tr-xl">Status</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {personnel.filter(p => p.role === 'Inspector').map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-800">{p.name}</td>
                            <td className="p-4 text-slate-600">
                              <div className="flex flex-wrap gap-1">
                                {p.zones.map(z => <span key={z} className="bg-slate-100 px-2 py-1 rounded text-xs">{z.split('–')[0]}</span>)}
                              </div>
                            </td>
                            <td className="p-4 font-medium">{p.freq}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px]"><div className="bg-orange-500 h-2.5 rounded-full" style={{width: '50%'}}></div></div>
                                <span className="text-xs font-bold text-slate-500">1/2</span>
                              </div>
                            </td>
                            <td className="p-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg">In Progress</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin-settings' && (
              <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-2xl font-black text-slate-900">System Settings</h2>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800"><Users className="text-orange-600"/> Personnel Management</h3>
                  
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-8">
                    <h4 className="font-bold text-sm mb-4 text-slate-700 uppercase">Register New Personnel</h4>
                    <form onSubmit={addPersonnel} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                           <input name="name" placeholder="E.g. Ali bin Abu" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" required />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 mb-1">Role</label>
                           <select name="role" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"><option>Inspector</option><option>Admin</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 mb-1">Daily Frequency</label>
                           <input name="freq" placeholder="E.g. 2 times/day" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" required />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 mb-1">Initial Password</label>
                           <input name="password" placeholder="Set password" type="text" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" required />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Assign Zones (Check all that apply)</label>
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
                        <tr><th className="p-4 rounded-tl-xl">Name</th><th className="p-4">Role</th><th className="p-4">Assigned Zones</th><th className="p-4">Frequency</th><th className="p-4 rounded-tr-xl text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {personnel.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-800">{p.name}</td>
                          <td className="p-4"><span className={`px-2 py-1 rounded-lg text-xs font-bold ${p.role === 'Admin' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>{p.role}</span></td>
                          <td className="p-4 text-xs text-slate-600 max-w-xs truncate">{p.zones.join(', ')}</td>
                          <td className="p-4 font-medium">{p.freq}</td>
                          <td className="p-4 text-right">
                             <div className="flex justify-end gap-2">
                               <button onClick={() => resetPassword(p.id)} title="Reset Password" className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"><Key size={16}/></button>
                               <button onClick={() => setPersonnel(personnel.filter(u => u.id !== p.id))} title="Delete User" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inspection-form' && (
              <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto">
                <div className="border-b border-slate-200 pb-6 mb-6">
                   <h2 className="text-2xl font-black text-slate-900">Conduct Inspection</h2>
                   <p className="text-sm font-bold text-orange-600 mt-1 flex items-center gap-1"><ClipboardList size={16}/> {selectedZone}</p>
                </div>
                
                <div className="space-y-6">
                  {params.map(p => (
                    <div key={p.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="font-bold text-slate-800 block mb-3 text-lg">{p.name}</label>
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <select className="w-full sm:w-auto p-2.5 border border-slate-300 rounded-lg font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 outline-none" defaultValue="">
                           <option value="" disabled>Select Status...</option>
                           <option value="Pass">🟢 Pass</option>
                           <option value="Fail">🔴 Fail</option>
                           <option value="NA">⚪ N/A</option>
                        </select>
                        <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white border border-slate-300 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                           <Camera size={16}/> Add Photo
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-5 bg-orange-50 rounded-xl border border-orange-200 mt-8">
                     <label className="font-black text-orange-900 block mb-2 text-lg">Overall Remarks / Corrective Actions</label>
                     <p className="text-xs text-orange-700 mb-3 font-medium">Add any general observations or details regarding failed parameters that require immediate attention.</p>
                     <textarea 
                        className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white" 
                        rows="4" 
                        placeholder="Type your remarks here..."
                     ></textarea>
                  </div>

                  <div className="pt-6 flex gap-4">
                     <button onClick={() => setActiveTab('dashboard')} className="w-1/3 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition-colors">Cancel</button>
                     <button onClick={() => { alert('Inspection Submitted Successfully!'); setActiveTab('dashboard'); }} className="w-2/3 bg-orange-600 text-white py-3 rounded-xl font-black text-lg hover:bg-orange-700 shadow-lg shadow-orange-600/30 transition-all">Submit Inspection</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}