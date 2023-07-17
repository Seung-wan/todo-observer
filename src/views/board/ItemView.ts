import { DELETE_TODO, TodoType, todoModel } from '../../models/TodoModel.js';

import { $all } from '../../utils/dom.js';

import { todoView } from '../TodoView.js';

export default class ItemView {
  type: TodoType;

  constructor(type: TodoType) {
    this.type = type;
  }

  bindEvents() {
    const deleteTodos = $all(`.list__cardContainer__card__title__${this.type}__delete`);
    const cards = $all(`.${this.type}__card`);

    deleteTodos.forEach((deleteTodo) => {
      deleteTodo?.addEventListener('click', this.handleClickDelete.bind(this));
    });

    cards?.forEach((card) => {
      card?.addEventListener('dblclick', this.handleClickCard.bind(this));
    });

    cards?.forEach((card) => {
      card?.addEventListener('dragstart', () => this.handleDragstart(card));
      card?.addEventListener('dragend', () => this.handleDragend(card));
    });
  }

  handleClickDelete(event: any) {
    if (window.confirm('선택하신 카드를 삭제하시겠습니까?')) {
      const targetIndex = event.currentTarget.dataset.index;

      todoModel.dispatch({ type: DELETE_TODO, payload: { _brand: 'delete', todoType: this.type, index: targetIndex } });
    }
  }

  handleClickCard(event: any) {
    const board = todoView.getBoard(this.type);
    board.selectedTodoIndex = event.currentTarget.dataset.index;

    board.editModalOpen = true;
    todoView.render();
  }

  handleDragstart(card: Element) {
    card.classList.add('dragging');
  }

  handleDragend(card: Element) {
    card.classList.remove('dragging');
  }

  getTemplate(todo: string, index: number) {
    return (
      /*HTML*/
      `
      <li class="list__cardContainer__card ${this.type}__card" draggable="true" data-type=${this.type} data-index=${index} >
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
  }
}
