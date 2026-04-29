import BookCard from "../components/BookCard";

function FavoritesPage({ favorites, onToggleFavorite }) {
  return (
    <div className="container">
      <div className="page-header">
        <h1>❤️ Favorites</h1>
        <p>Your saved books ({favorites.length})</p>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <div className="icon">💔</div>
          <p>No favorite books yet.</p>
          <p style={{ fontSize: "0.9rem", marginTop: "8px" }}>
            Browse the Discover page and click the heart icon to save books here.
          </p>
        </div>
      ) : (
        <div className="book-grid">
          {favorites.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
