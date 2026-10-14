import AccountDetails from "../components/AccountDetails";
import userIcon from "../icone/compte.png";

export default function Profil() {
  return (
    <section className="page account-page">
      <header className="account-page__heading">
        <img src={userIcon} alt="" />
        <div>
          <p>ESPACE CLIENT</p>
          <h1>Mon compte</h1>
          <span>Consultez les informations de votre compte.</span>
        </div>
      </header>
      <section className="panel account-page__panel" aria-labelledby="account-page-title">
        <h2 id="account-page-title">Informations du compte</h2>
        <AccountDetails className="account-details--page" />
      </section>
    </section>
  );
}
