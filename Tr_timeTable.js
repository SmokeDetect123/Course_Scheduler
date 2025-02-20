timetable.js

// Function to display the timetable
function displayTimetable() {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    const timetableBody = document.getElementById('timetableBody');
    timetableBody.innerHTML = '';

    classes.forEach((classItem) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td data-label="Class Name">${classItem.className}</td>
            <td data-label="Subject">${classItem.subject}</td>
            <td data-label="Group">${classItem.group}</td>
            <td data-label="Timing">${classItem.timing}</td>
            <td data-label="Location">${classItem.location}</td>
        `;

        timetableBody.appendChild(row);
        
    });
}


// Call the function to display the timetable when the page loads
document.addEventListener('DOMContentLoaded', displayTimetable);