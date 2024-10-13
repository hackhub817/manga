import React, { useState, useEffect } from "react";
import { fetchBooks, fetchChapter } from "./services/api";
import BookList from "./components/BookList";
import ChapterList from "./components/ChapterList";
import PageViewer from "./components/PageViewer";
import "./index.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const loadBooks = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData);
      setSelectedBook(booksData[0]);
    };
    loadBooks();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      const loadChapter = async () => {
        const chapterData = await fetchChapter(selectedBook.chapter_ids[0]);
        setSelectedChapter(chapterData);
        setCurrentPageIndex(0);
      };
      loadChapter();
    }
  }, [selectedBook]);

  const handleChapterSelect = async (chapterIndex) => {
    const chapterData = await fetchChapter(
      selectedBook.chapter_ids[chapterIndex]
    );
    setSelectedChapter(chapterData);
    setCurrentPageIndex(0);
  };

  const handlePageChange = async (direction) => {
    const newIndex = currentPageIndex + direction;

    if (newIndex >= 0 && newIndex < selectedChapter.pages.length) {
      setCurrentPageIndex(newIndex);
    } else if (newIndex < 0 && selectedChapter.chapter_index > 0) {
      const prevChapterData = await fetchChapter(
        selectedBook.chapter_ids[selectedChapter.chapter_index - 1]
      );
      setSelectedChapter(prevChapterData);
      setCurrentPageIndex(prevChapterData.pages.length - 1);
    } else if (
      newIndex >= selectedChapter.pages.length &&
      selectedChapter.chapter_index < selectedBook.chapter_ids.length - 1
    ) {
      const nextChapterData = await fetchChapter(
        selectedBook.chapter_ids[selectedChapter.chapter_index + 1]
      );
      setSelectedChapter(nextChapterData);
      setCurrentPageIndex(0);
    }
  };

  return (
    <div className="p-6">
      {books.length > 0 && (
        <>
          <BookList books={books} onBookSelect={setSelectedBook} />
          {selectedBook && (
            <>
              <ChapterList
                chapters={selectedBook.chapter_ids}
                currentChapterIndex={selectedChapter?.chapter_index}
                onChapterSelect={handleChapterSelect}
              />
              {selectedChapter && (
                <PageViewer
                  chapter={selectedChapter}
                  currentPageIndex={currentPageIndex}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
