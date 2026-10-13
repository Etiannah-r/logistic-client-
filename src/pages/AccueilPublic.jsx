import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import imageLogistique from "../icone/image.png";

const fonctionnalites = [
  { titre: "Gestion des clients", texte: "Centralisez vos contacts.", icon: "compte" },
  { titre: "Suivi des commandes", texte: "De la commande à la livraison.", icon: "suivi" },
  { titre: "Notifications", texte: "Restez informé en temps réel.", icon: "notification" },
  { titre: "Rapports", texte: "Analysez vos performances.", icon: "rapport" },
];

export default function AccueilPublic() {
  return (
    <div className="public-home">
      <header className="public-header">
        <Link className="brand" to="/" aria-label="PRIM LINK, accueil">
          <span className="brand-mark">P</span>
          <span className="brand-name">PRIM LINK</span>
        </Link>
        <nav className="public-nav" aria-label="Navigation principale">
          <Link to="/connexion">Se connecter</Link>
          <Link className="button button-small" to="/inscription">S’inscrire</Link>
        </nav>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-copy">
            <span className="eyebrow">VOTRE PARTENAIRE LOGISTIQUE</span>
            <h1>Gérez vos commandes en toute simplicité.</h1>
            <p>
              Une solution complète pour suivre vos colis, gérer vos commandes et
              profiter d’un espace client simple et efficace.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/inscription">Commencer maintenant</Link>
              <a className="text-link" href="#avantages">Savoir plus <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <img src={imageLogistique} alt="Tableau de suivi logistique, colis et globe" />
            <span className="hero-orbit" aria-hidden="true" />
          </div>
        </section>

        <section className="feature-strip" id="avantages" aria-label="Fonctionnalités de PRIM LINK">
          {fonctionnalites.map((fonctionnalite) => (
            <article className="feature-item" key={fonctionnalite.titre}>
              <Icon name={fonctionnalite.icon} size={21} />
              <div className="feature-copy">
                <h2>{fonctionnalite.titre}</h2>
                <p>{fonctionnalite.texte}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
