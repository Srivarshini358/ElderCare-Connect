import React, { useState } from "react";
import "./ClubQuiz.css"; // Import styles

const questions = [
  {
    question: "What do you enjoy the most?",
    options: ["📚 Reading", "🎨 Art", "🍽 Cooking", "🌱 Gardening"]
  },
  {
    question: "How do you relax?",
    options: ["🎼 Music", "🧘 Meditation", "🎥 Watching movies", "✨ Crafting"]
  },
  {
    question: "Pick a weekend activity!",
    options: ["🌍 Traveling", "📝 Writing", "🤝 Volunteering"]
  }
];

const clubMatches = {
  "📚 Reading": "📚 Page Turners",
  "🎨 Art": "🎨 Canvas Creators",
  "🍽 Cooking": "🍽 Cooking Club",
  "🌱 Gardening": "🌱 Gardening Club",
  "🎼 Music": "🎼 Melody Makers",
  "🧘 Meditation": "🧘 Mind & Wellness",
  "🎥 Watching movies": "🎥 Movie Buffs",
  "✨ Crafting": "✨ Craft & DIY",
  "🌍 Traveling": "🌍 Travel Tales",
  "📝 Writing": "📝 Poetry & Writing",
  "🤝 Volunteering": "🤝 Community Helpers"
};

const ClubQuiz = ({ closeQuiz, joinClub }) => {
  const [step, setStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    if (step === questions.length - 1) {
      const matchedClub = clubMatches[option] || "🌟 General Club";
      joinClub(matchedClub);
      closeQuiz();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="quiz-modal">
      <div className="quiz-content">
        <h3>{questions[step].question}</h3>
        {questions[step].options.map((option) => (
          <button key={option} className="quiz-option" onClick={() => handleSelect(option)}>
            {option}
          </button>
        ))}
        <button className="close-quiz" onClick={closeQuiz}>❌ Close</button>
      </div>
    </div>
  );
};

export default ClubQuiz;
