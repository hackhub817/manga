export const fetchBooks = async () => {
  const response = await fetch("http://52.195.171.228:8080/books/");
  return response.json();
};

export const fetchChapter = async (chapterId) => {
  const response = await fetch(
    `http://52.195.171.228:8080/chapters/${chapterId}/`
  );
  return response.json();
};
