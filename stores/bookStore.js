export const useBookStore = defineStore('book', () => {
  const books = ref(undefined);
  async function getBooks() {
    const { data, status } = await useFetch('http://localhost:8080/books');

    if (status.value === 'success') {
      books.value = data.value;
    }
  }

  return { books, getBooks };
});
