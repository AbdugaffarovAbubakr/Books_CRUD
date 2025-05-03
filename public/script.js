const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

async function fetchBooks() {
  const res = await fetch('/books');
  const books = await res.json();

  bookList.innerHTML = '';
  books.forEach((book) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <b>${book.title}</b> (${book.year}) by ${book.author}
      <button onclick="deleteBook(${book.id})">❌ Delete</button>
    `;
    bookList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newBook = {
    title: form.title.value,
    author: form.author.value,
    year: parseInt(form.year.value)
  };

  await fetch('/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook)
  });

  form.reset();
  fetchBooks();
});

async function deleteBook(id) {
  await fetch(`/books/${id}`, { method: 'DELETE' });
  fetchBooks();
}

fetchBooks();
