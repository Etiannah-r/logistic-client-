export default function AccountDetails({ className = "" }) {
  const accountName = sessionStorage.getItem("primLinkAccountName") || "Mon compte";
  const accountEmail = sessionStorage.getItem("primLinkAccountEmail") || "Adresse non renseignée";

  return (
    <div className={`account-details ${className}`.trim()}>
      <div>
        <span>Nom du compte</span>
        <strong>{accountName}</strong>
      </div>
      <div>
        <span>Email</span>
        <strong>{accountEmail}</strong>
      </div>
    </div>
  );
}
