let classCounter = 0;
const classData = {};

function addClass() {
    const className = document.getElementById("classNameInput").value.trim();
    if (!className) return;

    const classId = `class-${classCounter++}`;
    const classContainer = document.createElement("div");
    classContainer.className = "class-box";
    classContainer.id = classId;

    classContainer.innerHTML = `
        <h2>${className}</h2>
        <input type="text" placeholder="Assessment Name" id="${classId}-name">
        <input type="number" placeholder="Grade (%)" id="${classId}-grade">
        <input type="number" placeholder="Weight (%)" id="${classId}-weight">
        <button onclick="addAssessment('${classId}')">Add Assessment</button>
        <ul class="grade-list" id="${classId}-list"></ul>
        <button onclick="calculateClassGrade('${classId}')">Calculate Final Grade</button>
        <p id="${classId}-result"></p>
    `;

    document.getElementById("classList").appendChild(classContainer);
    document.getElementById("classNameInput").value = "";
}

function addAssessment(classId) {
    const nameInput = document.getElementById(`${classId}-name`);
    const gradeInput = document.getElementById(`${classId}-grade`);
    const weightInput = document.getElementById(`${classId}-weight`);

    const name = nameInput.value.trim();
    const grade = parseFloat(gradeInput.value);
    const weight = parseFloat(weightInput.value);

    if (!name || isNaN(grade) || isNaN(weight)) return;

    if (!classData[classId]) {
        classData[classId] = [];
    }

    classData[classId].push({ name, grade, weight });

    const listItem = document.createElement("li");
    listItem.textContent = `${name} - ${grade}% (Weight: ${weight}%)`;
    document.getElementById(`${classId}-list`).appendChild(listItem);

    nameInput.value = "";
    gradeInput.value = "";
    weightInput.value = "";
}

function calculateClassGrade(classId) {
    const entries = classData[classId];
    if (!entries || entries.length === 0) {
        document.getElementById(`${classId}-result`).textContent = "No assessments added yet!";
        return;
    }

    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const { grade, weight } of entries) {
        totalWeightedScore += (grade * weight);
        totalWeight += weight;
    }

    const average = totalWeightedScore / totalWeight;
    const resultText = isNaN(average)
        ? "Check weights or grades – something’s off!"
        : `Final Grade: ${average.toFixed(2)}%`;

    document.getElementById(`${classId}-result`).textContent = resultText;
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';

    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        spawnBugs('firefly');
    } else {
        spawnBugs('dragonfly');
    }
}

function spawnBugs(type, count = 15) {
    removeBugs();
    for (let i = 0; i < count; i++) {
        const bug = document.createElement("div");
        bug.className = type;
        bug.style.top = Math.random() * window.innerHeight + "px";
        bug.style.left = Math.random() * window.innerWidth + "px";
        bug.style.animationDuration = (Math.random() * 2 + 3) + "s";
        document.body.appendChild(bug);
    }
}

function removeBugs() {
    document.querySelectorAll('.firefly, .dragonfly').forEach(el => el.remove());
}

window.onload = () => {
    if (document.body.classList.contains('dark')) {
        spawnBugs('firefly');
    } else {
        spawnBugs('dragonfly');
    }
};
