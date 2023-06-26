export default class BoardView {
  constructor(type) {
    this.title = this.getTypeLabel(type);
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
              <div class="list__header__left__count">12</div>
              <div>${this.title}</div>
            </div>
            <div class="list__header__right">
              <div>+</div>
              <div>X</div>
            </div>
          </div>
          <ul class="list__cardContainer">
            <li class="list__cardContainer__card">
              <div class="list__cardContainer__card__title">
                <div>페이지네이션 UI 리서치</div>
                <div>X</div>
              </div>
              <div class="list__cardContainer__card__date">2023-06-21</div>
            </li>
          </ul>
        </div>
      `
    );
  }
}
