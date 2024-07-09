import { addProject, deleteProjectForm, deleteProject, getProjectName, displayCurrentProject, addTask } from './storage.js';

// DOM elements included in case HTML file
const d = document;
const newProjectPopup = d.querySelector('.new-project-popup');
const deleteProjectPopup = d.querySelector('.project-delete');
const newTaskPopup = d.querySelector('.new-task-popup');

let currentProjectName;

export function render() {
    //place event listeners here, call in index.js
    d.body.addEventListener('click', (e) => {
        if (e.target.matches('.new-project-btn')) {
            newProjectPopup.style.display = 'block';
        }
        if (e.target.matches('.project-add-yes')) {
            e.preventDefault();
            addProject();
            newProjectPopup.style.display = 'none';
        }
        if (e.target.matches('.project-add-no')) {
            e.preventDefault();
            newProjectPopup.style.display = 'none';
        }
        if (e.target.matches('.delete-project-listing')) {
            currentProjectName = getProjectName(e);
            deleteProjectForm(currentProjectName);
            deleteProjectPopup.style.display = 'block';
        }
        if (e.target.matches('.project-delete-yes')) {
            e.preventDefault();
            deleteProject(currentProjectName);
            deleteProjectPopup.style.display = 'none';
        }
        if (e.target.matches('.project-delete-no')) {
            e.preventDefault();
            deleteProjectPopup.style.display = 'none';
        }
        if (e.target.matches('.project-listing')) {
            e.preventDefault();
            currentProjectName = getProjectName(e);
            displayCurrentProject(currentProjectName);
        }
        if (e.target.matches('.new-task-btn')) {
            e.preventDefault();
            newTaskPopup.style.display = 'block';
        }
        if (e.target.matches('.task-add-yes')) {
            e.preventDefault();
            addTask();
            newTaskPopup.style.display = 'none';
        }
        if (e.target.matches('.task-add-no')) {
            e.preventDefault();
            newTaskPopup.style.display = 'none';
        }
    });
};