import './App.css';
import TodoComponent from './components/Todo';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <TodoComponent />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
