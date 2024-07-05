import Project from './project.js';
import Task from './task.js';

const d = document;
const projectListing = d.querySelector('.projects');
let projects = [];

// Create default project list and store in localStorage

if (localStorage.getItem('projects') === null) {
    projects = [new Project('Default', {'Example Task': new Task('Example Task', '2024/09/17', 'Example description')})];
    updateProjects(projects);
} else {
    projects = JSON.parse(localStorage.getItem('projects'));
    updateProjects(projects);
}



export function updateProjects(projectArray) {
    localStorage.setItem('projects', JSON.stringify(projectArray));

    projectListing.innerHTML = '';

    for (const project of projects) {
        const projectButton = d.createElement('button');
        const listing = d.createElement('p');
        const deleteIcon = d.createElement('img');

        deleteIcon.setAttribute('src', '/assets/delete.svg');

        projectButton.classList.add('project-listing');
        listing.classList.add('project-listing-title');
        deleteIcon.classList.add('delete-project-listing');
        listing.textContent = project.title;

        projectButton.appendChild(listing);
        projectButton.appendChild(deleteIcon);
        projectListing.append(projectButton);
    }
};

export function addProject() {
    let projectName = d.querySelector('.project-title');
    projects.push(new Project(projectName.value, {}));
    updateProjects(projects);
    projectName.value = '';
};

export function getProjectName(event) {
    // Closest does not take sibling elements into account,
    // Use closest to find parent button, then querySelector to find sibling element
    return event.target.closest('button').querySelector('.project-listing-title').textContent;
};

export function deleteProjectForm(projectName) {
    const projectDeleteMessage = d.querySelector('.project-delete-message');
    projectDeleteMessage.textContent = `Delete ${projectName}?`;
};

export function deleteProject(chosenProjectName) {   
    const currentProjectList = JSON.parse(localStorage.getItem('projects'));
    delete currentProjectList[chosenProjectName];

    // above is not working, instead:
    // look through each index and find the title that matches the chosenProjectName, then delete that


    localStorage.setItem('projects', JSON.stringify(currentProjectList));
    updateProjects(currentProjectList);
    console.log(currentProjectList);
};


// When a project is active (being displayed) add a delete button to the bottom of the task display window