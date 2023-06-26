import { $ } from '../utils/dom.js';

export default class HeaderView {
  render() {
    const header = $('#header');

    header.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return (
      /* HTML */
      `
        <header class="header">
          <nav>
            <div class="header__logo">TODO 서비스</div>
            <div class="header__menu">menu</div>
          </nav>
        </header>
      `
    );
  }
}
