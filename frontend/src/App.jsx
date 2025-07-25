import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/resume/dashboard';
import { Footer } from './components/Footer';
import { MentionsLegales } from './pages/legal/MentionsLegales';
import { CGU } from './pages/legal/CGU';
import { PolitiqueConfidentialite } from './pages/legal/PolitiqueConfidentialite';
import { PrivateRoute } from './private/PrivateRoute';
import NotFound from './pages/notFound/NotFound';

import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />




        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
