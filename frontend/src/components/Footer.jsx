import { Mail, Phone, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Création de CV</a>
        <a className="link link-hover">Conseils de carrière</a>
        <a className="link link-hover">Consultation professionnelle</a>
      </nav>
      <nav>
        <h6 className="footer-title">Entreprise</h6>
        <Link to="/" className="link link-hover">
          À propos
        </Link>
        <a href="mailto:contact@reussirsoncv.com" className="link link-hover">
          Contact
        </a>
        <a href="tel:+33612345678" className="link link-hover">
          Assistance
        </a>
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
