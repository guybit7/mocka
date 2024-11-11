import { HashRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import Login from './auth/login/login';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

export function App() {
  return (
    <div>
      <span> Hello! </span>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
