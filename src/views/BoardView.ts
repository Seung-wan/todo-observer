import { ADD_TODO, DELETE_TODO, TodoType, todoModel } from '../models/TodoModel.js';

import HeaderView from './board/HeaderView.js';
import FormView from './board/FormView.js';
import ItemView from './board/ItemView.js';
import EditModalView from './board/EditModalView.js';

import { $ } from '../utils/dom.js';

function getTypeLabel(type: TodoType) {
  const label = {
    todo: '해야할일',
    doing: '하는중',
    done: '다했어',
  }[type];

  return label;
}

export default class BoardView {
  private _open = false;
  private _editModalOpen = false;
  private _selectedTodoIndex: number = 0;
  type: TodoType;
  title: string;
  todos: string[];

  headerView: HeaderView;
  formView: FormView;
  itemView: ItemView;
  editModalView: EditModalView;

  constructor(type: TodoType) {
    this.type = type;
    this.title = getTypeLabel(type);
    this.todos = todoModel.state[this.type];

    this.headerView = new HeaderView(this.todos, this.title, this.type);
    this.formView = new FormView(this.type);
    this.itemView = new ItemView(this.type);
    this.editModalView = new EditModalView(this.type);
  }

  get selectedTodoIndex() {
    return this._selectedTodoIndex;
  }

  set selectedTodoIndex(index: number) {
    this._selectedTodoIndex = index;
  }

  get open() {
    return this._open;
  }

  set open(bool: boolean) {
    this._open = bool;
  }

  set editModalOpen(bool: boolean) {
    this._editModalOpen = bool;
  }

  bindEvents() {
    this.headerView.bindEvents();
    this.formView.bindEvents();
    this.itemView.bindEvents();
    this.editModalView.bindEvents();

    const container = $(`.${this.type}__list`) as HTMLElement;

    container.addEventListener('dragover', this.handleDragover.bind(this, container));
    container.addEventListener('drop', this.handleDrop.bind(this, container));
  }

  handleDragover(container: HTMLElement, event: Event) {
    event.preventDefault();

    const dragging = $('.dragging')!;
    container.appendChild(dragging);
  }

  handleDrop(container: HTMLElement, event: Event) {
    event.preventDefault();

    const dragging = $('.dragging') as HTMLElement;
    const containerType = container.dataset.type as TodoType;

    const type = dragging.dataset.type as TodoType;
    const index = Number(dragging.dataset.index);

    const todo = todoModel.state[type][index];

    todoModel.dispatch({
      type: ADD_TODO,
      payload: { _brand: 'add', todoType: containerType, text: todo, order: 'back' },
    });
    todoModel.dispatch({ type: DELETE_TODO, payload: { _brand: 'delete', todoType: type, index } });
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
