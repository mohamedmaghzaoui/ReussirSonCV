import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/home/home";
import { Dashboard } from "./pages/resume/dashboard";
import { ResumeEditor } from "./pages/resume/edit/ResumeEditor";
import { MentionsLegales } from "./pages/legal/MentionsLegales";
import { PolitiqueConfidentialite } from "./pages/legal/PolitiqueConfidentialite";
import { CGU } from "./pages/legal/CGU";
import { PrivateRoute } from "./private/PrivateRoute";
import NotFound from "./pages/notFound/NotFound";
import { Profile } from "./pages/profile/profile";

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
