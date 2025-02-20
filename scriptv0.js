document.getElementById('generateElectives').addEventListener('click', function() {
    const year = document.getElementById('year').value;
    const electiveCoursesContainer = document.getElementById('electiveCoursesContainer');
    
    // Show the elective courses section
    electiveCoursesContainer.style.display = 'block';

    // Define electives and compulsory courses based on the selected year
    let electives = {};
    let compulsoryCourses = [];

    if (year === "FE") {
        electives = {
            elective1: { name: "Applied Calculus", desc: "Focus on advanced calculus methods in engineering." },
            elective2: { name: "Programming Basics", desc: "Introduction to programming using C." },
            elective3: { name: "Physics", desc: "Concepts of waves, optics, and modern physics." }
        };
        compulsoryCourses = [
            { course: "Mathematics-I", credits: 4 },
            { course: "Engineering Graphics", credits: 3 },
            { course: "Basic Electronics", credits: 3 },
            { course: "Mechanics", credits: 3 }
        ];
    } else if (year === "SE") {
        electives = {
            elective1: { name: "Data Structures", desc: "Key data structures like stacks, queues, and graphs." },
            elective2: { name: "Electronics", desc: "Basic principles of electronic circuits." },
            elective3: { name: "Environmental Science", desc: "Sustainable development and ecological systems." }
        };
        compulsoryCourses = [
            { course: "Discrete Mathematics", credits: 3 },
            { course: "Computer Networks", credits: 4 },
            { course: "Operating Systems", credits: 4 }
        ];
    } else if (year === "TE") {
        electives = {
            elective1: { name: "Machine Learning", desc: "Intro to AI and machine learning concepts." },
            elective2: { name: "Database Systems", desc: "Relational databases, SQL, and data modeling." },
            elective3: { name: "Software Engineering", desc: "Process of developing reliable software systems." }
        };
        compulsoryCourses = [
            { course: "Operating Systems", credits: 4 },
            { course: "Compiler Design", credits: 4 },
            { course: "Theory of Computation", credits: 3 }
        ];
    } else if (year === "BE") {
        electives = {
            elective1: { name: "Big Data Analytics", desc: "Methods and tools for large data processing." },
            elective2: { name: "Cloud Computing", desc: "Cloud architecture, services, and applications." },
            elective3: { name: "Cyber Security", desc: "Introduction to security principles and cryptography." }
        };
        compulsoryCourses = [
            { course: "Distributed Systems", credits: 4 },
            { course: "Network Security", credits: 3 },
            { course: "Software Project Management", credits: 3 }
        ];
    } else {
        electiveCoursesContainer.style.display = 'none';
        return;
    }

    // Populate the elective cards with course information and checkboxes
    document.getElementById('elective1Name').innerText = electives.elective1.name;
    document.getElementById('elective1Desc').innerText = electives.elective1.desc;
    document.getElementById('elective2Name').innerText = electives.elective2.name;
    document.getElementById('elective2Desc').innerText = electives.elective2.desc;
    document.getElementById('elective3Name').innerText = electives.elective3.name;
    document.getElementById('elective3Desc').innerText = electives.elective3.desc;

    // Populate the compulsory courses table
    let compulsoryTableBody = document.querySelector('#compulsoryCourses tbody');
    compulsoryTableBody.innerHTML = '';  // Clear previous data
    compulsoryCourses.forEach(course => {
        let row = `<tr>
                        <td>${course.course}</td>
                        <td>${course.credits}</td>
                    </tr>`;
        compulsoryTableBody.innerHTML += row;
    });
});
