import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  /*
   * Store can be accessed and modified this way.
   * It automatically subscribes to updates, meaning the updates are seen from the component body / useEffect.
   */
  // const { exists } = useAppSelector((state) => state.reducers);
  // const dispatch = useAppDispatch();
  return (
    <>
      <header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </main>
      <footer />
    </>
  );
}

export default App;
