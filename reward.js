document.addEventListener("DOMContentLoaded", function () {
    function getPoints(club) {
        return parseInt(localStorage.getItem(club)) || 0;
    }

    function setPoints(club, points) {
        localStorage.setItem(club, points);

        // Trigger the storage event manually
        window.dispatchEvent(new StorageEvent("storage", { key: club }));
    }

    function updatePointsUI() {
        let bookPoints = getPoints("bookPoints");
        let gardenPoints = getPoints("gardenPoints");
        let cookingPoints = getPoints("cookingPoints");
        let drawingPoints = getPoints("drawingClubPoints");

        let totalPoints = bookPoints + gardenPoints + cookingPoints + drawingPoints;

        document.getElementById("book-points").textContent = bookPoints;
        document.getElementById("garden-points").textContent = gardenPoints;
        document.getElementById("cooking-points").textContent = cookingPoints;
        document.getElementById("reward-drawing-club").textContent = drawingPoints;
        document.getElementById("total-points").textContent = totalPoints;
    }

    // Listen for real-time storage updates (for updates across tabs)
    window.addEventListener("storage", function (event) {
        if (event.key) {
            updatePointsUI(); // Update UI when localStorage changes
        }
    });

    // Auto-update when user earns points
    document.querySelectorAll(".earn-points").forEach(button => {
        button.addEventListener("click", function () {
            let club = this.dataset.club;
            let pointsToAdd = parseInt(this.dataset.points) || 10; // Default: 10 points per action
            let newPoints = getPoints(club) + pointsToAdd;
            setPoints(club, newPoints);
        });
    });

    updatePointsUI(); // Initial load
});
document.addEventListener("DOMContentLoaded", function () {
    function getPoints(club) {
        return parseInt(localStorage.getItem(club)) || 0;
    }

    function setPoints(club, points) {
        localStorage.setItem(club, points);
        window.dispatchEvent(new Event("storage")); // 🔥 Triggers real-time updates
    }

    function updatePointsUI() {
        let natureWalkPoints = getPoints("natureWalkPoints");

        document.getElementById("nature-walk-points").textContent = natureWalkPoints;
    }

    // **🔥 Automatically Update Across All Pages**
    window.addEventListener("storage", function () {
        updatePointsUI();
    });

    // **🎉 When User Submits a Photo, Add Points**
    document.getElementById("submit-photo").addEventListener("click", function () {
        let photoURL = document.getElementById("photo-url").value.trim();
        let description = document.getElementById("photo-description").value.trim();

        if (photoURL === "" || description === "") {
            alert("Please enter a photo URL and description!");
            return;
        }

        // **🚀 Add 10 Points for Nature Walk Challenge**
        let newPoints = getPoints("natureWalkPoints") + 10;
        setPoints("natureWalkPoints", newPoints);

        // **✅ Clear input fields after submission**
        document.getElementById("photo-url").value = "";
        document.getElementById("photo-description").value = "";
    });

    updatePointsUI(); // Load current points when page loads
});
function updatePointsDisplay(){
    // Update the points in the Club Section
    document.getElementById("book-club-points").innerText = points.bookClub;
    document.getElementById("gardening-club-points").innerText = points.gardeningClub;
    document.getElementById("cooking-club-points").innerText = points.cookingClub;
    document.getElementById("drawing-club-points").innerText = points.drawingClub;
    // Function to simulate earning points (this would come from your real event handling)
function earnPoints(club, earnedPoints) {
    // Add points to the selected club
    points[club] += earnedPoints;
  
    // Call function to update points in both sections
    updatePointsDisplay();
  }
  
  // Simulate real-time points updating based on actual club events
  // Example of how points will be updated when users earn points
  function onUserActivity(club, earnedPoints) {
    earnPoints(club, earnedPoints); // Call when a user earns points
  }
}  


