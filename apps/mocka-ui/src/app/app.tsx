import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Shell from './components/shell/shell';
import Mock from './components/mock/mock';
import List from './components/list/list';
import { decrement, increment } from './redux/app-slice';
import { Button } from '@mui/material';

export function App() {
  const app = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-200 h-full flex flex-col">
      <div className="flex flex-col justify-center w-full items-center">
        {/* <div>
          <Button type="button" onClick={() => dispatch(increment())}>
            increment
          </Button>
          <Button type="button" onClick={() => dispatch(decrement())}>
            dec
          </Button>
        </div> */}
        <h1>{app.title} to Mock UI</h1>
        {/* <h5>{app.value}</h5> */}
      </div>
      <div className="p-5 h-full flex flex-col">
        <div>
          <Shell></Shell>
        </div>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/list" replace />} />
            <Route path="list" element={<List />}>
              <Route path=":id" element={<Mock />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

/*
<Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
      </Routes>

*/
