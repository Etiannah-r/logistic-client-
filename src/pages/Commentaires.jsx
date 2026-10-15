import { useState } from "react";
import userIcon from "../icone/compte.png";
import "./Commentaires.css";

const comments = [
  {
    name: "Jean-Pierre",
    company: "GlobalTrade Solutions",
    date: "12 Mars 2026",
    text: "Service rapide et fiable. Prime Link a dépassé nos attentes.",
  },
  {
    name: "Mialy R.",
    company: "Cliente particulière",
    date: "11 Mars 2026",
    text: "Une équipe à l'écoute et un suivi clair du début à la livraison.",
  },
  {
    name: "Jean-Pierre",
    company: "GlobalTrade Solutions",
    date: "8 Mars 2026",
    text: "Je recommande Prime Link pour leur sérieux et leur réactivité.",
  },
];

function CommentCard({ name, company, date, text, rating = 5 }) {
  return (
    <article className="comments-review">
      <div className="comments-review__heading">
        <span className="comments-review__avatar">
          <img src={userIcon} alt="" />
        </span>
        <div className="comments-review__identity">
          <strong>{name}, {company}</strong>
          <span>
            <span className="comments-review__stars" aria-label={`${rating} étoiles sur 5`}>
              {"★".repeat(rating)}{"☆".repeat(5 - rating)}
            </span>
            {" "}· Publié le {date}
          </span>
        </div>
      </div>
      <p>{text}</p>
    </article>
  );
}

export default function Commentaires() {
  const [rating, setRating] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState(comments);

  const submitComment = (event) => {
    event.preventDefault();
    setCommentsList((currentComments) => [
      {
        name: sessionStorage.getItem("primLinkAccountName") || "Client",
        company: "Client Prime Link",
        date: new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        text: commentText,
        rating: Number(rating),
      },
      ...currentComments,
    ]);
    setIsSent(true);
  };

  return (
    <div className="comments-page">
      {isSent ? (
        <main className="comments-success">
          <div className="comments-success__copy">
            <span className="comments-eyebrow" />
            <h1>Message envoyé</h1>
            <span className="comments-success__check" aria-hidden="true">✓</span>
            <p className="comments-success__confirmation">
              Votre message a été envoyé avec<br />succès !
            </p>
            <p className="comments-success__note">
              Nous vous répondrons dans les plus brefs<br className="comments-desktop-break" /> délais.
            </p>
          </div>
          <button
            type="button"
            className="comments-button comments-success__home"
            onClick={() => setIsSent(false)}
          >
            Retour aux commentaires <span aria-hidden="true">→</span>
          </button>
        </main>
      ) : (
        <main className="comments-main">
          <section className="comments-list" aria-labelledby="comments-title">
            <p className="comments-brand-name">Prime Link Logistics</p>
            <span className="comments-eyebrow" />
            <h1 id="comments-title">Commentaires et<br />Évaluations Clients</h1>

            <div className="comments-review-list">
              {commentsList.map((comment, index) => (
                <CommentCard key={`${comment.name}-${comment.date}-${index}`} {...comment} />
              ))}
            </div>
          </section>

          <section className="comments-form-card" aria-labelledby="comments-form-title">
            <h2 id="comments-form-title">Soumettre votre<br />commentaire</h2>
            <form onSubmit={submitComment}>
              <fieldset className="comments-rating">
                <legend>Votre note globale</legend>
                <div className="comments-rating__stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className={value <= Number(rating) ? "is-active" : ""}
                      title={`${value} étoile${value > 1 ? "s" : ""}`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={rating === String(value)}
                        onChange={(event) => setRating(event.target.value)}
                        required
                      />
                      <span aria-hidden="true">{value <= Number(rating) ? "★" : "☆"}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="comments-field">
                <span>Votre commentaire</span>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Partagez votre expérience avec Prime Link Logistics..."
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  required
                />
              </label>
              <button type="submit" className="comments-button comments-form-card__submit">
                Publier mon commentaire <span aria-hidden="true">→</span>
              </button>
              <p className="comments-form-card__notice">
                Votre avis compte pour nous.<br />Tous les commentaires sont modérés.
              </p>
            </form>
          </section>
        </main>
      )}
    </div>
  );
}
