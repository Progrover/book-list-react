import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookDetailPage({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect — загрузка деталей книги с API
  useEffect(() => {
    let cancelled = false;

    const fetchBookDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://openlibrary.org/works/${id}.json`
        );

        if (!cancelled) {
          const data = response.data;
          setBook({
            key: id,
            title: data.title,
            description:
              typeof data.description === "string"
                ? data.description
                : data.description?.value || "No description available.",
            cover_id: data.covers ? data.covers[0] : null,
            subjects: data.subjects ? data.subjects.slice(0, 6) : [],
            first_publish_date: data.first_publish_date || null,
            authors: data.authors
              ? data.authors.map((a) => a.author?.key)
              : [],
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load book details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBookDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const isFavorite = book ? favorites.some((f) => f.key === book.key) : false;

  const handleToggleFavorite = () => {
    if (book) {
      onToggleFavorite({
        key: book.key,
        title: book.title,
        cover_id: book.cover_id,
        author_name: [],
        first_publish_year: book.first_publish_date,
      });
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner" />
          <p>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <div className="icon">⚠️</div>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!book) return null;

  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
    : null;

  return (
    <div className="container">
      <div className="book-detail">
        <div className="back-link" onClick={() => navigate(-1)}>
          ← Back to list
        </div>

        <div className="book-detail-card">
          <div className="book-detail-top">
            <div className="book-detail-cover">
              {coverUrl ? (
                <img src={coverUrl} alt={book.title} />
              ) : (
                <span className="placeholder-icon">📖</span>
              )}
            </div>

            <div className="book-detail-info">
              <h1>{book.title}</h1>

              {book.first_publish_date && (
                <p className="author">
                  First published: {book.first_publish_date}
                </p>
              )}

              {book.subjects.length > 0 && (
                <div className="meta-row">
                  {book.subjects.map((subject, i) => (
                    <span key={i} className="meta-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              )}

              <div className="description">{book.description}</div>
            </div>
          </div>

          <div className="book-detail-actions">
            <button
              className={`btn ${isFavorite ? "btn-danger" : "btn-primary"}`}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
            <button className="btn btn-success" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
