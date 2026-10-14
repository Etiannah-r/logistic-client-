import { useState } from "react";
import "./Transport.css";
import { useAccountDialog } from "../components/AccountDialog";

import userIcon from "../icone/compte.png";
import secUserIcon from "../icone/compte.png";
import secBoxIcon from "../icone/commande.png";
import secGlobeIcon from "../icone/globe.png";
import secPinIcon from "../icone/navigation-gps.png";
import secTruckIcon from "../icone/transport1.png";
import phoneIcon from "../icone/accompagnion.png";
import mailIcon from "../icone/commentaire.png";
import idCardIcon from "../icone/compte.png";
import homeIcon from "../icone/navigation-gps.png";
import uploadIcon from "../icone/instantane.png";
import shipIcon from "../icone/bateaux.png";
import planeIcon from "../icone/avion.png";
import lockIcon from "../icone/cadenas.png";
import trackingIcon from "../icone/suivi.png";
import shieldIcon from "../icone/securit-et-fiabilité.png";
import supportIcon from "../icone/accompagnion.png";
import locationIcon from "../icone/navigation-gps.png";
import clockIcon from "../icone/rapidité.png";
import sideImage from "../icone/transport.png";

const STEPS = ["Informations personnelles", "Marchandise", "Transport", "Confirmation"];

const WHY_US = [
  { icon: trackingIcon, title: "Suivi en temps réel", text: "Restez informé à chaque étape." },
  { icon: shieldIcon, title: "Sécurité garantie", text: "Vos marchandises et vos données sont protégées." },
  { icon: supportIcon, title: "Service personnalisé", text: "Une équipe à votre écoute." },
  { icon: locationIcon, title: "Livraison à Madagascar", text: "Partout sur l'île." },
];

/* ---------- Petits composants ---------- */
function Section({ icon, title, text, children }) {
  return (
    <section className="dt-section">
      <div className="dt-section__head">
        <span className="dt-section__icon">
          <img src={icon} alt="" />
        </span>
        <div className="dt-section__titles">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, required, optional, className = "", children }) {
  return (
    <div className={`dt-field ${className}`}>
      <label className="dt-label">
        {label}
        {optional && <span className="dt-label__opt"> (optionnel)</span>}
        {required && " *"}
      </label>
      {children}
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="dt-input">
      {icon && (
        <span className="dt-input__icon">
          <img src={icon} alt="" />
        </span>
      )}
      <input {...props} />
    </div>
  );
}

function Select({ placeholder, options = [], ...props }) {
  return (
    <div className="dt-select">
      <select {...props}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="dt-select__chevron" aria-hidden="true" />
    </div>
  );
}

