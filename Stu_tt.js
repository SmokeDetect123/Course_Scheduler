// Existing timetable data
const Sunday = [
    {   
        time: 'Sunday',
        roomNumber: 'Holiday',
        subject: 'No class Available',
        type: ''
    }
];

const Monday = [
    {   
        time: '09-10 AM',
        roomNumber: '38-718',
        subject: 'DBMS130',
        type: 'Lecture'
    },
    {   
        time: '10-11 AM',
        roomNumber: '38-718',
        subject: 'MTH166',
        type: 'Tutorial'
    },
    {   
        time: '12-01 PM',
        roomNumber: '38-718',
        subject: 'NS200',
        type: 'Lecture'
    }
];

const Tuesday = [
    {   
        time: '09-10 AM',
        roomNumber: '27-304Y',
        subject: 'MTH166',
        type: 'Tutorial'
    },
    {   
        time: '11-12 AM',
        roomNumber: '28-107',
        subject: 'CS849',
        type: 'Lecture'
    },
    {   
        time: '12-01 PM',
        roomNumber: '28-107',
        subject: 'CS849',
        type: 'Lecture'
    },
    {   
        time: '02-03 PM',
        roomNumber: '38-718',
        subject: 'NS200',
        type: 'Lecture'
    }
];

const Wednesday = [
    {   
        time: '10-11 AM',
        roomNumber: '33-309',
        subject: 'DBMS130',
        type: 'Lecture'
    },
    {   
        time: '11-12 AM',
        roomNumber: '38-719',
        subject: 'CS200',
        type: 'Lecture'
    }
];

const Thursday = [
    {   
        time: '11-12 AM',
        roomNumber: '33-309',
        subject: 'MTH166',
        type: 'Lecture'
    },
    {   
        time: '01-02 PM',
        roomNumber: '38-719',
        subject: 'CS849',
        type: 'Lecture'
    },
    {   
        time: '02-03 PM',
        roomNumber: '38-718',
        subject: 'NS200',
        type: 'Lecture'
    }
];

const Friday = [
    {   
        time: '10-11 AM',
        roomNumber: '33-309',
        subject: 'MEC103',
        type: 'Lecture'
    },
    {   
        time: '11-12 AM',
        roomNumber: '33-309',
        subject: 'MEC103',
        type: 'Lecture'
    },
    {   
        time: '02-03 PM',
        roomNumber: '33-601',
        subject: 'CS849',
        type: 'Tutorial'
    }
];

const Saturday = [
    {   
        time: '09-10 AM',
        roomNumber: '34-604',
        subject: 'DBMS130',
        type: 'Tutorial'
    },
    {   
        time: '10-11 AM',
        roomNumber: '34-604',
        subject: 'DBMS130',
        type: 'Lecture'
    },
    {   
        time: '01-02 PM',
        roomNumber: '33-309',
        subject: 'MTH166',
        type: 'Lecture'
    }
];

// Store all days in an array for easy access
const weekSchedule = {
    'Sunday': Sunday,
    'Monday': Monday,
    'Tuesday': Tuesday,
    'Wednesday': Wednesday,
    'Thursday': Thursday,
    'Friday': Friday,
    'Saturday': Saturday
};

// Available time slots for new courses
const availableTimeSlots = [
    '09-10 AM', '10-11 AM', '11-12 AM', '12-01 PM',
    '01-02 PM', '02-03 PM', '03-04 PM'
];

// Available rooms for new courses
const availableRooms = [
    '38-718', '33-309', '34-604', '38-719',
    '27-304Y', '28-107', '33-601'
];

// Function to check if a time slot is available on a given day
function isTimeSlotAvailable(day, timeSlot) {
    return !weekSchedule[day].some(class_ => class_.time === timeSlot);
}

// Function to find available slot for new course
function findAvailableSlot() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const availableSlots = [];

    days.forEach(day => {
        availableTimeSlots.forEach(timeSlot => {
            if (isTimeSlotAvailable(day, timeSlot)) {
                availableSlots.push({ day, timeSlot });
            }
        });
    });

    return availableSlots[Math.floor(Math.random() * availableSlots.length)];
}

// Function to add new course to timetable
function addNewCourse(course) {
    const availableSlot = findAvailableSlot();
    if (!availableSlot) return false;

    const newClass = {
        time: availableSlot.timeSlot,
        roomNumber: availableRooms[Math.floor(Math.random() * availableRooms.length)],
        subject: course.name,
        type: course.type === 'compulsory' ? 'Lecture' : 'Tutorial'
    };

    weekSchedule[availableSlot.day].push(newClass);
    weekSchedule[availableSlot.day].sort((a, b) => {
        return availableTimeSlots.indexOf(a.time) - availableTimeSlots.indexOf(b.time);
    });

    return true;
}

// Function to display timetable for a specific day
function displayDaySchedule(day) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    weekSchedule[day].forEach(class_ => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${class_.time}</td>
            <td>${class_.roomNumber}</td>
            <td>${class_.subject}</td>
            <td>
                <span class="material-icons-sharp">more_vert</span>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update heading
    document.querySelector('.timetable h2').textContent = `${day}'s Timetable`;
}

// Initialize with current day's schedule
let currentDayIndex = new Date().getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let currentDay = days[currentDayIndex];

// Event listeners for navigation
document.addEventListener('DOMContentLoaded', () => {
    displayDaySchedule(currentDay);

    document.getElementById('prevDay').addEventListener('click', () => {
        currentDayIndex = (currentDayIndex - 1 + 7) % 7;
        currentDay = days[currentDayIndex];
        displayDaySchedule(currentDay);
    });

    document.getElementById('nextDay').addEventListener('click', () => {
        currentDayIndex = (currentDayIndex + 1) % 7;
        currentDay = days[currentDayIndex];
        displayDaySchedule(currentDay);
    });

    // Listen for new course additions from localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'timetableData') {
            const newCourses = JSON.parse(e.newValue || '[]');
            newCourses.forEach(course => {
                if (!course.processed) {
                    addNewCourse(course);
                    course.processed = true;
                }
            });
            localStorage.setItem('timetableData', JSON.stringify(newCourses));
            displayDaySchedule(currentDay);
        }
    });
});