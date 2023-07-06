import { ADD_TODO, DELETE_TODO, todoModel } from '../models/TodoModel.js';

import HeaderView from './board/HeaderView.js';
import FormView from './board/FormView.js';
import ItemView from './board/ItemView.js';
import EditModalView from './board/EditModalView.js';
import { $, $all } from '../utils/dom.js';

function getTypeLabel(type) {
  const label = {
    todo: '해야할일',
    doing: '하는중',
    done: '다했어',
  }[type];

  return label;
}

export default class BoardView {
  open = false;
  editModalOpen = false;
  selectedTodoIndex = null;

  constructor(type) {
    this.type = type;
    this.title = getTypeLabel(type);
    this.todos = todoModel.state[this.type];

    this.headerView = new HeaderView(this.todos, this.title, this.type);
    this.formView = new FormView(this.type);
    this.itemView = new ItemView(this.type);
    this.editModalView = new EditModalView(this.type);
  }

  get selectedTodoIndex() {
    return this.selectedTodoIndex;
  }

  get open() {
    return this.open;
  }

  set open(bool) {
    this.open = bool;
  }

  set editModalOpen(bool) {
    this.editModalOpen = bool;
  }

  bindEvents() {
    this.headerView.bindEvents();
    this.formView.bindEvents();
    this.itemView.bindEvents();
    this.editModalView.bindEvents();

    const container = $(`.${this.type}__list`);

    container.addEventListener('dragover', this.handleDragover.bind(this, container));
    container.addEventListener('drop', this.handleDrop.bind(this, container));
  }

  handleDragover(container, event) {
    event.preventDefault();

    const dragging = $('.dragging');
    container.appendChild(dragging);
  }

  handleDrop(container, event) {
    event.preventDefault();

    const dragging = $('.dragging');
    const containerType = container.dataset.type;

    const type = dragging.dataset.type;
    const index = dragging.dataset.index;

    const todo = todoModel.state[this.type][index];

    todoModel.dispatch({ type: ADD_TODO, payload: { todoType: containerType, text: todo } });
    todoModel.dispatch({ type: DELETE_TODO, payload: { todoType: type, index } });
  }

  getTemplate() {
    return (
      /* HTML */
      `
        <div class="${this.type}__list list" data-type=${this.type}>
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
const boardView = new BoardView();
