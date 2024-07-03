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
        const projectDiv = d.createElement('div');
        const listing = d.createElement('p');
        projectDiv.classList.add('project-listing');
        listing.classList.add('project-listing-title');
        listing.textContent = project.title;

        projectDiv.appendChild(listing);
        projectListing.append(projectDiv);
    }
};

export function addProject() {
    let projectName = d.querySelector('.project-title');
    projects.push(new Project(projectName.value, {}));
    updateProjects(projects);
    projectName.value = '';
};


// When a project is active (being displayed) add a delete button to the bottom of the task display window