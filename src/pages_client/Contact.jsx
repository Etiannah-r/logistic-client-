import { useAccountDialog } from "../components/AccountDialog";
import accountIcon from "../icone/compte.png";
import logo from "../icone/logo.jpeg";
import standardMap from "../icone/maps(1).png";
import satelliteMap from "../icone/maps(2).png";
import notificationIcon from "../icone/notification.png";
import facebookIcon from "../icone/logo-facebook.png";
import instagramIcon from "../icone/instagram.png";
import tiktokIcon from "../icone/tic-tac.png";
import messengerIcon from "../icone/whatsapp.png";
import "./Contact.css";

const offices = [
  {
    name: "Siège administratif — Antananarivo, Madagascar",
    view: "Vue standard",
    image: standardMap,
  },
  {
    name: "Siége administratif — Antananarivo, Madagascar",
    view: "Vue satellite",
    image: satelliteMap,
  },
];

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
      <path d="m19.4 13.5 1.1.85-1.1 1.9-1.32-.45a7.8 7.8 0 0 1-1.55.9l-.22 1.38h-2.2l-.25-1.36a7.7 7.7 0 0 1-1.75 0l-.25 1.36h-2.2l-.22-1.38a7.8 7.8 0 0 1-1.55-.9l-1.32.45-1.1-1.9 1.1-.85a7.5 7.5 0 0 1 0-1.8l-1.1-.85 1.1-1.9 1.32.45a7.8 7.8 0 0 1 1.55-.9l.22-1.38h2.2l.25 1.36a7.7 7.7 0 0 1 1.75 0l.25-1.36h2.2l.22 1.38a7.8 7.8 0 0 1 1.55.9l1.32-.45 1.1 1.9-1.1.85a7.5 7.5 0 0 1 0 1.8Z" />
    </svg>
  );
}

function SocialMark({ label, icon }) {
  return (
    <span className="contact-socials__mark" role="img" aria-label={label}>
      <img src={icon} alt="" />
    </span>
  );
}

export default function Contact() {
  const openAccount = useAccountDialog();
  const accountName = sessionStorage.getItem("primLinkAccountName") || "Mon compte";

  return (
    <div className="contact-page">

      <main className="contact-content">
        <section className="contact-details" aria-labelledby="contact-title">
          <div className="contact-heading">
            <p className="contact-eyebrow">Prime Link Logistics</p>
            <h1 id="contact-title">Contactez-nous</h1>
          </div>

          <div className="contact-info">
            <section className="contact-info__group" aria-labelledby="contact-phone-title">
              <h2 id="contact-phone-title">Assistance téléphonique</h2>
              <a href="tel:+4228352820">+42 28 35 28 20</a>
              <a href="tel:+43448334452">434 48 33 44 52</a>
            </section>

            <section className="contact-info__group" aria-labelledby="contact-email-title">
              <h2 id="contact-email-title">Support par e-mail</h2>
              <a href="mailto:primelinklogint@support.com">primelinklogint@support.com</a>
              <a href="mailto:primelinklogistics@support.com">primelinklogistics@support.com</a>
            </section>

            <section className="contact-info__group" aria-labelledby="contact-address-title">
              <h2 id="contact-address-title">Notre adresse</h2>
              <p>Siège, 45 Rue des Archives, Paris, France (accès restreint)</p>
            </section>
          </div>

          <section className="contact-resources" aria-labelledby="contact-resources-title">
            <h2 id="contact-resources-title">FAQ et ressources</h2>
            <ul>
              <li>FAQ et contact</li>
              <li>Foire aux questions</li>
              <li>Ressources</li>
            </ul>
          </section>

          <div className="contact-socials" role="group" aria-label="Réseaux sociaux">
            <SocialMark label="Facebook" icon={facebookIcon} />
            <SocialMark label="Instagram" icon={instagramIcon} />
            <SocialMark label="TikTok" icon={tiktokIcon} />
            <SocialMark label="Messenger" icon={messengerIcon} />
          </div>
        </section>

        <section className="contact-offices" aria-labelledby="contact-offices-title">
          <h2 id="contact-offices-title">Disponibilité des équipes administratives et opérationnelles</h2>

          <div className="contact-offices__maps">
            {offices.map(({ name, view, image }) => (
              <figure className="contact-office" key={name}>
                <img src={image} alt={`Carte du ${name.toLowerCase()}`} />
                <figcaption>
                  <strong>{name}</strong>
                  <span>{view}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="contact-offices__footer">
            <p className="contact-hours">
              <span className="contact-status" aria-hidden="true" />
              Horaires d’ouverture : <strong>8 h – 17 h</strong>
            </p>
            <a className="contact-support-button" href="mailto:primelinklogistics@support.com">
              Voir sur Maps <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className="contact-network-status">
            Réseau : <strong>Ouvert</strong>
            <span aria-hidden="true">·</span>
            Statut des équipes : <strong>Disponible</strong>
            <span aria-hidden="true">·</span>
            Support : <strong>En ligne</strong>
          </p>
        </section>
      </main>
    </div>
  );
}
