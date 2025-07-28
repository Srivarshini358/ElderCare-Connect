document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("earnPoints");

    if (button) {
        button.addEventListener("click", function () {
            addPoints('book-club');
        });
    }
});

function addPoints(clubName) {
    console.log("Button clicked for:", clubName); // Debugging

    // Get existing points from Local Storage
    let userPoints = JSON.parse(localStorage.getItem("userPoints")) || {};

    // Initialize club points if not set
    if (!userPoints[clubName]) {
        userPoints[clubName] = 0;
    }

    // Add points
    userPoints[clubName] += 10;

    // Save updated points
    localStorage.setItem("userPoints", JSON.stringify(userPoints));

    // Show confirmation
    alert(`You earned 10 points in ${clubName}! 🎉`);

    // Refresh leaderboard
    updateLeaderboard();
}

