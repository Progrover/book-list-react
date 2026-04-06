import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Filter from "./components/Filter";

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "1984", read: false },
    { id: 2, title: "The Hobbit", read: true }
  ]);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const addBook = (title) => {
    const newBook = {
      id: Date.now(),
      title,
      read: false
    };
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const toggleRead = (id) => {
    setBooks(
      books.map(book =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
  };

  const filteredBooks = books
    .filter(book => {
      if (filter === "read") return book.read;
      if (filter === "unread") return !book.read;
      return true;
    })
    .filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>📚 Book List</h1>

      <BookForm addBook={addBook} />

      <Filter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {filteredBooks.length === 0 ? (
        <p>Книги не найдены</p>
      ) : (
        <BookList
          books={filteredBooks}
          deleteBook={deleteBook}
          toggleRead={toggleRead}
        />
      )}
    </div>
  );
}

export default App;