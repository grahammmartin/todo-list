import './App.css';
import TodoComponent from './components/Todo';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <TodoComponent />
    </>
  );
};

export default App;
