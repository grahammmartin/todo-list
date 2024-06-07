import { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/todoApi';
import { Todo } from '../types/todo';
import { PaginationMeta } from '../types/pagination';
import { Filter } from '../types/filter';
import { toast } from 'react-hot-toast';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_pages: 1,
    total_count: 0,
  });
  const [filter, setFilter] = useState<Filter>('pending');

  const loadTodos = async (page: number, filter: Filter) => {
    const isCompleted = filter === 'all' ? '' : filter === 'completed';
    const { todos, meta } = await getTodos(page, isCompleted);
    // console.log(todos)
    setTodos(todos);
    setMeta(meta);
  };

  useEffect(() => {
    loadTodos(1, filter);
  }, [filter]);

  const handleCreate = async (todo: Todo) => {
    try {
      const { todo: createdTodo } = await createTodo(todo);
      setTodos(prev => [...prev, createdTodo]);
      loadTodos(meta.current_page, filter);
      toast.success('Todo created successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id.toString());
      setTodos(prev => prev.filter(todo => todo.id !== id));
      loadTodos(meta.current_page, filter);
      toast.success('Todo deleted successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (todo: Partial<Todo>) => {
    try {
      const { todo: updatedTodo } = await updateTodo(todo.id!.toString(), todo);
      setTodos(prev => prev.map(t => (t.id === todo.id ? updatedTodo : t)));
      loadTodos(meta.current_page, filter);
      if (todo.is_completed) toast.success('Todo completed successfully');
      else if (!todo.is_completed) toast.success('Todo reverted successfully');
      else toast.success('Todo updated successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    todos,
    meta,
    filter,
    setFilter,
    loadTodos,
    handleCreate,
    handleDelete,
    handleUpdate,
  };
};

export default useTodos;
