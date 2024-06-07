import React from 'react';
import TodoForm from './TodoForm';
import Filters from './Filters';
import TodoTable from './TodoTable';

const TodoComponent: React.FC = () => {
  return (
    <div className="mx-auto pb-24">
      <TodoForm />
      <Filters />
      <TodoTable />
    </div>
  );
};

export default TodoComponent;
