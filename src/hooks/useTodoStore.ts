import { useEffect, useReducer } from 'react';

import { Todo } from '@/components/Board';

import { todoService } from '@/services/todo';

export const LOAD_TODO = 'LOAD_TODO';
export const ADD_TODO = 'ADD_TODO';
export const CHANGE_TODO = 'CHANGE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

type InitialState = {
  todo: string[];
  doing: string[];
  done: string[];
};

type LoadPayload = {
  todos: Todo[];
};

type AddPayload = {
  todoType: TodoType;
  order: 'front' | 'back';
  text: string;
};

type ChangePayload = {
  todoType: TodoType;
  index: number;
  text: string;
};

type DeletePayload = {
  todoType: TodoType;
  text: string;
};

export type TodoType = 'todo' | 'doing' | 'done';

type ActionLoad = {
  type: typeof LOAD_TODO;
  payload: LoadPayload;
};

type ActionAdd = {
  type: typeof ADD_TODO;
  payload: AddPayload;
};
type ActionChange = {
  type: typeof CHANGE_TODO;
  payload: ChangePayload;
};
type ActionDelete = {
  type: typeof DELETE_TODO;
  payload: DeletePayload;
};

type Action = ActionLoad | ActionAdd | ActionChange | ActionDelete;

const initialState = {
  todo: [],
  doing: [],
  done: [],
} as InitialState;

const todoReducer = (state: InitialState, action: Action): any => {
  switch (action.type) {
    case LOAD_TODO: {
      return action.payload.todos;
    }

    case ADD_TODO: {
      if (action.payload.order === 'front') {
        return {
          ...state,
          [action.payload.todoType]: [
            ...state[action.payload.todoType],
            action.payload.text,
          ],
        };
      }
      if (action.payload.order === 'back') {
        return {
          ...state,
          [action.payload.todoType]: [
            action.payload.text,
            ...state[action.payload.todoType],
          ],
        };
      }
      break;
    }

    case CHANGE_TODO: {
      const targetTodo = [...state[action.payload.todoType]];
      targetTodo[action.payload.index] = action.payload.text;

      return {
        ...state,
        [action.payload.todoType]: targetTodo,
      };
    }

    case DELETE_TODO: {
      const targetTodo = [...state[action.payload.todoType]];

      return {
        ...state,
        [action.payload.todoType]: targetTodo.filter(
          (todo) => todo !== action.payload.text,
        ),
      };
    }

    default: {
      return state;
    }
  }
};

export default function useTodoStore() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    todoService
      .getTodos()
      .then((res) => dispatch({ type: LOAD_TODO, payload: { todos: res } }));
  }, [dispatch]);

  return {
    todos,
    dispatch,
  };
}
