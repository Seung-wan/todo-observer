// TodoView.js

import BoardView from './BoardView.js';

import { $ } from '../utils/dom.js';
import { todoModel } from '../models/TodoModel.js';

export default class TodoView {
  constructor() {
    this.todoBoard = new BoardView('todo');
    this.doingBoard = new BoardView('doing');
    this.doneBoard = new BoardView('done');

    todoModel.subscribe(this.render.bind(this));
  }

  render() {
    console.log('render');
    const app = $('#root');
    app.innerHTML = this.getTemplate();

    this.todoBoard.bindEvents();
    this.doingBoard.bindEvents();
    this.doneBoard.bindEvents();
  }

  getTemplate() {
    return (
      /* HTML */
      `
        <div class="listContainer">
          <div>${this.todoBoard.getTemplate()}</div>
          <div>${this.doingBoard.getTemplate()}</div>
          <div>${this.doneBoard.getTemplate()}</div>
        </div>
      `
    );
  }
}

export const todoView = new TodoView();
