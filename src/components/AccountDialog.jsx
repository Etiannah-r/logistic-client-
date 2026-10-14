import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountDetails from "./AccountDetails";
import userIcon from "../icone/compte.png";

const AccountDialogContext = createContext(null);

export function AccountDialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("primLinkAccountName");
    sessionStorage.removeItem("primLinkAccountEmail");
    navigate("/");
  };

  return (
    <AccountDialogContext.Provider value={() => setIsOpen(true)}>
      {children}
      {isOpen && (
        <div className="account-modal-backdrop" onClick={() => setIsOpen(false)}>
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
              <button type="button" aria-label="Fermer" onClick={() => setIsOpen(false)}>×</button>
            </div>
            <AccountDetails className="account-modal__details" />
            <div className="account-modal__actions">
              <button type="button" className="account-modal__logout" onClick={logout}>Se déconnecter</button>
              <button type="button" className="account-modal__confirm" onClick={() => setIsOpen(false)}>OK</button>
            </div>
          </section>
        </div>
      )}
    </AccountDialogContext.Provider>
  );
}

export function useAccountDialog() {
  const openAccount = useContext(AccountDialogContext);
  if (!openAccount) {
    throw new Error("useAccountDialog doit être utilisé dans AccountDialogProvider.");
  }
  return openAccount;
}
