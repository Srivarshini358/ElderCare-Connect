import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrawingClub from "./DrawingClub";
import DailySketch from "./DailySketch";
import React from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      <h1>Welcome to the Drawing Club 🎨</h1>
      <p>{user ? `Logged in as: ${user.displayName  || "Artist"}!` : "You are already logged in!"}</p>

      {/* Club Sections */}
      <div>
        <h2>🎨 Drawing Club</h2>
        <DailySketch />

        <h2>🖌️ AI-Powered Coloring Book</h2>
        <p>Upload sketches & turn them into printable pages.</p>

        <h2>🎡 Spin & Win Challenges</h2>
        <p>Try your luck and win art rewards!</p>
      </div>
    </div>
  );
}

export default App;
