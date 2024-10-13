import React from "react";

const PageViewer = ({ chapter, currentPageIndex, onPageChange }) => {
  const handleClick = (e) => {
    const direction = e.clientX > window.innerWidth / 2 ? 1 : -1;
    onPageChange(direction);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center items-center">
        <img
          src={chapter.pages[currentPageIndex].image.file}
          alt={`Page ${currentPageIndex + 1}`}
          className="h-[75vh] w-auto max-h-[90%] max-w-[90%] cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="flex justify-center mt-2">
        <p className="text-lg md:text-xl">
          Page {currentPageIndex + 1} / {chapter.pages.length}
        </p>
      </div>
    </div>
  );
};

export default PageViewer;
