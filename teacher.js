function getTeacherData () {
    fetch ('grades.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        localData = data;
        getGroups(data);
    })
 
}

function getGroups(data) {
    let groupList = new Map();
    Object.values(data).forEach(value => {
        let counter = groupList.get(value.groupsub_key) || {};
        if (Object.entries(counter).length === 0) {
            groupList.set(value.groupsub_key, {
                "group": value.group,
                "subject": value.subject,
                "students": 1
            }) 
        } else {
            groupList.set(value.groupsub_key, {
                "group": value.group,
                "subject": value.subject,
                "students": counter.students + 1
            })
        }
    })
    showGroups(groupList);
}

function showGroups (groups) {
    let groupsTable = document.getElementById('groups_table');

    groups.forEach( (value, key) => {
        let groupMarkup = `
            <td>${value.group}</td>
            <td>${value.subject}</td>
            <td>${value.students}</td>
            <td>
                <img class="action_icon" src="./assets/edit.svg" alt="Edit icon">
                <img class="action_icon" src="./assets/delete.svg" alt="Delete icon">
            </td>
        `
        
        let group = document.createElement('tr')
        group.setAttribute('id', key)
        group.setAttribute('class', 'group')
        group.innerHTML += groupMarkup;
        groupsTable.appendChild(group)
    })
    
    let groupRows = document.querySelectorAll('.group')

    groupRows.forEach(item => {
        item.addEventListener('click', ev => {
            selectedGroup = []
            selectedGroupCopy = []
            showStudents(ev.target.parentNode.id)
        })
    });

}

function showStudents (group) {
    
    localData.forEach(value => {
        if (value.groupsub_key === group) {
            selectedGroup.push(value)
        }
    })

    let groupTitle = document.getElementById('group_title')
    groupTitle.innerHTML = group;
    
    
    studentsTable.innerHTML = `
        <th>Student<br/> Id</th>
        <th>First<br/> Name</th>
        <th>Last<br/> Name</th>
        <th>1rst<br/>Period</th>
        <th>2nd <br/>Period</th>
        <th>3rd <br/>Period</th>
        <th>4th <br/>Period</th>
        <th>Average</th>
        <th>Actions</th>
    `
    selectedGroupCopy = [...selectedGroup]

    selectedGroupCopy.forEach( (value, key) => {
        if (studentsTable.childElementCount < 21) {
            let studentMarkup = `
        <tr>
            <td>${value.id}</td>
            <td>${value.first_name}</td>
            <td>${value.last_name}</td>
            <td>${value.p1.toFixed(1)}</td>
            <td>${value.p2.toFixed(1)}</td>
            <td>${value.p3.toFixed(1)}</td>
            <td>${value.p4.toFixed(1)}</td>
            <td>${value.average.toFixed(1)}</td>
            <td>
                <img class="action_icon" src="./assets/edit.svg" alt="Edit icon">
                <img class="action_icon" src="./assets/delete.svg" alt="Delete icon">
            </td>
        </tr>
        `
        
        let student = document.createElement('tr')
        student.setAttribute('id', key)
        student.setAttribute('class', 'student')
        student.innerHTML += studentMarkup;
        studentsTable.appendChild(student)
        
        selectedGroupCopy.shift()
        }
 
    })

}

const footer = document.getElementById('table_footer');
const studentsTable = document.getElementById('students_table');
const studentsCard = document.getElementById('details');
let selectedGroup = []
let selectedGroupCopy = []

window.addEventListener('scroll', (ev) => {
    if ((window.innerHeight + window.scrollY) >= studentsCard.clientHeight) {
       addMoreStudents();
    }

    footer.style.backgroundColor = "var(--blue)";

    setTimeout(function(){
        footer.style.backgroundColor = "white";
    }, 1000);

});

function addMoreStudents(){
    let maxRows;
    if (selectedGroupCopy.length >= 20) { maxRows = 20 }
    if (selectedGroupCopy.length <= 20) { maxRows = selectedGroupCopy.length }
    if (selectedGroupCopy.length > 0) {
        for (let i = 0; i < maxRows; i++ ) {
            let value = selectedGroupCopy[0] ;
            let key = selectedGroupCopy ;
            let studentMarkup = `
            <tr>
                <td>${value.id}</td>
                <td>${value.first_name}</td>
                <td>${value.last_name}</td>
                <td>${value.p1.toFixed(1)}</td>
                <td>${value.p2.toFixed(1)}</td>
                <td>${value.p3.toFixed(1)}</td>
                <td>${value.p4.toFixed(1)}</td>
                <td>${value.average.toFixed(1)}</td>
                <td>
                    <img class="action_icon" src="./assets/edit.svg" alt="Edit icon">
                    <img class="action_icon" src="./assets/delete.svg" alt="Delete icon">
                </td>
            </tr>
            `

            let student = document.createElement('tr')
            student.setAttribute('id', key)
            student.setAttribute('class', 'student')
            student.innerHTML += studentMarkup;
            studentsTable.appendChild(student)
            
            selectedGroupCopy.shift();
        }
    }

}



// Function to handle form submission and store data in localStorage
document.getElementById('classForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the form values
    const className = document.getElementById('class_name').value;
    const subject = document.getElementById('subject').value;
    const group = document.getElementById('group').value;
    const timing = document.getElementById('timing').value;
    const location = document.getElementById('location').value;

    // Create a class object
    const newClass = {
        className,
        subject,
        group,
        timing,
        location
    };

    // Retrieve existing classes from localStorage, or create an empty array if not found
    let classes = JSON.parse(localStorage.getItem('classes')) || [];

    // Add the new class to the array
    classes.push(newClass);

    // Save the updated class list back to localStorage
    localStorage.setItem('classes', JSON.stringify(classes));

    // Reset the form
    document.getElementById('classForm').reset();

    // Optionally show a message
    alert('Class added successfully!');
});

let localData = {};

getTeacherData();