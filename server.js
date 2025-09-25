// ===== Import Packages =====
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// ===== In-Memory Data (Books Array) =====
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// ===== Routes =====

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// 1️⃣ GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// 2️⃣ GET book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// 3️⃣ POST new book
app.post("/books", (req, res) => {
  const { title, author } = req.body || {};
  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// 4️⃣ PUT update book by ID
app.put("/books/:id", (req, res) => {
  const { title, author } = req.body || {};
  const book = books.find(b => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// 5️⃣ DELETE book by ID
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(bookIndex, 1);
  res.json({ message: "Book deleted", deletedBook });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});