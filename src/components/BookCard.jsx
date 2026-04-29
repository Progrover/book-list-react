import { useNavigate } from "react-router-dom";

function BookCard({ book, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : null;

  const handleClick = () => {
    navigate(`/book/${book.key}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(book);
  };

  return (
    <div className="book-card" onClick={handleClick}>
      {coverUrl ? (
        <div className="book-card-cover">
          <img src={coverUrl} alt={book.title} loading="lazy" />
        </div>
      ) : (
        <div className="book-card-placeholder">📖</div>
      )}

      <div className="book-card-body">
        <div className="book-card-title">{book.title}</div>
        <div className="book-card-author">
          {book.author_name ? book.author_name.join(", ") : "Unknown author"}
        </div>
        <div className="book-card-meta">
          {book.first_publish_year && (
            <span className="book-card-year">{book.first_publish_year}</span>
          )}
          <button
            className="favorite-btn"
            onClick={handleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
