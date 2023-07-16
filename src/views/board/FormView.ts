import { ADD_TODO, TodoType, todoModel } from '../../models/TodoModel.js';

import { $ } from '../../utils/dom.js';

import { todoView } from '../TodoView.js';

export default class FormView {
  type: TodoType;

  constructor(type: TodoType) {
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
    const textarea = $(`.list__form__${this.type}__textarea`) as HTMLTextAreaElement;

    todoModel.dispatch({
      type: ADD_TODO,
      payload: { _brand: 'add', todoType: this.type, text: textarea.value, order: 'front' },
    });
  }

  handleClickClose() {
    const board = todoView.getBoard(this.type);

    board.open = false;

    todoView.render();
  }

  handleChangeTextarea(event: any) {
    const { value } = event.target;

    const addTodoButton = $(`.list__form__${this.type}__add`) as HTMLButtonElement;

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
