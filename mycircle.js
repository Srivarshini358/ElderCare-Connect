document.addEventListener("DOMContentLoaded", function () {
    const myCircleContainer = document.getElementById("myCircleContainer");
    const noClubsMessage = document.getElementById("noClubsMessage");

    // Get clubs from localStorage
    let myCircle = JSON.parse(localStorage.getItem("MyCircle")) || [];

    // Clear previous content to prevent duplicates
    myCircleContainer.innerHTML = "<h2>My Circle</h2>";

    if (myCircle.length > 0) {
        noClubsMessage.style.display = "none"; // Hide "No clubs added yet" message

        myCircle.forEach((clubName) => {
            let clubElement = document.createElement("div");
            clubElement.classList.add("club-box");

            clubElement.innerHTML = `
                <h3>${clubName}</h3>
                <button class="join-btn" onclick="joinClub('${clubName}')">Join</button>
                <button class="exit-btn" onclick="exitClub('${clubName}')">Exit</button>
            `;

            myCircleContainer.appendChild(clubElement);
        });
    } else {
        noClubsMessage.style.display = "block"; // Show message if no clubs exist
    }
});

// Function to join a club (ensures it stays permanently in My Circle)
function joinClub(clubName) {
    let myCircle = JSON.parse(localStorage.getItem("MyCircle")) || [];

    if (!myCircle.includes(clubName)) {
        myCircle.push(clubName);
        localStorage.setItem("MyCircle", JSON.stringify(myCircle));
        alert(`You have joined ${clubName}!`);
        location.reload(); // Refresh to update the UI
    } else {
        alert(`You are already in ${clubName}.`);
    }
}

// Function to exit a club (removes it from My Circle)
function exitClub(clubName) {
    let myCircle = JSON.parse(localStorage.getItem("MyCircle")) || [];
    myCircle = myCircle.filter((club) => club !== clubName);

    localStorage.setItem("MyCircle", JSON.stringify(myCircle));
    alert(`You have exited ${clubName}.`);
    location.reload(); // Refresh to update the UI
}
