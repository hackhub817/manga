import React, { useState } from "react";

const BookSelector = ({ books, onBookSelect }) => {
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookSelect = (book) => {
    setSelectedBookId(book.id);
    onBookSelect(book);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {books.map((book) => (
        <button
          key={book.id}
          onClick={() => handleBookSelect(book)}
          className={`px-1 text-black border-2 border-black rounded  transition duration-300 
            ${
              selectedBookId === book.id
                ? "bg-green-950 text-slate-100 border-yellow-400"
                : "bg-slate-100"
            }`}
        >
          {book.title}
        </button>
      ))}
    </div>
  );
};

export default BookSelector;
