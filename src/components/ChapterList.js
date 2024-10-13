import React from "react";

const ChapterList = ({ chapters, currentChapterIndex, onChapterSelect }) => {
  return (
    <div className="flex  justify-center mt-2 flex-wrap">
      {chapters.map((chapter, index) => (
        <button
          key={index}
          onClick={() => onChapterSelect(index)}
          className={`px-3  rounded transition duration-300 ${
            currentChapterIndex === index
              ? "bg-green-950 text-white"
              : "bg-slate-100 text-black"
          }  border-2 border-black text-sm sm:text-base`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ChapterList;
