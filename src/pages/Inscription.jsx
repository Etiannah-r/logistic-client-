import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../icone/logo.jpeg";

export default function Inscription() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirm-password")) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    sessionStorage.setItem("primLinkAccountName", String(formData.get("name") || ""));
    sessionStorage.setItem("primLinkAccountEmail", String(formData.get("email") || ""));
    navigate("/espace-client");
  }

  return (
    <main className="auth-page">
      <Link className="auth-brand" to="/" aria-label="Retour à l’accueil">
        <img className="brand-mark" src={logo} alt="" />
        <div className="brand-text">
          <h1 className="titre">PRIME LINK</h1>
          <h2 className="sous_titre">LOGISTICS</h2>
        </div>
      </Link>
      <section className="auth-card signup-card">
        <h1>S’inscrire</h1>
        <p className="auth-intro">
          Inscrivez-vous pour accéder à nos services, suivre vos commandes et
          profiter d’une expérience en toute simplicité.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Nom du compte</label>
          <input id="signup-name" name="name" type="text" autoComplete="name" placeholder="Entrez votre nom utilisateur" required />

          <label htmlFor="signup-email">Email</label>
          <input id="signup-email" name="email" type="email" autoComplete="email" placeholder="Entrez votre email" required />

          <label htmlFor="signup-password">Mot de passe</label>
          <input id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="Entrez votre mot de passe" required />

          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" placeholder="Entrez votre mot de passe" required />
          {passwordError && <p className="form-error" role="alert">{passwordError}</p>}

          <button className="button auth-submit" type="submit">Créer mon compte</button>
        </form>
        <p className="auth-switch">
          Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>
        </p>
        <Link className="back-home" to="/">Retour à l’accueil</Link>
      </section>
    </main>
  );
}
