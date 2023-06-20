import BoardView from './BoardView.js';

import { $ } from '../utils/dom.js';

export default class TodoView {
  constructor() {
    this.todoBoard = new BoardView('todo');
    this.doingBoard = new BoardView('doing');
    this.doneBoard = new BoardView('done');
  }

  render() {
    const app = $('#root');

    app.innerHTML = this.getTemplate();
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
