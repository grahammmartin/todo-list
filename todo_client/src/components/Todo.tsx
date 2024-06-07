import React from 'react';
import TodoForm from './TodoForm';
import Filters from './Filters';
import TodoList from './Table';

const TodoComponent: React.FC = () => {
  return (
    <div className="mx-auto pb-24">
      <TodoForm />
      <Filters />
      <TodoList />
    </div>
  );
};

export default TodoComponent;
