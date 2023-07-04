import { todoView } from './TodoView.js';

import { ADD_TODO, CHANGE_TODO, DELETE_TODO, todoModel } from '../models/TodoModel.js';

import HeaderView from './board/HeaderView.js';
import FormView from './board/FormView.js';
import ItemView from './board/ItemView.js';
import EditModalView from './board/EditModalView.js';

import { $, $all } from '../utils/dom.js';

export default class BoardView {
  open = false;
  editModalOpen = false;
  selectedTodoIndex = null;

  constructor(type) {
    this.type = type;
    this.title = this.getTypeLabel(type);
    this.todos = todoModel.state[this.type];

    this.headerView = new HeaderView(this.todos, this.title, this.type);
    this.formView = new FormView(this.type);
    this.itemView = new ItemView(this.type);
    this.editModalView = new EditModalView(this.type);
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

    addTodo?.addEventListener('click', this.handleClickAdd.bind(this));
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

  handleClickAdd() {
    const textarea = $(`.list__form__${this.type}__textarea`);
    todoModel.dispatch({ type: ADD_TODO, payload: { todoType: this.type, text: textarea.value } });
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

      todoModel.dispatch({ type: DELETE_TODO, payload: { todoType: this.type, index: targetIndex } });
    }
  }

  handleClickCard(event) {
    this.selectedTodoIndex = event.currentTarget.dataset.index;
    this.editModalOpen = true;
    todoView.render();
  }

  handleClickEdit() {
    const editTextarea = $('.edit__textarea');
    todoModel.dispatch({
      type: CHANGE_TODO,
      payload: { todoType: this.type, index: this.selectedTodoIndex, text: editTextarea.value },
    });
    this.editModalOpen = false;
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
          ${this.headerView.getTemplate()}
          ${this.open
            ? ` ${this.formView.getTemplate()}
               `
            : ''}

          <ul class="list__cardContainer">
            ${this.todos
              .map((todo, index) => {
                return this.itemView.getTemplate(todo, index);
              })
              .join('')}
          </ul>
        </div>
        ${this.editModalOpen ? this.editModalView.getTemplate() : ''}
      `
    );
  }
}
