import Observable from './Observable.js';

export const ADD_TODO = 'ADD_TODO';
export const CHANGE_TODO = 'CHANGE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

class TodoModel extends Observable {
  constructor(reducer, initialState = {}) {
    super();
    this.state = initialState;
    this.reducer = reducer;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);

    this.notify();
  }
}

const initialState = {
  todo: [],
  doing: [],
  done: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const targetTodo = state[action.payload.todoType];

      if (action.payload.order === 'front') {
        targetTodo.unshift(action.payload.text);
      }
      if (action.payload.order === 'back') {
        targetTodo.push(action.payload.text);
      }

      return state;
    }

    case CHANGE_TODO: {
      const targetTodo = state[action.payload.todoType];
      targetTodo[action.payload.index] = action.payload.text;

      return state;
    }

    case DELETE_TODO: {
      const targetTodo = state[action.payload.todoType];
      targetTodo.splice(action.payload.index, 1);

      return state;
    }

    default: {
      return state;
    }
  }
};

export const todoModel = new TodoModel(todoReducer, initialState);
