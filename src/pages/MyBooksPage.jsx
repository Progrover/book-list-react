import { useState } from "react";

function MyBooksPage({ books, onAddBook, onDeleteBook, onToggleRead }) {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddBook(title.trim());
    setTitle("");
  };

  const filteredBooks = books
    .filter((book) => {
      if (filter === "read") return book.read;
      if (filter === "unread") return !book.read;
      return true;
    })
    .filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );

  const totalBooks = books.length;
  const readBooks = books.filter((b) => b.read).length;
  const unreadBooks = totalBooks - readBooks;

  return (
    <div className="container">
      <div className="page-header">
        <h1>📖 My Books</h1>
        <p>Track your personal reading list</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="number">{totalBooks}</div>
          <div className="label">Total</div>
        </div>
        <div className="stat-card">
          <div className="number">{readBooks}</div>
          <div className="label">Read</div>
        </div>
        <div className="stat-card">
          <div className="number">{unreadBooks}</div>
          <div className="label">Unread</div>
        </div>
      </div>

      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new book title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">+ Add Book</button>
      </form>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search your books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Books</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📭</div>
          <p>
            {books.length === 0
              ? "No books yet. Add your first book above!"
              : "No books match your filter."}
          </p>
        </div>
      ) : (
        <div>
          {filteredBooks.map((book) => (
            <div key={book.id} className="my-book-item">
              <div className="my-book-info">
                <span
                  className={`my-book-title ${book.read ? "is-read" : ""}`}
                >
                  {book.title}
                </span>
                <span className={`read-badge ${book.read ? "read" : "unread"}`}>
                  {book.read ? "✓ Read" : "Unread"}
                </span>
              </div>
              <div className="my-book-actions">
                <button
                  className={`btn btn-sm ${
                    book.read ? "btn-warning" : "btn-success"
                  }`}
                  onClick={() => onToggleRead(book.id)}
                >
                  {book.read ? "Mark Unread" : "Mark Read"}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDeleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooksPage;
