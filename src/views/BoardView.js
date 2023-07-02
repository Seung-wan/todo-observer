import { todoView } from './TodoView.js';

import { todoModel } from '../models/TodoModel.js';

import { $, $all } from '../utils/dom.js';

export default class BoardView {
  open = false;
  editModalOpen = false;
  selectedTodoIndex = null;

  constructor(type) {
    this.type = type;
    this.title = this.getTypeLabel(type);
    this.todos = todoModel.getTodosByType(this.type);
  }

  bindEvents() {
    const openForm = $(`.list__${this.type}__header__right__open__button`);
    const addTodo = $(`.list__form__${this.type}__add`);
    const deleteTodos = Array.from($all(`.list__cardContainer__card__title__${this.type}__delete`));
    const closeTodo = $(`.list__form__${this.type}__close`);
    const textarea = $(`.list__form__${this.type}__textarea`);
    const cards = Array.from($all(`.${this.type}__card`));
    const editTodos = Array.from($all('.edit__button'));
    const editTextarea = $('.edit__textarea');
    const closeModalButton = $(`.close__${this.type}__button`);
    $('.list__cardContainer__card')?.addEventListener('dragstart', () => {});
    addTodo?.addEventListener('click', () => todoModel.addTodoByType(this.type, textarea.value));
    deleteTodos.forEach((deleteTodo) => {
      deleteTodo?.addEventListener('click', this.handleClickDelete.bind(this));
    });
    closeTodo?.addEventListener('click', this.handleClickClose.bind(this));
    textarea?.addEventListener('input', this.handleChangeTextarea.bind(this));
    openForm.addEventListener('click', this.handleClickToggle.bind(this));
    cards?.forEach((card) => {
      card?.addEventListener('dblclick', this.handleClickCard.bind(this));
    });
    editTodos?.forEach((editTodo) => {
      editTodo?.addEventListener('click', this.handleClickEdit.bind(this));
    });
    editTextarea?.addEventListener('input', this.handleChangeEditTextarea.bind(this));
    closeModalButton?.addEventListener('click', this.handleClickCloseModalButton.bind(this));
  }

  handleClickToggle() {
    this.open = !this.open;
    todoView.render();
  }
  handleClickClose() {
    this.open = false;
    todoView.render();
  }

  handleClickDelete(event) {
    if (window.confirm('선택하신 카드를 삭제하시겠습니까?')) {
      const targetIndex = event.currentTarget.dataset.index;

      todoModel.deleteTodoByType(this.type, targetIndex);
    }
  }

  handleClickCard(event) {
    this.selectedTodoIndex = event.currentTarget.dataset.index;
    this.editModalOpen = true;
    todoView.render();
  }

  handleClickEdit() {
    const editTextarea = $('.edit__textarea');
    this.editModalOpen = false;
    todoModel.changeTodoByType(this.type, this.selectedTodoIndex, editTextarea.value);
    todoView.render();
  }

  handleClickCloseModalButton() {
    this.editModalOpen = false;
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

  handleChangeEditTextarea(event) {
    const { value } = event.target;

    const editTodoButton = $(`.edit__button`);

    if (value.length > 1) {
      return;
    }

    if (!value) {
      editTodoButton.classList.remove('active');
      return;
    }

    editTodoButton.classList.add('active');
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
                <img
                  class="list__${this.type}__header__right__close close-icon"
                  src="src/assets/svgs/xMark.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
          ${this.open
            ? `
            <div class="list__form">
              <textarea class="list__form__${this.type}__textarea" placeholder="Enter a note" maxlength="500"></textarea>
              <div class="list__form__button__container">
                <button type="button" class="list__form__${this.type}__add">
                  Add
                </button>
                <button type="button" class="list__form__${this.type}__close">Cancel</button>
              </div>
            </div>
            `
            : ''}

          <ul class="list__cardContainer">
            ${this.todos
              .map((todo, index) => {
                return (
                  /* HTML */
                  `
                    <li class="list__cardContainer__card ${this.type}__card" draggable="true" data-index=${index}>
                      <div class="list__cardContainer__card__title">
                        <div class="list__cardContainer__card__title__left">
                          <img src="src/assets/svgs/paper.svg" alt="" />
                          <div>${todo}</div>
                        </div>
                        <button class="list__cardContainer__card__title__${this.type}__delete" data-index=${index}>
                          <img src="src/assets/svgs/xMark.svg" alt="" />
                        </button>
                      </div>
                      <div class="list__cardContainer__card__date">2023-06-21</div>
                    </li>
                  `
                );
              })
              .join('')}
          </ul>
        </div>

        ${this.editModalOpen
          ? /* HTML */
            `<div class="modal__container">
              <div class="modal__content">
                <div class="modal__header">
                  <div>Edit note</div>
                  <button type="button" class="close__${this.type}__button">
                    <img src="src/assets/svgs/xMark.svg" />
                  </button>
                </div>
                <div class="modal__body">
                  <div>Note</div>
                  <textarea class="edit__textarea" maxlength="500"></textarea>
                  <div class="modal__footer">
                    <button type="button" class="edit__button">Save note</button>
                  </div>
                </div>
              </div>
            </div>`
          : ''}
      `
    );
  }
}
