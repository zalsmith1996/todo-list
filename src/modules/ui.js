import { addProject } from './storage.js';

// DOM elements included in case HTML file
const d = document;
const newProjectPopup = d.querySelector('.new-project-popup');

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
    });
};