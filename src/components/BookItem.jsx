function BookItem({ book, deleteBook, toggleRead }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      margin: "10px 0"
    }}>
      <span
        style={{
          textDecoration: book.read ? "line-through" : "none"
        }}
      >
        {book.title}
      </span>

      <div>
        <button onClick={() => toggleRead(book.id)}>
          {book.read ? "Не прочитано" : "Прочитано"}
        </button>

        <button onClick={() => deleteBook(book.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default BookItem;