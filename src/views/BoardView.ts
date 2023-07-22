import { ADD_TODO, DELETE_TODO, TodoType, todoModel } from '../models/TodoModel.js';

import HeaderView from './board/HeaderView.js';
import FormView from './board/FormView.js';
import ItemView from './board/ItemView.js';
import EditModalView from './board/EditModalView.js';

import { $, $all } from '../utils/dom.js';

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

    const container = $(`.${this.type}__list__cardContainer`) as HTMLElement;

    container.addEventListener('dragover', this.handleDragover.bind(this));
  }

  getDragAfterElement(container: HTMLElement, y: number) {
    const draggableElements = [...$all('.draggable:not(.dragging)', container)];

    const elements = draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect(); //해당 엘리먼트에 top값, height값 담겨져 있는 메소드를 호출해 box변수에 할당
        const offset = y - box.top - box.height / 2; //수직 좌표 - top값 - height값 / 2의 연산을 통해서 offset변수에 할당
        if (offset < 0 && offset > closest.offset) {
          // (예외 처리) 0 이하 와, 음의 무한대 사이에 조건
          return { offset: offset, element: child }; // Element를 리턴
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ) as any;

    return elements.element;
  }

  handleDragover(event: any) {
    event.preventDefault();

    const dragging = $('.dragging') as HTMLElement;
    const containerType = event.target.dataset.type as TodoType;

    const type = dragging.dataset.type as TodoType;
    const index = Number(dragging.dataset.index);

    // console.log('containerType ===', containerType);
    // console.log('type ===', type);

    if (containerType === type) {
      return;
    }

    const todo = todoModel.state[type][index];

    todoModel.dispatch({
      type: ADD_TODO,
      payload: { _brand: 'add', todoType: containerType, text: todo, order: 'back' },
    });
    todoModel.dispatch({ type: DELETE_TODO, payload: { _brand: 'delete', todoType: type, index } });

    // container.appendChild(dragging);
  }

  getTemplate() {
    return (
      /* HTML */
      `
        <div class="${this.type}__list list">
          ${this.headerView.getTemplate()}
          ${this.open
            ? ` ${this.formView.getTemplate()}
               `
            : ''}

          <ul class="${this.type}__list__cardContainer list__cardContainer" data-type=${this.type}>
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
