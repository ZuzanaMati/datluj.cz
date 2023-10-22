import { createRoot } from 'react-dom/client';
import Stage from './components/Stage';
import './style.css';
import { RouterProvider, createBrowserRouter, Link } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Modal from 'react-modal';

const App = () => {
  return (
    <div className="container">
      <h1>Datlování</h1>
      <nav>
        <Link to="/datlovani">Začít hru</Link>
      </nav>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/datlovani",
    element: <Stage />
  }
])

Modal.setAppElement('#app')

createRoot(
  document.querySelector('#app'),
).render(<RouterProvider router={router} />);