/* ---------- Page ---------- */
export default function DemandeTransport({
  nomUtilisateur = "",
  etapeActive = 0,
  pays = [],
  villes = [],
  onBack,
  onNext,
}) {
  const openAccount = useAccountDialog();
  const [form, setForm] = useState({
    nom: "", prenom: "", telephone: "", email: "", cin: "", adresse: "",
    article: "", quantite: "", poids: "",
    longueur: "", largeur: "", hauteur: "", colis: "",
    paysOrigine: "", villeOrigine: "", adresseRecuperation: "",
    villeMada: "", adresseLivraison: "",
    transport: "maritime",
    recuperation: false,
    livraison: false,
  });
  const [fichier, setFichier] = useState(null);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onNext?.({ ...form, fichier });
  };

  return (
    <div className="dt">
      {/* ---------- Barre du haut ---------- */}
      <header className="dt-topbar">
        <button type="button" className="dt-topbar__menu" aria-label="Menu">
          <span className="dt-topbar__menu-mark" aria-hidden="true">☰</span>
        </button>

        <button type="button" className="dt-topbar__user" onClick={openAccount} aria-label="Ouvrir mon compte">
          <span className="dt-topbar__avatar">
            <img src={userIcon} alt="" />
          </span>
          <span>{nomUtilisateur}</span>
        </button>
      </header>

      {/* ---------- Bandeau ---------- */}
      <div className="dt-banner">
        <div className="dt-banner__text">
          <h1>Demande de transport</h1>
          <h3>Transportez vos articles depuis l'étranger jusqu'à Madagascar</h3>
          <p>
            Remplissez le formulaire ci-dessous et notre équipe vous contactera
            rapidement avec un devis personnalisé.
          </p>
        </div>
      </div>

      <div className="dt-layout">
        {/* ================= Formulaire ================= */}
        <form className="dt-card" onSubmit={submit}>
          {/* Stepper */}
          <ol className="dt-stepper">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`dt-step ${i === etapeActive ? "is-active" : ""} ${
                  i < etapeActive ? "is-done" : ""
                }`}
              >
                <span className="dt-step__dot">{i + 1}</span>
                <span className="dt-step__label">{s}</span>
              </li>
            ))}
          </ol>

          {/* 1. Informations personnelles */}
          <Section
            icon={secUserIcon}
            title="1. Informations personnelles"
            text="Vos coordonnées sont nécessaires pour traiter votre demande en toute sécurité."
          >
            <div className="dt-grid dt-grid--2">
              <Field label="Nom" required>
                <Input name="nom" value={form.nom} onChange={handle} placeholder="Ex.  Rakotomalala" required />
              </Field>
              <Field label="Prénom" required>
                <Input name="prenom" value={form.prenom} onChange={handle} placeholder="Ex.  Mialy" required />
              </Field>
              <Field label="Numéro de téléphone" required>
                <Input icon={phoneIcon} type="tel" name="telephone" value={form.telephone} onChange={handle} placeholder="Ex.  034 12 345 67" required />
              </Field>
              <Field label="Email" required>
                <Input icon={mailIcon} type="email" name="email" value={form.email} onChange={handle} placeholder="Ex.  mialy@email.com" required />
              </Field>
              <Field label="CIN" required>
                <Input icon={idCardIcon} name="cin" value={form.cin} onChange={handle} placeholder="Ex.  1234567890" required />
              </Field>
              <Field label="Adresse" optional>
                <Input icon={homeIcon} name="adresse" value={form.adresse} onChange={handle} placeholder="Ex.  Lot II, Antananarivo" />
              </Field>
            </div>
          </Section>

          {/* 2. Marchandise */}
          <Section
            icon={secBoxIcon}
            title="2. Informations sur la marchandise"
            text="Décrivez l'article que vous souhaitez faire transporter."
          >
            <div className="dt-grid dt-grid--merch">
              <Field label="Nom de l'article" required>
                <Input name="article" value={form.article} onChange={handle} placeholder="Ex.  Smartphone, vêtements, machine..." required />
              </Field>
              <Field label="Quantité" required>
                <Input type="number" min="1" name="quantite" value={form.quantite} onChange={handle} placeholder="Ex.  2" required />
              </Field>
              <Field label="Poids total (kg)" required>
                <Input type="number" min="0" step="any" name="poids" value={form.poids} onChange={handle} placeholder="Ex.  10" required />
              </Field>

              <Field label="Dimensions (L × l × H) (cm)">
                <div className="dt-dims">
                  <Input type="number" name="longueur" value={form.longueur} onChange={handle} placeholder="Longueur" />
                  <Input type="number" name="largeur" value={form.largeur} onChange={handle} placeholder="Largeur" />
                  <Input type="number" name="hauteur" value={form.hauteur} onChange={handle} placeholder="Hauteur" />
                </div>
              </Field>
              <Field label="Nombre de colis" required>
                <Input type="number" min="1" name="colis" value={form.colis} onChange={handle} placeholder="Ex.  1" required />
              </Field>
              <Field label="Photo / document" optional>
                <label className="dt-upload">
                  <img src={uploadIcon} alt="" />
                  <strong>{fichier ? fichier.name : "Cliquez pour ajouter une image"}</strong>
                  <small>ou glissez-déposez</small>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    hidden
                    onChange={(e) => setFichier(e.target.files?.[0] ?? null)}
                  />
                </label>
              </Field>
            </div>
          </Section>

          {/* 3. Origine */}
          <Section
            icon={secGlobeIcon}
            title="3. Origine (pays étranger)"
            text="Lieu de récupération de votre marchandise."
          >
            <div className="dt-grid dt-grid--origin">
              <Field label="Pays" required>
                <Select name="paysOrigine" value={form.paysOrigine} onChange={handle} placeholder="Sélectionnez un pays" options={pays} required />
              </Field>
              <Field label="Ville" required>
                <Input name="villeOrigine" value={form.villeOrigine} onChange={handle} placeholder="Ex.  Guangzhou" required />
              </Field>
              <Field label="Adresse de récupération" required>
                <Input name="adresseRecuperation" value={form.adresseRecuperation} onChange={handle} placeholder="Ex.  Nom du fournisseur, adresse complète" required />
              </Field>
            </div>
          </Section>

          {/* 4. Destination */}
          <Section
            icon={secPinIcon}
            title="4. Destination (Madagascar)"
            text="Lieu de livraison de votre marchandise."
          >
            <div className="dt-grid dt-grid--dest">
              <Field label="Ville à Madagascar" required>
                <Select name="villeMada" value={form.villeMada} onChange={handle} placeholder="Sélectionnez une ville" options={villes} required />
              </Field>
              <Field label="Adresse de livraison" required>
                <Input name="adresseLivraison" value={form.adresseLivraison} onChange={handle} placeholder="Ex.  Quartier, ville, adresse complète" required />
              </Field>
            </div>
          </Section>

          {/* 5. Transport */}
          <Section
            icon={secTruckIcon}
            title="5. Type de transport"
            text="Choisissez le mode de transport et les services souhaités."
          >
            <div className="dt-modes">
              <label className={`dt-mode ${form.transport === "maritime" ? "is-selected" : ""}`}>
                <input type="radio" name="transport" value="maritime" checked={form.transport === "maritime"} onChange={handle} hidden />
                <img src={shipIcon} alt="" />
                <div>
                  <strong>Maritime</strong>
                  <p>Idéal pour les gros volumes et les articles non urgents.</p>
                </div>
              </label>
              <label className={`dt-mode ${form.transport === "aerien" ? "is-selected" : ""}`}>
                <input type="radio" name="transport" value="aerien" checked={form.transport === "aerien"} onChange={handle} hidden />
                <img src={planeIcon} alt="" />
                <div>
                  <strong>Aérien</strong>
                  <p>Plus rapide, idéal pour les articles urgents ou de petite taille.</p>
                </div>
              </label>
            </div>

            <div className="dt-checks">
              <label className="dt-check">
                <input type="checkbox" name="recuperation" checked={form.recuperation} onChange={handle} />
                <span>
                  <strong>Récupération chez le fournisseur</strong>
                  <small>Nous nous chargeons de récupérer votre marchandise à l'étranger.</small>
                </span>
              </label>
              <label className="dt-check">
                <input type="checkbox" name="livraison" checked={form.livraison} onChange={handle} />
                <span>
                  <strong>Livraison à l'adresse indiquée</strong>
                  <small>Nous livrons votre colis à Madagascar.</small>
                </span>
              </label>
            </div>
          </Section>

          {/* Confidentialité */}
          <div className="dt-privacy">
            <img src={lockIcon} alt="" />
            <p>
              Vos données personnelles sont confidentielles et utilisées uniquement
              pour le traitement de votre demande de transport et les formalités
              nécessaires.
            </p>
          </div>

          {/* Boutons */}
          <div className="dt-actions">
            <button type="button" className="dt-btn dt-btn--ghost" onClick={onBack}>
              <span aria-hidden="true">←</span>
              Retour
            </button>
            <button type="submit" className="dt-btn dt-btn--primary">
              Suivant
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>

        {/* ================= Colonne droite ================= */}
        <aside className="dt-side">
          <div className="dt-why">
            <h3>Pourquoi nous choisir ?</h3>
            <ul>
              {WHY_US.map((w) => (
                <li key={w.title}>
                  <span className="dt-why__icon">
                    <img src={w.icon} alt="" />
                  </span>
                  <div>
                    <strong>{w.title}</strong>
                    <p>{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="dt-promo">
            <img src={sideImage} alt="" />
            <div className="dt-promo__body">
              <h3>Du monde entier jusqu'à Madagascar</h3>
              <p>Votre partenaire de confiance pour tous vos envois.</p>
            </div>
          </div>

          <div className="dt-help">
            <div className="dt-help__head">
              <span className="dt-help__icon">
                <img src={clockIcon} alt="" />
              </span>
              <strong>Besoin d'aide ?</strong>
            </div>
            <p>Notre équipe est disponible pour répondre à vos questions.</p>
            <button type="button" className="dt-help__btn">
              <img src={phoneIcon} alt="" />
              Nous contacter
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}