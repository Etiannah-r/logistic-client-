import { useEffect, useState } from "react";
import "./Commander.css";
import { useAccountDialog } from "../components/AccountDialog";

import userIcon from "../icone/compte.png";
import packageIcon from "../icone/commande.png";
import globeIcon from "../icone/maps.png";
import shipIcon from "../icone/bateaux.png";
import planeIcon from "../icone/avion.png";
import pinIcon from "../icone/navigation-gps.png";
import trackingIcon from "../icone/suivi.png";
import shieldIcon from "../icone/securit-et-fiabilité.png";
import shippingImage from "../icone/transport.png";
import cartIcon from "../icone/panier.svg";
import searchIcon from "../icone/recherche.svg";

const STORES = [
  { id: "1688", name: "1688", description: "Produits en gros (Chine)", host: "www.1688.com" },
  { id: "amazon", name: "Amazon", description: "Produits divers", host: "www.amazon.com" },
  { id: "alibaba", name: "Alibaba", description: "Produits en gros", host: "www.alibaba.com" },
  { id: "aliexpress", name: "AliExpress", description: "Produits variés", host: "www.aliexpress.com" },
  { id: "other", name: "Autre site", description: "Collez le lien du produit", host: "" },
];

const INITIAL_ORDERS = [
  { id: "CMD-00124", title: "Chaussures de sport", total: 120, date: "02/10/2026", status: "Livrée" },
  { id: "CMD-00123", title: "Casque audio", total: 85, date: "28/09/2026", status: "En préparation" },
  { id: "CMD-00122", title: "Sac de voyage", total: 45, date: "20/09/2026", status: "Expédiée" },
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);

