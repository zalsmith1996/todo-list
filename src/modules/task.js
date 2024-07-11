export default class Task{ 
    constructor(name, dueDate, description) {
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
    };

    get taskName() {
        return this.name;
    };

    set taskName(value) {
        this._name = value;
    };

    get taskDueDate() {
        return this.dueDate;
    };

    set taskDueDate(value) {
        this._dueDate = value;
    };

    get taskDescription() {
        return this.description;
    };

    set taskDescription(value) {
        this._description = value;
    };
};