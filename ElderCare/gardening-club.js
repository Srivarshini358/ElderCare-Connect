let userPoints = 0;
let activityLog = JSON.parse(localStorage.getItem("activityLog")) || {};
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
let currentMonth = new Date().getMonth();
let username = localStorage.getItem("username") || prompt("Enter your name:");
localStorage.setItem("username", username);

function checkMonthReset() {
    let storedMonth = localStorage.getItem("lastMonth");

    if (storedMonth === null || parseInt(storedMonth) !== currentMonth) {
        userPoints = 0;
        activityLog = {};
        leaderboard = [];
        localStorage.setItem("lastMonth", currentMonth);
        localStorage.setItem("activityLog", JSON.stringify(activityLog)); 
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
}

checkMonthReset();

function updateUI() {
    document.getElementById("userPoints").innerText = userPoints;
    updateLeaderboard();
}

function submitActivity(activity, points) {
    const inputField = document.getElementById(`photo-${activity}`);

    if (inputField && inputField.value) {
        if (!activityLog[activity]) {
            activityLog[activity] = points;
            userPoints += points;

            localStorage.setItem("activityLog", JSON.stringify(activityLog));
            localStorage.setItem("userPoints", userPoints);
            
            updateLeaderboard();
            updateUI();
            alert(`✅ Activity recorded! You earned ${points} points.`);
        } else {
            alert("❌ You already claimed points for this activity this month.");
        }
        inputField.value = "";
    } else {
        alert("❌ Upload proof before submitting.");
    }
}

function updateLeaderboard() {
    let existingUser = leaderboard.find(entry => entry.name === username);

    if (existingUser) {
        existingUser.points = userPoints;
    } else {
        leaderboard.push({ name: username, points: userPoints });
    }

    leaderboard.sort((a, b) => b.points - a.points);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    let leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";
    
    leaderboard.slice(0, 3).forEach((entry, index) => {
        let position = ["🥇", "🥈", "🥉"][index] || "";
        leaderboardList.innerHTML += `<li>${position} ${entry.name} - ${entry.points} pts</li>`;
    });
}

if (activityLog) {
    userPoints = Object.values(activityLog).reduce((a, b) => a + b, 0);
    updateUI();
}
