import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvlus0F3yRe3AVjSpZbYp19mrlyIOBf70",
    authDomain: "loginform-c1a32.firebaseapp.com",
    projectId: "loginform-c1a32",
    storageBucket: "loginform-c1a32.firebasestorage.app",
    messagingSenderId: "507305746804",
    appId: "1:507305746804:web:e8bf8f13829c11ef6d4c21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, 'users', loggedInUserId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;

                localStorage.setItem("userFirstName", userData.firstName);
            } else {
                console.log("No document found matching");
            }
        });
    }
});

import React, { useState, useEffect } from "react";
import FindYourClub from "./FindYourClub";
import ClubQuiz from "./ClubQuiz";
import "./Dashboard.css";

const Dashboard = () => {
    const [showQuiz, setShowQuiz] = useState(false);
    const [userName, setUserName] = useState("Guest");
    const [userEmail, setUserEmail] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [membersCount, setMembersCount] = useState(0);
    const [eventsCount, setEventsCount] = useState(0);
    const [supportCount, setSupportCount] = useState(0);

    useEffect(() => {
        // Retrieve user details from local storage
        const storedFirstName = localStorage.getItem("userFirstName") || "Guest";
        const storedLastName = localStorage.getItem("userLastName") || "";
        const storedEmail = localStorage.getItem("userEmail") || "";

        setUserName(storedFirstName);
        setUserLastName(storedLastName);
        setUserEmail(storedEmail);

        // Voice Welcome Feature
        const speakWelcome = (name) => {
            const message = `Welcome to My Elder World, ${name}! Hope you have a great time here.`;
            const speech = new SpeechSynthesisUtterance(message);
            speech.rate = 1;
            speech.pitch = 1;
            speech.volume = 1;
            window.speechSynthesis.speak(speech);
        };

        speakWelcome(storedFirstName);
    }, []);

    // Function to animate numbers smoothly
    const animateValue = (setState, start, end, duration) => {
        let current = start;
        let stepTime = Math.abs(Math.floor(duration / (end - start)));
        let timer = setInterval(() => {
            current += 1;
            setState(current);
            if (current >= end) {
                clearInterval(timer);
                setState(end);
            }
        }, stepTime);
    };


    return (
        <div className="dashboard-container">
            <h1>🎉 Welcome, {userName}!</h1>
            
            {/* Profile Section */}
            <div className="profile-section">
                <h2>Your Profile</h2>
                <p><strong>First Name:</strong> {userName}</p>
                <p><strong>Last Name:</strong> {userLastName}</p>
                <p><strong>Email:</strong> {userEmail}</p>
            </div>
            
            {/* Animated Counters Section */}
            <div className="counters">
                <div className="counter-box">
                    <p className="counter-number">{membersCount}+</p>
                    <p className="counter-text">Happy Members</p>
                </div>
                <div className="counter-box">
                    <p className="counter-number">{eventsCount}+</p>
                    <p className="counter-text">Exciting Events</p>
                </div>
                <div className="counter-box">
                    <p className="counter-number">24</p>
                    <p className="counter-text">Chat Support</p>
                </div>
            </div>
            {/* Find Your Club Section */}
            <FindYourClub openQuiz={() => setShowQuiz(true)} />
            
            {/* Club Quiz Modal */}
            {showQuiz && <ClubQuiz closeQuiz={() => setShowQuiz(false)} />}
        </div>
    );
};

export default Dashboard;

