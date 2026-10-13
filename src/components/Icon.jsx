import icons from "../config/icons";

// Affiche l'icône définie dans src/config/icons.js (rien si le lien est vide)
export default function Icon({ name, size = 16, className = "" }) {
  const src = icons[name];
  if (!src) return <span className={`icon-empty ${className}`} style={{ width: size, height: size }} />;
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`icon ${className}`}
      onError={(e) => (e.currentTarget.style.visibility = "hidden")}
    />
  );
}
