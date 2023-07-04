export default class EditModalView {
  constructor(type) {
    this.type = type;
  }

  getTemplate() {
    return `
      <div class="modal__container">
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
    </div>
      `;
  }
}
