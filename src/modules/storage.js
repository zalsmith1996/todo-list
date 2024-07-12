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
    displayCurrentProject();
} else {
    projects = JSON.parse(localStorage.getItem('projects'));
    updateProjects(projects);
    displayCurrentProject();
}

export function updateProjects(projectArray) {
    // Remove all previously listed projects in order to update DOM
    projectListing.innerHTML = '';

    localStorage.setItem('projects', JSON.stringify(projectArray));

    for (const project of projects) {
        const projectButton = d.createElement('button');
        const deleteIcon = d.createElement('img');

        deleteIcon.setAttribute('src', '/assets/delete.svg');

        projectButton.classList.add('project-listing');
        deleteIcon.classList.add('delete-project-listing');
        projectButton.textContent = project.title;

        projectButton.appendChild(deleteIcon);
        projectListing.append(projectButton);
    };

    updateTasks(projectArray);
};

export function updateTasks(projectArray) {
    // Remove all previously listed tasks in order to update DOM
    let childElement = taskListing.lastElementChild;

    while (childElement) {
        taskListing.removeChild(childElement);
        childElement.taskListing.lastElementChild;
    };

    // New tasks will have been pushed into projects array,
    // Updating projects in localStorage also updates tasks
    localStorage.setItem('projects', JSON.stringify(projectArray));

    // double nested for loop to go through tasks and add to .tasks container
    for (const project of projects) {
        for (const task of project.tasks) {
            const taskCard = d.createElement('div');
            const taskCardTitle = d.createElement('h3');
            const taskCardDate = d.createElement('h5');
            const taskCardDescr = d.createElement('textarea');
            const taskCardBtns = d.createElement('div');
            const taskEditBtn = d.createElement('button');
            const taskDeleteBtn = d.createElement('button');

            taskCard.classList.add('task-card');
            taskCardTitle.classList.add('task-card-title');
            taskCardDate.classList.add('task-card-date');
            taskCardDescr.classList.add('task-card-descr');
            taskCardBtns.classList.add('task-card-btns');
            taskEditBtn.classList.add('task-edit-btn');
            taskDeleteBtn.classList.add('task-delete-btn');

            const taskTitle = task.name;
            const taskDate = task.dueDate;
            const taskDescr = task.description;

            taskCardTitle.textContent = taskTitle;
            taskCardDate.textContent = taskDate;
            taskCardDescr.textContent = taskDescr;

            taskCardDescr.readOnly = true;
            taskEditBtn.textContent = 'Edit';
            taskDeleteBtn.textContent = 'Delete';
            
            taskCardBtns.appendChild(taskEditBtn);
            taskCardBtns.appendChild(taskDeleteBtn);
            taskCard.appendChild(taskCardTitle);
            taskCard.appendChild(taskCardDate);
            taskCard.appendChild(taskCardDescr);
            taskCard.appendChild(taskCardBtns);
            taskListing.appendChild(taskCard);
        };
    };
};

export function addProject() {
    let projectName = d.querySelector('.project-title');
    projects.push(new Project(projectName.value));
    updateProjects(projects);
    projectName.value = '';
};

export function getProjectName(event) {
    // Closest does not take sibling elements into account,
    // Use closest to find parent button, then querySelector to find sibling element
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
    location.reload();
};

export function displayCurrentProject(selectedProject) {
    const selectedProjectTitle = d.querySelector('.current-project-title');
    const projectInfoDiv = d.querySelector('.current-project-header');

    projectInfoDiv.style.display = 'flex';

    selectedProjectTitle.textContent = selectedProject;

    // Displays tasks currently stored in selectedProject
    updateTasks(projects);
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

    projects[projectIndex].tasks.push(new Task(taskTitle.value, taskDueDate.value, taskDescription.value));

    updateTasks(projects);

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
    for (const task of projects[projectIndex].tasks) {
        if (task.name === currentTask) {
            taskIndex = projects[projectIndex].tasks.indexOf(task);
        }
        projects[projectIndex].tasks.splice(projects[projectIndex].tasks.indexOf(taskIndex), 1);
    };

    updateProjects(currentProjectList);
    updateTasks(currentProjectList);
    location.reload();
};

export function editTask() {

}