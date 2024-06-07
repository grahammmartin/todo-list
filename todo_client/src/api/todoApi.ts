import axios from 'axios';
import { Todo } from '../types/todo';
import { PaginationMeta } from '../types/pagination';

const apiUrl = import.meta.env.VITE_API_URL;

export const createTodo = async (todo: Todo): Promise<{ todo: Todo }> => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/todos`, { todo });
    return response.data;
  } catch (error: any) {
    throw error.response.data.todos.join('\n');
  }
};

export const getTodos = async (
  page: number,
  is_completed: boolean | ''
): Promise<{ todos: Todo[]; meta: PaginationMeta }> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/todos/?page=${page}&is_completed=${is_completed}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    return await axios.delete(`${apiUrl}/api/v1/todos/${id}`);
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updateTodo = async (
  id: string,
  todo: Partial<Todo>
): Promise<{ todo: Todo }> => {
  try {
    const response = await axios.patch(`${apiUrl}/api/v1/todos/${id}`, todo);
    return response.data;
  } catch (error: any) {
    throw error.response.data.todos.join('\n');
  }
};
