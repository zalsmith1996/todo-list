import Project from './project.js';
import Task from './task.js';

const d = document;
const projectListing = d.getElementById('projects');
const taskListing = d.getElementById('tasks');
let projects = [];

// Create default project list and store in localStorage
if (localStorage.getItem('projects') === null) {
    projects[0] = new Project('Default');
    projects[0].tasks.push(new Task('Example task', '2024-09-17', 'Example description'));
    projects[0].tasks.push(new Task('Example task 2', '2024-09-17', 'Example description 2'));
    updateProjects(projects);
} else {
    projects = JSON.parse(localStorage.getItem('projects'));
    updateProjects(projects);
};

function updateProjects(projectArray) {
    // Remove all previously listed projects to update DOM
    projectListing.innerHTML = '';

    localStorage.setItem('projects', JSON.stringify(projectArray));

    for (const project of projects) {
        const projectButton = d.createElement('button');
        const deleteIcon = d.createElement('img');

        deleteIcon.setAttribute('src', 'assets/delete.svg');

        projectButton.classList.add('project-listing');
        deleteIcon.classList.add('delete-project-listing');
        projectButton.textContent = project.title;

        projectButton.appendChild(deleteIcon);
        projectListing.appendChild(projectButton);
    };
};

export function addProject() {
    let projectName = d.querySelector('.project-title');
    projects.push(new Project(projectName.value));
    updateProjects(projects);
    projectName.value = '';
};

export function getProjectName(event) {
    return event.target.closest('button').textContent;
};

export function deleteProjectForm(projectName) {
    const projectDeleteMessage = d.querySelector('.project-delete-message');
    projectDeleteMessage.textContent = `Delete ${projectName}?`;
};

export function deleteProject(chosenProjectName) {
    const currentProjectList = JSON.parse(localStorage.getItem('projects'));
    let projectIndex;
    for (const project of currentProjectList) {
        if (project.title === chosenProjectName) {
            projectIndex = currentProjectList.indexOf(project);
        };
    };
    currentProjectList.splice(currentProjectList.indexOf(projectIndex), 1);
    updateProjects(currentProjectList);
};

export function displayCurrentProject(selectedProject = 'Default') {
    const selectedProjectTitle = d.querySelector('.current-project-title');
    const projectInfoDiv = d.querySelector('.current-project-header');

    projectInfoDiv.style.display = 'flex';
    selectedProjectTitle.textContent = selectedProject;
    displayCurrentTasks();
};

function updateTasks(projectArray) {
    // New tasks have been pushed to projects array,
    // Updating projects in localStorage also updates tasks
    localStorage.setItem('projects', JSON.stringify(projectArray));

    displayCurrentTasks();
};

function displayCurrentTasks() {
    taskListing.innerHTML = '';

    const projectList = JSON.parse(localStorage.getItem('projects'));
    const currentProject = d.querySelector('.current-project-title').textContent;

    let projectIndex;
    for (const project of projectList) {
        if (project.title === currentProject) {
            projectIndex = projectList.indexOf(project);
        };
    };

    for (const task of projectList[projectIndex].tasks) {
        const taskCard = d.createElement('div');
        taskCard.classList.add('task-card');

        taskCard.innerHTML = `
            <h3 class="task-card-title">${task.name}</h3>
            <h5 class="task-card-date">${task.dueDate}</h5>
            <textarea class="task-card-descr" readOnly>${task.description}</textarea>
            <div class="task-card-btns">
                <button class="task-edit-btn" type="submit">Edit</button>
                <button class="task-delete-btn" type="submit">Delete</button>
            </div>
        `;

        taskListing.append(taskCard);
        console.log(task.name);
    };
};

export function addTask() {
    const currentProject = d.querySelector('.current-project-title').textContent;
    const currentProjectList = JSON.parse(localStorage.getItem('projects'));
    let projectIndex;

    for (const project of currentProjectList) {
        if (project.title === currentProject) {
            projectIndex = currentProjectList.indexOf(project);
        };
    };

    const taskTitle = d.querySelector('.task-title');
    const taskDueDate = d.querySelector('.task-date-input');
    const taskDescription = d.querySelector('.task-description');

    currentProjectList[projectIndex].tasks.push(new Task(taskTitle.value, taskDueDate.value, taskDescription.value));

    updateTasks(currentProjectList);
};

export function editTask() {

};

export function deleteTask(e) {
    const currentProject = d.querySelector('.current-project-title').textContent;
    const currentTask = e.target.closest('.task-card').querySelector('.task-card-title').textContent;
    const currentProjectList = JSON.parse(localStorage.getItem('projects'));
    let projectIndex;

    for (const project of currentProjectList) {
        if (project.title === currentProject) {
            projectIndex = currentProjectList.indexOf(project);
        };
    };

    let taskIndex;
    for (const task of currentProjectList[projectIndex].tasks) {
        if (task.name === currentTask) {
            taskIndex = currentProjectList[projectIndex].tasks.indexOf(task);
        };
    };

    currentProjectList[projectIndex].tasks.splice(currentProjectList[projectIndex].tasks.indexOf(taskIndex), 1);

    updateTasks(currentProjectList);
};
