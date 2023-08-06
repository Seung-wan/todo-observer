import { getTodos, postTodo, putTodo, deleteTodo } from './services/todo';

const handlers = [getTodos, postTodo, putTodo, deleteTodo];

export default handlers;
