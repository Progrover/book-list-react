import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function DiscoverPage({ favorites, onToggleFavorite }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("javascript");
  const [category, setCategory] = useState("javascript");

  const categories = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "fiction", label: "Fiction" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "fantasy", label: "Fantasy" },
  ];

  // useEffect — загрузка данных с API
  useEffect(() => {
    let cancelled = false;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`
        );

        if (!cancelled) {
          const results = response.data.docs.map((doc) => ({
            key: doc.key.replace("/works/", ""),
            title: doc.title,
            author_name: doc.author_name,
            first_publish_year: doc.first_publish_year,
            cover_id: doc.cover_i,
            subject: doc.subject ? doc.subject.slice(0, 3) : [],
          }));
          setBooks(results);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load books. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setQuery(search.trim());
    }
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    setQuery(val);
    setSearch("");
  };

  const isFavorite = (book) => {
    return favorites.some((f) => f.key === book.key);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>🔍 Discover Books</h1>
        <p>Search millions of books from the Open Library</p>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search books by title, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-cover" />
              <div className="skeleton-body">
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="error-message">
          <div className="icon">⚠️</div>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => setQuery(query)}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="empty-state">
          <div className="icon">📭</div>
          <p>No books found. Try a different search.</p>
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              isFavorite={isFavorite(book)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscoverPage;
