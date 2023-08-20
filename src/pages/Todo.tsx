import Board from '@/components/Board';

import useTodoStore from '@/hooks/useTodoStore';

import { container } from '@/pages/todo.css';

export default function Todo() {
  const { todos, dispatch } = useTodoStore();

  return (
    <div className={container}>
      <Board type="todo" todos={todos.todo} dispatch={dispatch} />
      <Board type="doing" todos={todos.doing} dispatch={dispatch} />
      <Board type="done" todos={todos.done} dispatch={dispatch} />
    </div>
  );
}
