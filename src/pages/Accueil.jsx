import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Acceuil.css";

import userIcon from "../icone/compte.png";
import notificationIcon from "../icone/notification.png";
import heroImage from "../icone/transport.png";
import securityIcon from "../icone/securit-et-fiabilité.png";
import transportIcon from "../icone/transport1.png";
import trackingIcon from "../icone/suivi.png";
import orderIcon from "../icone/commande.png";
import deliveryIcon from "../icone/livraison.png";

const services = [
  {
    title: "Sécurité",
    description: "Vos marchandises sont prises en charge avec soin.",
    icon: securityIcon,
    link: "/espace-client/fonctionnalites",
  },
  {
    title: "Transport",
    description: "Un acheminement adapté à vos commandes.",
    icon: transportIcon,
    link: "/espace-client/transport",
  },
  {
    title: "Suivi",
    description: "Suivez l’évolution de vos commandes.",
    icon: trackingIcon,
    link: "/espace-client/transport",
  },
];

const steps = [
  { number: "1", title: "Commander", icon: orderIcon },
  { number: "2", title: "Transporter", icon: transportIcon },
  { number: "3", title: "Recevoir", icon: deliveryIcon },
];

export default function Accueil() {
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const accountName = sessionStorage.getItem("primLinkAccountName") || "Mon compte";
  const accountEmail = sessionStorage.getItem("primLinkAccountEmail") || "Adresse non renseignée";

  const logout = () => {
    sessionStorage.removeItem("primLinkAccountName");
    sessionStorage.removeItem("primLinkAccountEmail");
    navigate("/");
  };

  return (
    <div className="accueil-page">
      <header className="accueil-topbar">
        <div className="accueil-topbar__welcome">
          <img src={userIcon} alt="" />
          <span>Bienvenue, {accountName}</span>
        </div>
        <div className="accueil-topbar__actions">
          <button type="button" aria-label="Notifications">
            <img src={notificationIcon} alt="" />
            <span aria-hidden="true" />
          </button>
          <button type="button" className="accueil-topbar__profile" aria-label="Ouvrir mon compte" onClick={() => setAccountOpen(true)}>
            <img src={userIcon} alt="" />
          </button>
        </div>
      </header>

      {accountOpen && (
        <div className="account-modal-backdrop" onClick={() => setAccountOpen(false)}>
          <section
            className="account-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="account-modal__heading">
              <span className="account-modal__avatar"><img src={userIcon} alt="" /></span>
              <div>
                <h2 id="account-modal-title">Compte</h2>
                <span>Client</span>
              </div>
              <button type="button" aria-label="Fermer" onClick={() => setAccountOpen(false)}>×</button>
            </div>
            <div className="account-modal__details">
              <div>
                <span>Nom du compte</span>
                <strong>{accountName}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{accountEmail}</strong>
              </div>
            </div>
            <div className="account-modal__actions">
              <button type="button" className="account-modal__logout" onClick={logout}>Se déconnecter</button>
              <button type="button" className="account-modal__confirm" onClick={() => setAccountOpen(false)}>OK</button>
            </div>
          </section>
        </div>
      )}

      <main className="accueil-content">
        <section className="accueil-hero">
          <div className="accueil-hero__copy">
            <p className="accueil-eyebrow">PRIME LINK LOGISTICS</p>
            <h1>Bienvenue sur votre espace client</h1>
            <p className="accueil-hero__text">
              Gérez vos commandes et suivez vos marchandises à chaque étape,
              de la prise en charge jusqu’à la livraison.
            </p>
            <Link to="/espace-client/commander" className="accueil-button">
              Commencer <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="accueil-hero__image">
            <img src={heroImage} alt="Transport international par avion, bateau et camion" />
          </div>
        </section>

        <section className="accueil-services" aria-label="Nos services">
          {services.map(({ title, description, icon, link }) => (
            <Link className="accueil-service" to={link} key={title}>
              <span className="accueil-service__icon">
                <img src={icon} alt="" />
              </span>
              <span className="accueil-service__text">
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
            </Link>
          ))}
        </section>

        <section className="accueil-process">
          <div>
            <p className="accueil-eyebrow">SIMPLE ET RAPIDE</p>
            <h2>Votre commande, en trois étapes</h2>
          </div>
          <div className="accueil-process__steps">
            {steps.map(({ number, title, icon }) => (
              <div className="accueil-step" key={number}>
                <span className="accueil-step__number">{number}</span>
                <span className="accueil-step__icon">
                  <img src={icon} alt="" />
                </span>
                <strong>{title}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
