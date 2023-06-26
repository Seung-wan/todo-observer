import { todoView } from './views/TodoView.js';
import HeaderView from './views/HeaderView.js';

function init() {
  const headerView = new HeaderView();

  headerView.render();
  todoView.render();
}

init();
