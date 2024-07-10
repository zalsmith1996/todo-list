import Project from './project.js';
import Task from './task.js';

const d = document;
const projectListing = d.querySelector('.projects');
let projects = [];

// Create default project list and store in localStorage
if (localStorage.getItem('projects') === null) {
    projects[0] = new Project('Default');
    projects[0].tasks.push(new Task('Example task', '2024/09/17', 'Example description'));
    projects[0].tasks.push(new Task('Example task 2', '2024/09/17', 'Example description 2'));
    updateProjects(projects);
} else {
    projects = JSON.parse(localStorage.getItem('projects'));
    updateProjects(projects);
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

        console.log(projects);
    }
};

// export function addProject() {
//     let projectName = d.querySelector('.project-title');
//     //projects.push(new Project(projectName.value, {}));





//     updateProjects(projects);
//     projectName.value = '';
// };

// export function getProjectName(event) {
//     // Closest does not take sibling elements into account,
//     // Use closest to find parent button, then querySelector to find sibling element
//     return event.target.closest('button').textContent;
// };

// export function deleteProjectForm(projectName) {
//     const projectDeleteMessage = d.querySelector('.project-delete-message');
//     projectDeleteMessage.textContent = `Delete ${projectName}?`;
// };

// export function deleteProject(chosenProjectName) {   
//     const currentProjectList = JSON.parse(localStorage.getItem('projects'));
//     let projectIndex;
//     for (const project of currentProjectList) {
//         if (project.title === chosenProjectName) {
//             projectIndex = currentProjectList.indexOf(project);
//         };
//     };

//     currentProjectList.splice(currentProjectList.indexOf(projectIndex), 1);
//     updateProjects(currentProjectList);
//     location.reload();
// };

// export function displayCurrentProject(selectedProject) {
//     const selectedProjectTitle = d.querySelector('.current-project-title');
//     const projectInfoDiv = d.querySelector('.current-project-header');

//     projectInfoDiv.style.display = 'flex';

//     selectedProjectTitle.textContent = selectedProject;


//     // add functionality that shows current tasks associated with display project if they exist
// };

// export function addTask() {
//     const currentProject = d.querySelector('.current-project-title').textContent;
//     const currentProjectList = JSON.parse(localStorage.getItem('projects'));

//     let projectIndex;
//     for (const project of currentProjectList) {
//         if (project.title === currentProject) {
//             projectIndex = currentProjectList.indexOf(project);
//         };
//     };

//     const taskTitle = d.querySelector('.task-title');
//     const taskDueDate = d.querySelector('.task-date-input');
//     const taskDescription = d.querySelector('.task-description');

//    // currentProjectList[projectIndex].push(new Task(taskTitle.value, taskDueDate, taskDescription));
    
//     //console.log(currentProject, projectIndex, currentProjectList);

//     console.log(currentProjectList[0].task.taskTitle);
// }