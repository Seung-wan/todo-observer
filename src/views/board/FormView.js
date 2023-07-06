import { ADD_TODO, todoModel } from '../../models/TodoModel.js';

import { $ } from '../../utils/dom.js';

import { todoView } from '../TodoView.js';

export default class FormView {
  constructor(type) {
    this.type = type;
  }

  bindEvents() {
    const addTodo = $(`.list__form__${this.type}__add`);
    const closeForm = $(`.list__form__${this.type}__close`);
    const textarea = $(`.list__form__${this.type}__textarea`);

    addTodo?.addEventListener('click', this.handleClickAdd.bind(this));
    closeForm?.addEventListener('click', this.handleClickClose.bind(this));
    textarea?.addEventListener('input', this.handleChangeTextarea.bind(this));
  }

  handleClickAdd() {
    const textarea = $(`.list__form__${this.type}__textarea`);

    todoModel.dispatch({ type: ADD_TODO, payload: { todoType: this.type, text: textarea.value } });
  }

  handleClickClose() {
    const board = todoView.getBoard(this.type);

    board.open = false;

    todoView.render();
  }

  handleChangeTextarea(event) {
    const { value } = event.target;

    const addTodoButton = $(`.list__form__${this.type}__add`);

    if (value.length > 1) {
      return;
    }

    if (!value) {
      addTodoButton.classList.remove('active');
      return;
    }

    addTodoButton.classList.add('active');
  }

  getTemplate() {
    return (
      /* HTML */
      `
        <div class="list__form">
          <textarea class="list__form__${this.type}__textarea" placeholder="Enter a note" maxlength="500"></textarea>
          <div class="list__form__button__container">
            <button type="button" class="list__form__${this.type}__add">Add</button>
            <button type="button" class="list__form__${this.type}__close">Cancel</button>
          </div>
        </div>
      `
    );
  }
}
