import { Mail, Phone, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer footer-center p-8 bg-neutral text-neutral-content text-sm">
      <aside>
           <Link  to="/" className="btn btn-ghost  font-bold  text-2xl">
       
               <h1 >
        Reussir<span className="text-primary">SonCV</span>
      </h1>
      
         </Link>
        <p>Créez un CV professionnel en quelques minutes.</p>
        <p>© {new Date().getFullYear()} ReussirSonCV. Tous droits réservés.</p>
      </aside>

      <nav className="flex flex-col sm:flex-row gap-4 items-center text-sm">
        <a
          href="https://github.com/mohamedmaghzaoui"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary"
        >
          <Github className="w-4 h-4" />
          github.com/mohamedmaghzaoui
        </a>

        <a
          href="mailto:contact@reussirsoncv.com"
          className="flex items-center gap-2 hover:text-primary"
        >
          <Mail className="w-4 h-4" />
          contact@reussirsoncv.com
        </a>

        <a
          href="tel:+33612345678"
          className="flex items-center gap-2 hover:text-primary"
        >
          <Phone className="w-4 h-4" />
          +33 6 12 34 56 78
        </a>
      </nav>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Link to="/mentions-legales" className="link link-hover">
          Mentions légales
        </Link>
        <Link to="/politique-confidentialite" className="link link-hover">
          Politique de confidentialité
        </Link>
        <Link to="/cgu" className="link link-hover">
          CGU
        </Link>
      </div>
    </footer>
  );
};
