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

  changeTodoByType(type, targetIndex, newTitle) {
    let target = this.getTodosByType(type);
    target[targetIndex] = newTitle;

    this.notify();
  }

  deleteTodoByType(type, targetIndex) {
    let target = this.getTodosByType(type);
    target.splice(targetIndex, 1);

    this.notify();
  }
}

export const todoModel = new TodoModel();
