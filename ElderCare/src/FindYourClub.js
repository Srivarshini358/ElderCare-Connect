import React, { useState, useEffect } from "react";

const clubs = [
  { id: 1, name: "📚 Page Turners" },
  { id: 2, name: "🎨 Canvas Creators" },
  { id: 3, name: "🍽 Cooking Club" },
  { id: 4, name: "🌱 Gardening Club" },
  { id: 5, name: "🎼 Melody Makers" },
  { id: 6, name: "🧘 Mind & Wellness" },
  { id: 7, name: "🌍 Travel Tales" },
  { id: 8, name: "🎥 Movie Buffs" },
  { id: 9, name: "✨ Craft & DIY" },
  { id: 10, name: "📝 Poetry & Writing" },
  { id: 11, name: "🤝 Community Helpers" }
];

const FindYourClub = ({ openQuiz }) => {
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Fetch joined clubs (Mocking data for now)
  useEffect(() => {
    const storedClubs = JSON.parse(localStorage.getItem("joinedClubs")) || [];
    setJoinedClubs(storedClubs);
  }, []);

  return (
    <div className="club-container">
      <h2>🎭 Your Clubs</h2>
      
      {/* Show Joined Clubs (Grid View) */}
      {joinedClubs.length > 0 ? (
        <div className="club-grid">
          {joinedClubs.map((club) => (
            <div key={club.id} className="club-card">
              {club.name}
            </div>
          ))}
        </div>
      ) : (
        <p>You're not in any clubs yet. Find one below!</p>
      )}

      {/* Find Your Club Button */}
      <button className="quiz-button" onClick={openQuiz}>
        🏆 Find Your Club
      </button>
    </div>
  );
};

export default FindYourClub;
