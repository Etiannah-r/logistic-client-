import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../icone/google.png";
import logo from "../icone/logo.jpeg";

export default function Connexion() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    sessionStorage.setItem("primLinkAccountEmail", email);
    sessionStorage.setItem(
      "primLinkAccountName",
      email.split("@")[0]?.replace(/[._-]+/g, " ").toUpperCase() || "Mon compte",
    );
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
      <section className="auth-card">
        <h1>Connexion</h1>
        <p className="auth-intro">Bienvenue, connectez-vous à votre espace client.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" autoComplete="email" placeholder="Entrez votre email" required />

          <label htmlFor="login-password">Mot de passe</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Entrez votre mot de passe" required />

          <label className="remember-option">
            <input type="checkbox" name="remember" />
            <span>Se souvenir de moi</span>
          </label>
          <button className="button auth-submit" type="submit">Se connecter</button>
        </form>
        <div className="auth-divider"><span>ou</span></div>
        <button className="google-button" type="button" onClick={() => {
          sessionStorage.setItem("primLinkAccountName", "Mon compte");
          sessionStorage.setItem("primLinkAccountEmail", "");
          navigate("/espace-client");
        }}>
          <img className="google-mark" src={googleIcon} alt="Google" />
          Continuer avec Google
        </button>
        <p className="auth-switch">
          Vous n’avez pas de compte ? <Link to="/inscription">S’inscrire</Link>
        </p>
      </section>
    </main>
  );
}
