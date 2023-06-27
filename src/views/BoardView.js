import { todoView } from './TodoView.js';

import { todoModel } from '../models/TodoModel.js';

import { $ } from '../utils/dom.js';

export default class BoardView {
  open = false;

  constructor(type) {
    this.type = type;
    this.title = this.getTypeLabel(type);
    this.todos = todoModel.getTodosByType(this.type);
  }

  bindEvents() {
    const openForm = $(`.list__${this.type}__header__right__open`);
    const addTodo = $(`.list__form__${this.type}__add`);
    const textarea = $(`.list__form__${this.type}__textarea`);
    addTodo?.addEventListener('click', () => todoModel.addTodoByType(this.type, textarea.value));
    openForm.addEventListener('click', this.handleClickOpen.bind(this));
  }

  handleClickOpen() {
    this.open = true;
    todoView.render();
  }

  getTypeLabel(type) {
    const label = {
      todo: '해야할일',
      doing: '하는중',
      done: '다했어',
    }[type];

    return label;
  }

  getTemplate() {
    return (
      /* HTML */
      `
        <div class="list">
          <div class="list__header">
            <div class="list__header__left">
              <div class="list__header__left__count">12</div>
              <div>${this.title}</div>
            </div>
            <div class="list__header__right">
              <div class="list__${this.type}__header__right__open">+</div>
              <div>X</div>
            </div>
          </div>
          ${this.open
            ? `
            <div class="list__form">
              <textarea class="list__form__${this.type}__textarea"></textarea>
              <div>
                <button type="button" class="list__form__${this.type}__add">
                  Add
                </button>
                <button type="button">Cancel</button>
              </div>
            </div>
            `
            : ''}

          <ul class="list__cardContainer">
            ${this.todos
              .map((todo) => {
                return (
                  /* HTML */
                  `
                    <li class="list__cardContainer__card">
                      <div class="list__cardContainer__card__title">
                        <div>${todo}</div>
                        <div>X</div>
                      </div>
                      <div class="list__cardContainer__card__date">2023-06-21</div>
                    </li>
                  `
                );
              })
              .join('')}
          </ul>
        </div>
      `
    );
  }
}
