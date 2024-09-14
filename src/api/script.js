function calculatePercentages() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    for (let i = 1; i <= 5; i++) {
        const maths = parseInt(document.getElementById(student${i}-maths).value);
        const science = parseInt(document.getElementById(student${i}-science).value);
        const english = parseInt(document.getElementById(student${i}-english).value);

        if (isNaN(maths) || isNaN(science) || isNaN(english)) {
            alert('Please enter valid marks for all subjects');
            return;
        }

        const totalMarks = maths + science + english;
        const percentage = (totalMarks / 300) * 100;

        const studentResult = document.createElement('p');
        studentResult.textContent = Student ${i}: ${percentage.toFixed(2)}%;
        resultsDiv.appendChild(studentResult);  
    }
}
