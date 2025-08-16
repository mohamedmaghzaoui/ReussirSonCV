import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Dashboard } from "./pages/resume/dashboard.jsx";
import { ResumeEditor } from "./pages/resume/edit/ResumeEditor.jsx";
import { MentionsLegales } from "./pages/legal/MentionsLegales.jsx";
import { PolitiqueConfidentialite } from "./pages/legal/PolitiqueConfidentialite.jsx";
import { CGU } from "./pages/legal/CGU.jsx";
import { PrivateRoute } from "./private/PrivateRoute.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import { Profile } from "./pages/profile/Profile.jsx";
import { ResumeAnalyser } from "./pages/analyse/ResumeAnalyser.jsx";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/dashboard/edit/:id"
            element={<PrivateRoute element={<ResumeEditor />} />}
          />
          <Route
            path="/dashboard/analyse/:id"
            element={<PrivateRoute element={<ResumeAnalyser />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route
            path="/politique-confidentialite"
            element={<PolitiqueConfidentialite />}
          />
          <Route path="/cgu" element={<CGU />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
