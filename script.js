let grades = [];
function addGrade() {
    let input = document.getElementById("gradeInput");
    let grade = parseFloat(input.value);
    if (!isNaN(grade)) {
        grades.push(grade);
        let list = document.getElementById("gradeList");
        let item = document.createElement("li");
        item.textContent = grade;
        list.appendChild(item);
        input.value = "";
    }
}
function calculateAverage() {
    if (grades.length === 0) {
        document.getElementById("result").textContent = "No grades entered!";
        return;
    }
    let sum = grades.reduce((a, b) => a + b, 0);
    let avg = sum / grades.length;
    document.getElementById("result").textContent = `Average Grade: ${avg.toFixed(2)}`;
}
