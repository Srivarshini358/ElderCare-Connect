import React, { useState, useEffect } from "react";
import { db, auth } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const DailySketch = () => {
  const [streak, setStreak] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchStreak();
    }
  }, [user]);

  const fetchStreak = async () => {
    if (!user) return;

    const streakRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(streakRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setStreak(data.streak || 0);
      setLastUpdated(data.lastUpdated || null);
    } else {
      await setDoc(streakRef, { streak: 0, lastUpdated: null });
    }
  };

  const completeSketch = async () => {
    if (!user) return alert("You must be logged in!");

    const today = new Date().toDateString();
    if (lastUpdated === today) {
      alert("You already submitted today's sketch!");
      return;
    }

    const newStreak = streak + 1;
    setStreak(newStreak);
    setLastUpdated(today);

    const streakRef = doc(db, "users", user.uid);
    await updateDoc(streakRef, { streak: newStreak, lastUpdated: today });
  };

  return (
    <div>
      <h2>🔥 Daily Sketch Streak: {streak} Days</h2>
      <button onClick={completeSketch}>✅ Submit Today's Sketch</button>
    </div>
  );
};

export default DailySketch;

