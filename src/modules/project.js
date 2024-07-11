export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    };

    get projectTitle() {
        return this.title;
    };

    set projectTitle(value) {
        this.title = value;
    };

    get projectTasks() {
        return this.tasks;
    };

    set projectTasks(value) {
        this.tasks = value;
    };
};