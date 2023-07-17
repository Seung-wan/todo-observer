import BoardView from './BoardView.js';

import { $ } from '../utils/dom.js';
import { TodoType, todoModel } from '../models/TodoModel.js';

export default class TodoView {
  todoBoard: BoardView;
  doingBoard: BoardView;
  doneBoard: BoardView;

  constructor() {
    this.todoBoard = new BoardView('todo');
    this.doingBoard = new BoardView('doing');
    this.doneBoard = new BoardView('done');

    todoModel.subscribe(this.render.bind(this));
  }

  getBoard(type: TodoType) {
    const board = {
      todo: this.todoBoard,
      doing: this.doingBoard,
      done: this.doneBoard,
    }[type];

    return board;
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

  render() {
    const app = $('#root') as HTMLElement;
    app.innerHTML = this.getTemplate();

    this.todoBoard.bindEvents();
    this.doingBoard.bindEvents();
    this.doneBoard.bindEvents();
  }
}

export const todoView = new TodoView();
