import { rest } from 'msw';

import fixtures from '@/mocks/fixtures';
import { TodoType } from '@/hooks/useTodoStore';
import { Todo } from '@/components/Board';

const MSW_BASE_URL = import.meta.env.MSW_BASE_URL ?? 'http://localhost:5173';

export const getTodos = rest.get(`${MSW_BASE_URL}/todos`, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ ...fixtures.todos }));
});

export const postTodo = rest.post(
  `${MSW_BASE_URL}/todos`,
  async (req, res, ctx) => {
    const body: { todoType: TodoType; todo: Todo } = await req.json();

    const newTodos = {
      ...fixtures.todos,
      [body.todoType]: [...fixtures.todos[body.todoType], body.todo],
    };

    return res(ctx.status(201), ctx.json({ todos: newTodos }));
  },
);

export const putTodo = rest.put(
  `${MSW_BASE_URL}/todos/:index`,
  async (req, res, ctx) => {
    const { todo }: { todo: Todo } = await req.json();
    const { index, todoType }: { index: string; todoType: TodoType } =
      req.params as any;

    const newTodos = {
      ...fixtures.todos,
      [todoType]: fixtures.todos[todoType].map((_todo, idx) => {
        if (idx === Number(index)) {
          return todo;
        }

        return _todo;
      }),
    };

    return res(ctx.status(201), ctx.json({ todos: newTodos }));
  },
);

export const deleteTodo = rest.delete(
  `${MSW_BASE_URL}/todos/:index`,
  (req, res, ctx) => {
    const { index, todoType }: { index: string; todoType: TodoType } =
      req.params as any;

    const newTodos = {
      ...fixtures.todos,
      [todoType]: fixtures.todos[todoType].filter(
        (todo, idx) => idx !== Number(index),
      ),
    };

    return res(ctx.status(204), ctx.json({ todos: newTodos }));
  },
);
