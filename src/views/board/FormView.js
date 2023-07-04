export default class FormView {
  constructor(type) {
    this.type = type;
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
