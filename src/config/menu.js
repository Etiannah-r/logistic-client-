// Structure du sidebar : chaque lien correspond à une vraie route (voir App.jsx)
const menu = [
  {
    title: "Navigation",
    icon: "navigation",
    items: [
      { label: "Accueil", path: "/espace-client" },
      { label: "À propos", path: "/espace-client/a-propos" },
      { label: "Fonctionnalités", path: "/espace-client/fonctionnalites" },
    ],
  },
  {
    title: "Logistique",
    icon: "logistique",
    items: [
      { label: "Transport", path: "/espace-client/transport" },
      { label: "Commander", path: "/espace-client/commander" },
    ],
  },
  {
    title: "Commentaires",
    icon: "commentaires",
    items: [{ label: "Laisser un commentaire", path: "/espace-client/commentaires" }],
  },
  {
    title: "Compte",
    icon: "compte",
    items: [{ label: "Mon profil", path: "/espace-client/profil" }],
  },
];

export default menu;
