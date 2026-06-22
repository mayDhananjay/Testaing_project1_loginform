import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/login';
import Home from './component/Home';

function App() {
  return (
    <Router>
      <div className="grid w-full h-screen place-items-center bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login initialMode="signup" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
