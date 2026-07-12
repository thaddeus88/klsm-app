import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; 
import { collection, addDoc, doc, setDoc, onSnapshot } from 'firebase/firestore'; 

// ... (keep your icons, initialZones, and initialUsers code exactly the same) ...

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

  // NEW: Fetch parameters from Firebase as soon as the app opens
  useEffect(() => {
    const docRef = doc(db, "settings", "parameters");
    
    // onSnapshot constantly listens for changes in the cloud
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setParams(docSnap.data().paramsList); // Load cloud data
      } else {
        // If it's the very first time, create the cloud file with the defaults
        setDoc(docRef, { paramsList: initialParameters });
      }
    });

    return () => unsubscribe();
  }, []);

  // ... (keep your handleLogin, addPersonnel, and resetPassword exactly the same) ...

  // UPDATED: Save new sub-parameter to Firebase
  const addSubParam = async (e, paramId) => {
    e.preventDefault();
    const text = e.target.subParamText.value.trim();
    if (!text) return;
    
    const updatedParams = params.map(p => {
      if (p.id === paramId) {
        return { ...p, subParams: [...p.subParams, { id: Date.now(), text }] };
      }
      return p;
    });

    setParams(updatedParams); // Update screen instantly
    await setDoc(doc(db, "settings", "parameters"), { paramsList: updatedParams }); // Save to cloud permanently
    e.target.reset();
  };

  // UPDATED: Remove sub-parameter from Firebase
  const removeSubParam = async (paramId, subParamId) => {
    const updatedParams = params.map(p => {
      if (p.id === paramId) {
        return { ...p, subParams: p.subParams.filter(sp => sp.id !== subParamId) };
      }
      return p;
    });

    setParams(updatedParams); // Update screen instantly
    await setDoc(doc(db, "settings", "parameters"), { paramsList: updatedParams }); // Save to cloud permanently
  };

  // ... (keep the rest of your return() code exactly as it is) ...