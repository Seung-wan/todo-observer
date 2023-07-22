import Observable from './Observable.js';

export const ADD_TODO = 'ADD_TODO';
export const CHANGE_TODO = 'CHANGE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

type InitialState = {
  todo: string[];
  doing: string[];
  done: string[];
};

type ActionType = typeof ADD_TODO | typeof CHANGE_TODO | typeof DELETE_TODO;

type AddPayload = {
  _brand: 'add';
  todoType: TodoType;
  order: string;
  text: string;
};

type ChangePayload = {
  _brand: 'change';
  todoType: TodoType;
  index: number;
  text: string;
};

type DeletePayload = {
  _brand: 'delete';
  todoType: TodoType;
  index: number;
};

export type TodoType = 'todo' | 'doing' | 'done';

type Action = {
  type: ActionType;
  payload: AddPayload | ChangePayload | DeletePayload;
};

const initialState: InitialState = {
  todo: [],
  doing: [],
  done: [],
};

class TodoModel extends Observable {
  state: InitialState;
  reducer: typeof todoReducer;

  constructor(reducer: typeof todoReducer, initialState: InitialState) {
    super();

    this.state = initialState;
    this.reducer = reducer;
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);

    this.notify();
  }
}
const todoReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case ADD_TODO: {
      if (action.payload._brand === 'add') {
        const targetTodo = state[action.payload.todoType];
        console.log('targetTodo =', targetTodo);

        if (action.payload.order === 'front') {
          targetTodo.unshift(action.payload.text);
        }
        if (action.payload.order === 'back') {
          targetTodo.push(action.payload.text);
        }

        return state;
      }
    }

    case CHANGE_TODO: {
      if (action.payload._brand === 'change') {
        const targetTodo = state[action.payload.todoType];
        targetTodo[action.payload.index] = action.payload.text;

        return state;
      }
    }

    case DELETE_TODO: {
      if (action.payload._brand === 'delete') {
        const targetTodo = state[action.payload.todoType];
        targetTodo.splice(action.payload.index, 1);

        return state;
      }
    }

    default: {
      return state;
    }
  }
};

export const todoModel = new TodoModel(todoReducer, initialState);
