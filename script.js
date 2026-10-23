
const form = document.getElementById("calorieForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const age = Number(document.getElementById("age").value);
    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);
    const activity = Number(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    ).value;

    if (
        !Number.isFinite(age) ||
        !Number.isFinite(height) ||
        !Number.isFinite(weight) ||
        age < 18 || age > 100 ||
        height < 100 || height > 250 ||
        weight < 25 || weight > 350
    ) {
        alert("Please enter valid age, height, and weight.");
        return;
    }

    // Mifflin-St Jeor equation: estimated resting energy needs
    let bmr;

    if (gender === "male") {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Estimate daily calories using activity level
    const maintenance = Math.round(bmr * activity);

    let target = maintenance;
    let goalText = "to maintain your current weight";

    if (goal === "lose") {
        target = maintenance - 300;
        goalText = "for gradual weight loss";
    } else if (goal === "gain") {
        target = maintenance + 300;
        goalText = "for gradual weight gain";
    }

    result.hidden = false;
    result.innerHTML = `
        <h2>Your Estimated Daily Calories</h2>
        <div class="calories">${target.toLocaleString()} kcal</div>
        <p>${goalText}.</p>
        <p>Estimated maintenance: ${maintenance.toLocaleString()} kcal/day</p>
        <p>Estimated resting needs (BMR): ${Math.round(bmr).toLocaleString()} kcal/day</p>
    `;

    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

const aboutBtn = document.getElementById("aboutBtn");

aboutBtn.addEventListener("click", function () {
    window.location.href = "about.html";
});
