import TodoView from './views/TodoView.js';
import HeaderView from './views/HeaderView.js';

function init() {
  const headerView = new HeaderView();
  const todoView = new TodoView();

  headerView.render();
  todoView.render();
}

init();
