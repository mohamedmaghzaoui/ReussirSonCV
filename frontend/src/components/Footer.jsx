import { Mail, Phone, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link to="/dashboard" className="link link-hover">Création de CV</Link>
        <Link to={"/dashboard"} className="link link-hover">Conseils de carrière</Link>
        <Link to={"/dashboard"} className="link link-hover">Consultation professionnelle</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Application</h6>
        <Link to="/" className="link link-hover">
          À propos
        </Link>
        <Link to="/FAQ" className="link link-hover">
          FAQ
        </Link>
     
      </nav>
      <nav>
        <h6 className="footer-title">Légal</h6>
        <Link to="/mentions-legales" className="link link-hover">
          Mentions légales
        </Link>
        <Link to="/politique-confidentialite" className="link link-hover">
          Politique de confidentialité
        </Link>
        <Link to="/cgu" className="link link-hover">
          CGU
        </Link>
      </nav>
    </footer>
  );
};
