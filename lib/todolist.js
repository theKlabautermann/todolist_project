const Todo = require('./todo.js');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(newTask) {
    if (!(newTask instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    } else {
      this.todos.push(newTask);
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(task => task.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(task => task.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let selectedTodos = new TodoList(`${this.title}`);
    this.forEach(task => {
      if (callback(task)) selectedTodos.add(task);
    });
    return selectedTodos;
  }

  findByTitle(title) {
    return this.filter(task => task.getTitle() === title).first();
  }

  allDone() {
    return this.filter(task => task.isDone());
  }

  allNotDone() {
    return this.filter(task => !(task.isDone()));
  }

  markDone(title) {
    let task = this.findByTitle(title);
    if (task !== undefined) task.markDone();
  }

  markAllDone() {
    this.forEach(task => task.markDone());
  }

  markAllUndone() {
    this.forEach(task => task.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;