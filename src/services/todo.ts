import { TodoType } from '@/hooks/useTodoStore';
import axiosInstance from '@/services/axiosInstasnce';

class TodoService {
  async getTodos() {
    const { data } = await axiosInstance.get('/todos');

    return data;
  }

  async postTodo({ todoType, todo }: { todoType: TodoType; todo: string }) {
    const { data } = await axiosInstance.post('/todos', {
      todoType,
      todo,
    });

    return data;
  }

  async putTodo({
    todoType,
    todo,
    index,
  }: {
    todoType: TodoType;
    todo: string;
    index: number;
  }) {
    const { data } = await axiosInstance.put(`/todos/${index}`, {
      todoType,
      todo,
    });

    return data;
  }

  async deleteTodo({ todoType, index }: { todoType: TodoType; index: number }) {
    const { data } = await axiosInstance.delete(
      `/todos/${index}?todoType=${todoType}`,
    );

    return data;
  }
}

export const todoService = new TodoService();
