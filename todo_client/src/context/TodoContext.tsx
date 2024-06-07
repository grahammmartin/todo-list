import React, { createContext, useContext, ReactNode, useState } from 'react';
import useTodos from '../hooks/useTodos';
import { PaginationMeta } from '../types/pagination';
import { Todo } from '../types/todo';
import { Filter } from '../types/filter';

interface TodoContextType {
  todo: Todo | null;
  setTodo: (todo: Todo | null) => void;
  todos: Todo[];
  meta: PaginationMeta;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  loadTodos: (page: number, filter: Filter) => void;
  handleCreate: (todo: Todo) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: (todo: Partial<Todo>) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const {
    todos,
    meta,
    filter,
    setFilter,
    loadTodos,
    handleCreate,
    handleDelete,
    handleUpdate,
  } = useTodos();

  const [todo, setTodo] = useState<Todo | null>(null);

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        todos,
        meta,
        filter,
        setFilter,
        loadTodos,
        handleCreate,
        handleDelete,
        handleUpdate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
