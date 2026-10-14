import "./APropos.css";
import { useAccountDialog } from "../components/AccountDialog";

import userIcon from "../icone/compte.png";
import notificationIcon from "../icone/notification.png";
import securityIcon from "../icone/securit-et-fiabilité.png";
import transportIcon from "../icone/transport.png";
import logistiqueIcon from "../icone/logistique.png";
import suiviIcon from "../icone/suivi.png";
import commandIcon from "../icone/commande.png";
import receptionIcon from "../icone/reception.png";
import livraisonIcon from "../icone/livraison.png";
import fiabiliteIcon from "../icone/honnetete.png";
import transparenceIcon from "../icone/rapport.png";
import rapiditeIcon from "../icone/rapidité.png";
import accompagnementIcon from "../icone/accompagnion.png";


const headerIcons = {
  user: userIcon,
  bell: notificationIcon,
  avatar: userIcon,
};

const topFeatures = [
  { title: "Sécurité", description: "Protéger et prendre soin de vos marchandises.", icon: securityIcon },
  { title: "Logistique", description: "Assurer l'acheminement de vos commandes.", icon: logistiqueIcon },
  { title: "Suivi", description: "Vous permettre de suivre l'évolution de votre commande.", icon: suiviIcon },
];

const steps = [
  { number: "1", title: "Commande", description: "Vous passez votre commande en ligne ou auprès de notre équipe.", icon: commandIcon },
  { number: "2", title: "Réception", description: "Nous réceptionnons et vérifions vos marchandises.", icon: receptionIcon },
  { number: "3", title: "Logistique", description: "Vos produits sont acheminés par voie maritime, aérienne ou terrestre.", icon: logistiqueIcon },
  { number: "4", title: "Livraison", description: "Vous recevez vos marchandises en toute sécurité.", icon: livraisonIcon },
];

const engagements = [
  { title: "Fiabilité", description: "Des services sur lesquels vous pouvez compter.", icon: fiabiliteIcon },
  { title: "Transparence", description: "Un suivi clair à chaque étape.", icon: transparenceIcon },
  { title: "Rapidité", description: "Des délais respectés, au plus près de vos besoins.", icon: rapiditeIcon },
  { title: "Accompagnement", description: "Une équipe à votre écoute, tout au long de votre parcours.", icon: accompagnementIcon },
];

const heroImage = transportIcon;

export default function APropos() {
  const openAccount = useAccountDialog();

  return (
    <div className="apropos-page">
      <header className="apropos-topbar">
        <div className="apropos-topbar__welcome">
          <img src={headerIcons.user} alt="" className="apropos-topbar__icon" />
          <span>Bienvenue, Nom</span>
        </div>

        <div className="apropos-topbar__search" role="search">
          <span className="apropos-topbar__search-icon" aria-hidden="true">
            ⌕
          </span>
          <input type="text" placeholder="Rechercher..." aria-label="Rechercher" />
        </div>

        <div className="apropos-topbar__actions">
          <button type="button" className="apropos-topbar__button" aria-label="Notifications">
            <img src={headerIcons.bell} alt="" className="apropos-topbar__icon" />
            <span className="apropos-topbar__notif" aria-hidden="true" />
          </button>

          <button type="button" className="apropos-topbar__avatar" aria-label="Mon profil" onClick={openAccount}>
            <img src={headerIcons.avatar} alt="" className="apropos-topbar__icon" />
          </button>
        </div>

      </header>

      <main className="apropos-content">
        <section className="apropos-hero">
          <div className="apropos-hero__copy">
            <p className="apropos-kicker">À PROPOS DE NOUS</p>
            <h1 className="apropos-title">
              Votre partenaire pour le transport
              <br />
              et la gestion de vos commandes
              <br />
              à l’international.
            </h1>

            <div className="apropos-hero__mission">
              <div className="apropos-hero__mission-header">
                <span className="apropos-hero__mission-mark">●</span>
                <h2>Notre entreprise</h2>
              </div>

              <p>
                Nous facilitons la gestion et le transport de vos marchandises depuis l’étranger jusqu’à
                leur destination. Notre objectif est de proposer un service simple, fiable et transparent,
                adapté à vos besoins.
              </p>

              <button type="button" className="apropos-button">
                En savoir plus <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="apropos-hero__visual" aria-hidden="true">
            <img src={heroImage} alt="" />
            <div className="apropos-hero__globe" />
          </div>
        </section>

        <section className="apropos-mission">
          <div className="apropos-mission__block">
            <h3>Notre mission</h3>
            <p>
              Nous offrons un service de transport et de logistique international fiable, sécurisé et
              accessible à tous.
            </p>
          </div>
        </section>

        <section className="apropos-feature-grid">
          {topFeatures.map(({ title, description, icon }) => (
            <article className="apropos-feature-card" key={title}>
              <div className="apropos-feature-card__icon-wrap">
                <img src={icon} alt="" className="apropos-feature-card__icon" />
              </div>
              <div className="apropos-feature-card__body">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="apropos-process">
          <h2 className="apropos-section-title">Comment ça marche ?</h2>
          <p className="apropos-section-subtitle">
            Un processus simple et clair, de votre commande jusqu’à la livraison.
          </p>

          <div className="apropos-process__grid">
            {steps.map(({ number, title, description, icon }) => (
              <article className="apropos-step-card" key={title}>
                <div className="apropos-step-card__number">{number}</div>
                <div className="apropos-step-card__icon-wrap">
                  <img src={icon} alt="" className="apropos-step-card__icon" />
                </div>
                <div className="apropos-step-card__body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="apropos-engagements">
          <div className="apropos-engagements__header">
            <div className="apropos-engagements__icon-wrap">
              <img src={securityIcon} alt="" className="apropos-engagements__icon" />
            </div>
            <div>
              <h2>Nos engagements</h2>
              <p>Chaque commande compte. Nous nous engageons à vous offrir le meilleur service.</p>
            </div>
          </div>

          <div className="apropos-engagements__grid">
            {engagements.map(({ title, description, icon }) => (
              <article className="apropos-engagement-card" key={title}>
                <div className="apropos-engagement-card__icon-wrap">
                  <img src={icon} alt="" className="apropos-engagement-card__icon" />
                </div>
                <div className="apropos-engagement-card__body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}