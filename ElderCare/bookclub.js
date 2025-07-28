document.addEventListener("DOMContentLoaded", function () {
    let userPoints = parseInt(localStorage.getItem("bookPoints")) || 0;
    updatePointsUI();

    // Function to toggle discussion section visibility
    window.toggleDiscussion = function (bookId) {
        let discussionDiv = document.getElementById(bookId + "-discussion");
        if (discussionDiv) {
            discussionDiv.style.display = discussionDiv.style.display === "none" ? "block" : "none";
        }
    };

    // Function to submit discussion and update points
    window.submitDiscussion = function (bookId) {
        let inputField = document.getElementById(bookId + "-input");
        let submissionsDiv = document.getElementById(bookId + "-submissions");

        if (inputField && inputField.value.trim() !== "") {
            // Save discussion text (Optional: Show it in UI)
            let newSubmission = document.createElement("p");
            newSubmission.textContent = inputField.value;
            submissionsDiv.appendChild(newSubmission);

            // Update points
            userPoints += 10; // Earn 10 points per discussion
            localStorage.setItem("bookPoints", userPoints);
            updatePointsUI();

            alert("You earned 10 points!");
            inputField.value = ""; // Clear input field
        } else {
            alert("Please enter your thoughts before submitting.");
        }
    };

    // Function to update points UI
    function updatePointsUI() {
        document.getElementById("userPoints").textContent = userPoints;
    }
});