function StepTitle({ number, children }) {
  return (
    <div className="order-step-title">
      <span>{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

function OrderCard({ number, title, className = "", id, children }) {
  return (
    <section id={id} className={`order-card ${className}`}>
      <StepTitle number={number}>{title}</StepTitle>
      {children}
    </section>
  );
}

export default function Commander() {
  const openAccount = useAccountDialog();
  const [page, setPage] = useState(1);
  const [store, setStore] = useState(STORES[0]);
  const [productUrl, setProductUrl] = useState("https://detail.1688.com/offer/produit-exemple.html");
  const [productTitle, setProductTitle] = useState("Smartphone Android 5G 128Go");
  const [unitPrice, setUnitPrice] = useState(170);
  const [quantity, setQuantity] = useState(1);
  const [transport, setTransport] = useState("maritime");
  const [color, setColor] = useState("Noir");
  const [addedToCart, setAddedToCart] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [notice, setNotice] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState(null);

  const purchaseFee = 10;
  const serviceFee = 15;
  const shippingFee = transport === "maritime" ? 35 : 65;
  const itemsTotal = unitPrice * quantity;
  const total = itemsTotal + purchaseFee + shippingFee + serviceFee;
  const shippingDuration = transport === "maritime" ? "30 – 45 jours" : "5 – 10 jours";
  const destinationDate = transport === "maritime" ? "15 – 30 novembre 2026" : "20 – 27 octobre 2026";
  const displayOrders = activeOrder
    ? [activeOrder, ...orders.filter((order) => order.id !== activeOrder.id)]
    : orders;

  const selectStore = (selectedStore) => {
    setStore(selectedStore);
    setProductUrl(selectedStore.host ? `https://${selectedStore.host}` : "");
    setNotice("");
  };

  const resetExample = () => {
    setStore(STORES[0]);
    setProductUrl("https://detail.1688.com/offer/produit-exemple.html");
    setProductTitle("Smartphone Android 5G 128Go");
    setUnitPrice(170);
    setQuantity(1);
    setTransport("maritime");
    setAddedToCart(false);
    setNotice("L’article de démonstration a été réinitialisé.");
  };

  const addToCart = () => {
    if (!productTitle.trim() || unitPrice <= 0) {
      setNotice("Saisissez le nom de l’article et un prix supérieur à zéro.");
      return;
    }
    setAddedToCart(true);
    setPage(3);
    setNotice("L’article a été ajouté à votre panier.");
  };

  const updateCustomer = (event) => {
    setCustomer((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const confirmOrder = (event) => {
    event.preventDefault();
    if (!addedToCart) {
      setNotice("Ajoutez l’article au panier avant de valider la commande.");
      return;
    }
    if (!acceptedTerms) {
      setNotice("Veuillez accepter les conditions pour valider la commande.");
      return;
    }

    const order = {
      id: `CMD-${String(Date.now()).slice(-5)}`,
      title: productTitle,
      total,
      date: new Intl.DateTimeFormat("fr-FR").format(new Date()),
      status: "Commande confirmée",
      quantity,
      transport,
      duration: shippingDuration,
      customer: { ...customer },
    };
    setActiveOrder(order);
    setOrders((current) => current.filter((existing) => existing.id !== order.id));
    setPage(5);
    setNotice(`Commande ${order.id} confirmée. Vous pouvez suivre son avancement ci-dessous.`);
  };

  const updateOrderStatus = (order) => {
    if (activeOrder?.id !== order.id) setActiveOrder(order);
    setPage(5);
  };

  const timeline = [
    "Commande confirmée",
    "Achat effectué",
    "Article récupéré",
    "En préparation",
    "Expédiée",
    "En transit",
    "Arrivé à Madagascar",
  ];
  const orderProgress = {
    "Commande confirmée": 0,
    "Achat effectué": 1,
    "Article récupéré": 2,
    "En préparation": 3,
    "Expédiée": 4,
    "En transit": 5,
    "Arrivé à Madagascar": 6,
  };
  const currentStep = activeOrder ? orderProgress[activeOrder.status] ?? 0 : 0;

  useEffect(() => {
    const pageTargets = {
      1: "commander-step-1",
      2: "commander-step-3",
      3: "commander-step-5",
      4: "commander-step-6",
      5: "commander-step-7",
      6: "commander-step-8",
    };
    const target = document.getElementById(pageTargets[page]);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  return (
    <div className="commander-page">
      <header className="order-welcome">
        <div>
          <p className="order-eyebrow">PRIME LINK LOGISTICS</p>
          <h1>Commander un article</h1>
          <p>Choisissez un produit, estimez les frais et suivez votre commande jusqu’à Madagascar.</p>
        </div>
        <button type="button" className="order-user" onClick={openAccount} aria-label="Ouvrir mon compte">
          <img src={userIcon} alt="" />
          <span>Mon espace client</span>
        </button>
      </header>

      {page === 1 && <div className="order-top-grid order-page-stack" id="commander-step-1">
        <OrderCard number="1" title="Choix du site d’achat">
          <p className="order-hint">Sélectionnez le site sur lequel vous souhaitez acheter votre article.</p>
          <div className="store-grid">
            {STORES.map((item) => (
              <button
                className={`store-option ${store.id === item.id ? "is-selected" : ""} store-option--${item.id}`}
                type="button"
                key={item.id}
                onClick={() => selectStore(item)}
                aria-pressed={store.id === item.id}
              >
                {item.id === "other" ? (
                  <img src={globeIcon} alt="" />
                ) : (
                  <span className="store-wordmark">{item.name}</span>
                )}
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </button>
            ))}
          </div>
          <div className="order-tip">
            <span aria-hidden="true">i</span>
            <p>Nous achetons l’article pour vous, puis organisons son transport et sa livraison à Madagascar.</p>
          </div>
        </OrderCard>

        <OrderCard number="2" title={`Accès au site ${store.name}`} className="site-access-card">
          <p className="order-hint">Ouvrez la boutique dans un nouvel onglet, puis copiez le lien de l’article ici. Les détails et le prix sont à saisir dans la fiche ci-dessous.</p>
          <label className="product-url-label" htmlFor="product-url">Lien du site ou de l’article</label>
          <div className="product-url">
            <img src={globeIcon} alt="" />
            <input
              id="product-url"
              type="url"
              value={productUrl}
              onChange={(event) => setProductUrl(event.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="site-access-actions">
            {store.host && (
              <a href={`https://${store.host}`} target="_blank" rel="noreferrer" className="order-button order-button--light">
                Ouvrir {store.name} ↗
              </a>
            )}
            <button type="button" className="order-button order-button--green" onClick={resetExample}>
              <img src={searchIcon} alt="" />
              Réinitialiser l’exemple
            </button>
          </div>
          <div className="site-access-note">
            <img src={globeIcon} alt="" />
            <div>
              <strong>Article exemple prêt à être commandé</strong>
              <p>Le prix affiché est une estimation de démonstration, à confirmer par notre équipe.</p>
            </div>
          </div>
          <button type="button" className="order-button order-button--green continue-order" onClick={() => setPage(2)}>
            Continuer vers les détails <span aria-hidden="true">→</span>
          </button>
        </OrderCard>
      </div>}

      {page === 2 && <div className="order-middle-grid order-page-stack" id="commander-step-3">
        <OrderCard number="3" title="Détail de l’article" className="product-card">
          <div className="product-overview">
            <div className="product-visual" aria-label="Illustration du produit">
              <span className="phone-camera" />
              <span className="phone-lens" />
              <span className="phone-screen" />
            </div>
            <div className="product-description">
              <label className="product-edit-field">
                Article
                <input value={productTitle} onChange={(event) => setProductTitle(event.target.value)} aria-label="Nom de l’article" />
              </label>
              <p className="product-rating">★ 4,8 <span>(1 200 avis)</span></p>
              <strong className="product-cny">¥ 1 299,00</strong>
              <label className="product-edit-field">
                Prix estimé (€)
                <input type="number" min="0.01" step="0.01" value={unitPrice} onChange={(event) => setUnitPrice(Number(event.target.value))} aria-label="Prix estimé en euros" />
              </label>
            </div>
          </div>
          <dl className="product-meta">
            <div><dt>Pays :</dt><dd>Chine</dd></div>
            <div><dt>Site :</dt><dd>{store.name}</dd></div>
            <div className="product-meta__url"><dt>Lien :</dt><dd title={productUrl}>{productUrl || "Aucun lien fourni"}</dd></div>
          </dl>
          <div className="product-variants">
            <span>Couleur</span>
            <div>
              {["Noir", "Bleu"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={color === option ? "is-selected" : ""}
                  aria-pressed={color === option}
                  onClick={() => setColor(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <span className="variant-storage">Stockage : 128 Go</span>
          </div>
        </OrderCard>

        <OrderCard number="4" title="Ajout à la commande" className="add-order-card">
          <label className="quantity-label" htmlFor="order-quantity">Quantité</label>
          <div className="quantity-control">
            <button type="button" aria-label="Diminuer la quantité" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
            <output id="order-quantity">{quantity}</output>
            <button type="button" aria-label="Augmenter la quantité" onClick={() => setQuantity((value) => value + 1)}>+</button>
          </div>
          <fieldset className="transport-select">
            <legend>Transport</legend>
            <div>
              <button type="button" className={transport === "maritime" ? "is-selected" : ""} onClick={() => setTransport("maritime")} aria-pressed={transport === "maritime"}>
                <img src={shipIcon} alt="" />
                <span><strong>Maritime</strong><small>30 – 45 jours · économique</small></span>
              </button>
              <button type="button" className={transport === "aerien" ? "is-selected" : ""} onClick={() => setTransport("aerien")} aria-pressed={transport === "aerien"}>
                <img src={planeIcon} alt="" />
                <span><strong>Aérien</strong><small>5 – 10 jours · plus rapide</small></span>
              </button>
            </div>
          </fieldset>
          <div className="cost-estimate">
            <strong>Calcul des frais (estimation)</strong>
            <div><span>Articles ({quantity} × {formatPrice(unitPrice)})</span><span>{formatPrice(itemsTotal)}</span></div>
            <div><span>Frais d’achat</span><span>{formatPrice(purchaseFee)}</span></div>
            <div><span>Transport</span><span>{formatPrice(shippingFee)}</span></div>
            <div><span>Frais de service</span><span>{formatPrice(serviceFee)}</span></div>
            <div className="cost-total"><strong>Total estimé</strong><strong>{formatPrice(total)}</strong></div>
          </div>
          <button type="button" className="order-button order-button--green add-cart-button" onClick={addToCart}>
            <img src={cartIcon} alt="" />
            {page > 2 ? "Mettre à jour le panier" : "Ajouter à ma commande"}
          </button>
        </OrderCard>
      </div>}

      {page === 3 && <div className="order-single-page" id="commander-step-5">
        <OrderCard number="5" title="Votre panier / Commande" className="basket-card">
          {addedToCart ? (
            <>
              <div className="basket-line">
                <span className="mini-product"><span className="phone-screen" /></span>
                <span className="basket-product-name">{productTitle} · {color}</span>
                <span>{quantity} × {formatPrice(unitPrice)}</span>
              </div>
              <div className="basket-costs">
                <div><span>Frais d’achat</span><span>{formatPrice(purchaseFee)}</span></div>
                <div><span>Transport ({transport === "maritime" ? "Maritime" : "Aérien"})</span><span>{formatPrice(shippingFee)}</span></div>
                <div><span>Frais de service</span><span>{formatPrice(serviceFee)}</span></div>
              </div>
              <div className="basket-total">
                <div><strong>Total estimé</strong><strong>{formatPrice(total)}</strong></div>
                <p><img src={trackingIcon} alt="" /> Durée estimée : {shippingDuration}</p>
                <small>Arrivée prévue : {destinationDate}</small>
              </div>
            </>
          ) : (
            <p className="empty-basket">Votre panier est vide. Ajoutez l’article pour voir le récapitulatif.</p>
          )}
          <button type="button" className="order-button order-button--green basket-confirm" onClick={() => setPage(4)}>
            <img src={cartIcon} alt="" /> Passer à la confirmation
          </button>
        </OrderCard>
      </div>}

      {page === 4 && <div className="order-single-page">
        <OrderCard id="commander-step-6" number="6" title="Résumé de la commande" className="summary-card">
          <form onSubmit={confirmOrder}>
            <div className="summary-columns">
              <div className="summary-group">
                <h3><img src={userIcon} alt="" /> Informations du client</h3>
                <label>Nom complet<input name="name" value={customer.name} onChange={updateCustomer} placeholder="Votre nom et prénom" required /></label>
                <label>Téléphone<input name="phone" type="tel" value={customer.phone} onChange={updateCustomer} placeholder="+261 ..." required /></label>
                <label>Email<input name="email" type="email" value={customer.email} onChange={updateCustomer} placeholder="vous@exemple.com" required /></label>
                <h3><img src={pinIcon} alt="" /> Adresse de livraison</h3>
                <label>Adresse de livraison<input name="address" value={customer.address} onChange={updateCustomer} placeholder="Ville et adresse à Madagascar" required /></label>
              </div>
              <div className="summary-group">
                <h3><img src={packageIcon} alt="" /> Détails de l’article</h3>
                <div className="summary-product">
                  <span className="mini-product"><span className="phone-screen" /></span>
                  <span>{productTitle}<br />Couleur : {color} · Quantité : {quantity}</span>
                </div>
                <h3><img src={shipIcon} alt="" /> Frais estimés</h3>
                <div className="summary-fees">
                  <div><span>Articles</span><span>{formatPrice(itemsTotal)}</span></div>
                  <div><span>Frais d’achat</span><span>{formatPrice(purchaseFee)}</span></div>
                  <div><span>Transport</span><span>{formatPrice(shippingFee)}</span></div>
                  <div><span>Frais de service</span><span>{formatPrice(serviceFee)}</span></div>
                  <div className="cost-total"><strong>Total estimé</strong><strong>{formatPrice(total)}</strong></div>
                </div>
              </div>
            </div>
            <label className="terms-check">
              <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
              J’accepte les conditions générales et la politique de confidentialité.
            </label>
            <button id="order-summary" className="order-button order-button--green validate-order" type="submit">
              Valider ma commande · {formatPrice(total)}
            </button>
          </form>
        </OrderCard>

      </div>}

      {page === 5 && <div className="order-single-page">
        <OrderCard id="commander-step-7" number="7" title="Suivi de la commande" className="tracking-card">
          {activeOrder ? (
            <>
              <div className="tracking-heading">
                <strong>Commande #{activeOrder.id}</strong>
                <span>{activeOrder.status}</span>
              </div>
              <p className="tracking-customer">{activeOrder.customer?.name || "Commande existante"} · {activeOrder.customer?.address || "Adresse enregistrée"}</p>
              <ol className="tracking-timeline">
                {timeline.map((step, index) => (
                  <li key={step} className={index <= currentStep ? "is-complete" : ""}>
                    <span>{index < currentStep ? "✓" : index + 1}</span>
                    <div>
                      <strong>{step}</strong>
                      {index === currentStep && (
                        <small>
                          {activeOrder.status === "Commande confirmée"
                            ? "Commande enregistrée aujourd’hui"
                            : `Dernière mise à jour : ${activeOrder.date}`}
                        </small>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="tracking-progress"><span style={{ width: `${Math.max(8, (currentStep / (timeline.length - 1)) * 100)}%` }} /></div>
              <p className="tracking-estimate">Estimation de livraison : {activeOrder.duration || "À confirmer"}</p>
              <button type="button" className="order-button order-button--green see-orders" onClick={() => setPage(6)}>
                Voir mes commandes <span aria-hidden="true">→</span>
              </button>
            </>
          ) : (
            <div className="tracking-empty">
              <img src={trackingIcon} alt="" />
              <strong>Aucune commande sélectionnée</strong>
              <p>Validez votre panier pour créer une commande et afficher son suivi ici.</p>
            </div>
          )}
        </OrderCard>
      </div>}

      {page === 6 && <div className="order-single-page">
        <OrderCard id="commander-step-8" number="8" title="Mes commandes" className="orders-card">
          <div className="orders-list">
            {displayOrders.map((order) => (
              <button type="button" key={order.id} className={`order-history-item ${activeOrder?.id === order.id ? "is-active" : ""}`} onClick={() => updateOrderStatus(order)}>
                <span className="history-product"><img src={packageIcon} alt="" /></span>
                <span className="history-details">
                  <strong>#{order.id}</strong>
                  <span>{order.title}</span>
                  <small>{order.date} · {formatPrice(order.total)}</small>
                </span>
                <span className={`order-status order-status--${order.status === "Livrée" ? "delivered" : order.status === "Commande confirmée" ? "new" : "pending"}`}>{order.status}</span>
                <span className="history-arrow" aria-hidden="true">›</span>
              </button>
            ))}
          </div>
          <div className="secure-note">
            <img src={shieldIcon} alt="" />
            <p>Vos achats sont sécurisés. Notre équipe vous accompagne de l’achat à la livraison.</p>
            <img className="secure-illustration" src={shippingImage} alt="" />
          </div>
        </OrderCard>
      </div>}

      {page > 1 && (
        <nav className="order-page-nav" aria-label="Navigation des étapes">
          <button type="button" className="order-button order-button--light" onClick={() => setPage((current) => Math.max(1, current - 1))}>
            <span aria-hidden="true">←</span> Retour
          </button>
          <span>Page {page} sur 6</span>
        </nav>
      )}

      {notice && <div className="order-notice" role="status">{notice}</div>}
    </div>
  );
}
