import { useState } from "react";

function BookForm({ addBook }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addBook(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите название книги"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default BookForm;