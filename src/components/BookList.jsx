import BookItem from "./BookItem";

function BookList({ books, deleteBook, toggleRead }) {
  return (
    <div>
      {books.map(book => (
        <BookItem
          key={book.id}
          book={book}
          deleteBook={deleteBook}
          toggleRead={toggleRead}
        />
      ))}
    </div>
  );
}

export default BookList;