import { CHANGE_TODO, todoModel } from '../../models/TodoModel.js';
import { $ } from '../../utils/dom.js';
import { todoView } from '../TodoView.js';

export default class EditModalView {
  constructor(type) {
    this.type = type;
  }

  bindEvents() {
    const editTextarea = $(`.edit__${this.type}__textarea`);
    const closeModalButton = $(`.close__${this.type}__button`);
    const editButton = $(`.edit__${this.type}__button`);

    editTextarea?.addEventListener('input', this.handleChangeEditTextarea.bind(this));
    closeModalButton?.addEventListener('click', this.handleClickCloseModalButton.bind(this));
    editButton?.addEventListener('click', this.handleClickEdit.bind(this));
  }

  handleChangeEditTextarea(event) {
    const { value } = event.target;

    const editButton = $(`.edit__${this.type}__button`);

    if (value.length > 1) {
      return;
    }

    if (!value) {
      editButton.classList.remove('active');
      return;
    }

    editButton.classList.add('active');
  }

  handleClickCloseModalButton() {
    const board = todoView.getBoard(this.type);

    board.editModalOpen = false;

    todoView.render();
  }

  handleClickEdit() {
    const editTextarea = $(`.edit__${this.type}__textarea`);
    const board = todoView.getBoard(this.type);

    todoModel.dispatch({
      type: CHANGE_TODO,
      payload: { todoType: this.type, index: board.selectedTodoIndex, text: editTextarea.value },
    });

    board.editModalOpen = false;

    todoView.render();
  }

  getTemplate() {
    return (
      /*HTML*/
      `
    <div class="modal__container">
      <div class="modal__content">
        <div class="modal__header">
          <div>Edit note</div>
          <button type="button" class="close__${this.type}__button close__button">
            <img class='xMark' src="src/assets/svgs/xMark.svg" />
          </button>
        </div>
        <div class="modal__body">
          <div>Note</div>
          <textarea class="edit__${this.type}__textarea" maxlength="500"></textarea>
          <div class="modal__footer">
            <button type="button" class="edit__${this.type}__button">Save note</button>
          </div>
        </div>
      </div>
    </div>
      `
    );
  }
}
