import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { Todo } from '../types/todo';
import { useTodoContext } from '../context/TodoContext';

const TodoForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Todo>>({
    title: '',
    description: '',
  });

  const {
    handleCreate: onSubmit,
    handleUpdate: onUpdate,
    todo,
    setTodo,
  } = useTodoContext();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title } = formData;

    if (!title) {
      toast.error('Title is required');
      return;
    }

    if (todo) {
      onUpdate({ ...todo, ...formData }, true);
      setFormData({ title: '', description: '' });
      setTodo(null);
      return;
    }
    setFormData({ title: '', description: '' });
    onSubmit({ ...formData } as Todo);
  };

  useEffect(() => {
    if (todo) {
      setFormData(todo);
    }
  }, [todo]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md shadow-lg p-6 space-y-4 mt-8 max-w-2xl mx-auto"
    >
      <input
        name="title"
        type="text"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="w-full p-3 border border-gray-100 shadow rounded-md outline-none text-gray-700 placeholder-gray-400"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="w-full p-3 border border-gray-100 shadow rounded-md outline-none text-gray-700 placeholder-gray-400"
        rows={4}
      ></textarea>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-purple-600 text-white rounded-md p-3 px-5 flex items-center space-x-2 hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          <PlusIcon className="h-6 w-6" />
          {todo ? <span>Update Todo</span> : <span>Add Todo</span>}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
