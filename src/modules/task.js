export default class Task{ 
    constructor(name, dueDate, description) {
        this._name = name;
        this._dueDate = dueDate;
        this._description = description;
    };

    get name() {
        return this._name;
    };

    set name(value) {
        this._name = value;
    };

    get dueDate() {
        return this._dueDate;
    };

    set dueDate(value) {
        this._dueDate = value;
    };

    get description() {
        return this._description;
    };

    set description(value) {
        this._description = valule;
    };
};