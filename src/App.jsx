import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import DiscoverPage from "./pages/DiscoverPage";
import MyBooksPage from "./pages/MyBooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import "./styles/index.css";

function App() {
  // ===== My Books state (with LocalStorage persistence via useEffect) =====
  const [myBooks, setMyBooks] = useState(() => {
    const saved = localStorage.getItem("myBooks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "1984", read: false },
          { id: 2, title: "The Hobbit", read: true },
        ];
  });

  // ===== Favorites state (with LocalStorage persistence via useEffect) =====
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // useEffect — сохранение myBooks в LocalStorage
  useEffect(() => {
    localStorage.setItem("myBooks", JSON.stringify(myBooks));
  }, [myBooks]);

  // useEffect — сохранение favorites в LocalStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ===== My Books handlers (lifted state up) =====
  const addBook = (title) => {
    const newBook = {
      id: Date.now(),
      title,
      read: false,
    };
    setMyBooks((prev) => [...prev, newBook]);
  };

  const deleteBook = (id) => {
    setMyBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const toggleRead = (id) => {
    setMyBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
  };

  // ===== Favorites handler (shared state) =====
  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.key === book.key);
      if (exists) {
        return prev.filter((f) => f.key !== book.key);
      }
      return [...prev, book];
    });
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar favoritesCount={favorites.length} />

        <Routes>
          <Route
            path="/"
            element={
              <DiscoverPage
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/my-books"
            element={
              <MyBooksPage
                books={myBooks}
                onAddBook={addBook}
                onDeleteBook={deleteBook}
                onToggleRead={toggleRead}
              />
            }
          />
          <Route
            path="/book/:id"
            element={
              <BookDetailPage
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
