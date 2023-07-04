export default class ItemView {
  constructor(type) {
    this.type = type;
  }

  getTemplate(todo, index) {
    return (
      /*HTML*/
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
  }
}
