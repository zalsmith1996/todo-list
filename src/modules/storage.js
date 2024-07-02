import Project from './project.js';
import Task from './task.js';

// Create default project list and store in localStorage
const projects = [new Project('Default', {'Example Task': new Task('Example Task', '2024/09/17', 'Example description')})];
updateProjects(projects);

    // Check to see if localStorage.projects exists, 
    // If yes, use what is store to populate UI,
    // If no, generate default project list and store in localStorage as a key/value "projects"/{} 
    // {} value will be used to store projects as key/value with projectName/{tasks}

export function updateProjects(projectArray) {
    localStorage.setItem('projects', JSON.stringify(projectArray));
    console.log(JSON.parse(localStorage.getItem('projects')));
}