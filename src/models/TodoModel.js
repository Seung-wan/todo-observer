import Observable from './Observable.js';

class TodoModel extends Observable {
  todos = [];
  doingTodos = [];
  doneTodos = [];

  addTodoByType(type, todo) {
    const target = this.getTodosByType(type);
    target.unshift(todo);

    this.notify();
  }

  getTodosByType(type) {
    const target = {
      todo: this.todos,
      doing: this.doingTodos,
      done: this.doneTodos,
    }[type];

    return target;
  }

  deleteTodoByType(type, todo) {
    const target = this.getTodosByType(type);

    target = target.filter((_todo) => _todo !== todo);
  }
}

export const todoModel = new TodoModel();
