import { todoView } from '../TodoView.js';

import { $ } from '../../utils/dom.js';
import { TodoType } from '../../models/TodoModel.js';

export default class HeaderView {
  todos: string[];
  title: string;
  type: TodoType;

  constructor(todos: string[], title: string, type: TodoType) {
    this.todos = todos;
    this.title = title;
    this.type = type;
  }

  bindEvents() {
    const openForm = $(`.list__${this.type}__header__right__open__button`) as HTMLButtonElement;

    openForm.addEventListener('click', this.handleClickOpen.bind(this));
  }

  handleClickOpen() {
    const board = todoView.getBoard(this.type);

    board.open = !board.open;

    todoView.render();
  }

  getTemplate() {
    return (
      /* HTML */
      `
        <div class="list__header">
          <div class="list__header__left">
            <div class="list__header__left__count">${this.todos.length}</div>
            <div>${this.title}</div>
          </div>
          <div class="list__header__right">
            <button type="button" class="list__${this.type}__header__right__open__button open-button">
              <svg
                class="list__${this.type}__header__right__open__icon open-icon"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  class="plus"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                />
              </svg>
            </button>
            <button type="button" class="list__header__right__close__button">
              <img class="list__${this.type}__header__right__close close-icon" src="src/assets/svgs/xMark.svg" alt="" />
            </button>
          </div>
        </div>
      `
    );
  }
}
