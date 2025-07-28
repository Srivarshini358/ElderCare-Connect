document.addEventListener("DOMContentLoaded", function () {
    let userPoints = localStorage.getItem("cookingPoints") ? parseInt(localStorage.getItem("cookingPoints")) : 0;

    function updatePoints(points) {
        userPoints += points;
        localStorage.setItem("cookingPoints", userPoints);
        document.querySelectorAll(".points-display").forEach(el => el.textContent = userPoints);
    }

    // Initialize points on page load
    document.querySelectorAll(".points-display").forEach(el => el.textContent = userPoints);

    // Comment System
    document.getElementById("postCommentBtn")?.addEventListener("click", function () {
        const commentBox = document.getElementById("commentBox");
        const commentText = commentBox.value.trim();

        if (commentText === "") return;

        const commentsList = document.getElementById("commentsList");
        const newComment = document.createElement("li");
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);

        commentBox.value = ""; // Clear comment box
        updatePoints(3); // Add 3 points for commenting
    });

    // Dish Photo Upload
    document.getElementById("recipeImage")?.addEventListener("change", function () {
        const fileInput = document.getElementById("recipeImage");
        const uploadedImageContainer = document.getElementById("uploadedImageContainer");

        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                uploadedImageContainer.innerHTML = `<img src="${e.target.result}" width="100" height="100" alt="Uploaded Dish">`;
            };
            reader.readAsDataURL(fileInput.files[0]);

            updatePoints(10); // Add 10 points for uploading a dish
        }
    });

    // Rating System
    document.querySelectorAll(".rating-star").forEach((star, index, stars) => {
        star.addEventListener("click", () => {
            stars.forEach((s, i) => {
                s.style.color = i <= index ? "gold" : "gray";
            });
            updatePoints(5); // Add 5 points for rating
        });
    });
});

