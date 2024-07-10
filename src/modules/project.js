export default class Project {
    constructor(title) {
        this._title = title;
        this._tasks = [];
    };

    get title() {
        return this._title;
    };

    set title(value) {
        this._title = value;
    };

    get tasks() {
        return this._tasks;
    };

    set tasks(value) {
        this._tasks = value;
    };
};