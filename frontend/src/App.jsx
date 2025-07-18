import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/resume/dashboard';


import axios  from 'axios';

axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
      </Routes>
    </>
  );
}

export default App;
