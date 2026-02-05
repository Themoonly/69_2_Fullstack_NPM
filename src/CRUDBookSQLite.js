require("dotenv").config();

const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();

// connect to database
const db = new sqlite3.Database("./Database/Book.sqlite");

// pasrse json incomeing request bodies
app.use(express.json());

// create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS books(
  id INTEGER PRIMARY KEY,
  title TEXT,
  author TEXT
)`);

// routes for testing
app.get("/", (req, res) => {
  res.send("this is CRUD with SQLite example!");
});

// routes to get all books
app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

//route to get book by id
app.get("/books/:id", (req, res) => {
  db.get("SELECT * FROM books WHERE id = ?", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("Book not found");
      } else {
        res.json(row);
      }
    }
  });
});

//post book 
app.post("/books", (req, res) => {
  const book = req.body;
  db.run(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [book.title, book.author],
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        book.id = this.lastID;
        res.send(book);
      }
    },
  );
});

//route to update book
app.put("/books/:id", (req, res) => {
  const book = req.body;
  db.run(
    "UPDATE books SET title = ?, author = ? WHERE id = ?",
    [book.title, book.author, req.params.id],
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(book);
      }
    },
  );
});


//route to delete book
app.delete("/books/:id", (req, res) => {
  db.run("DELETE FROM books WHERE id = ?", req.params.id, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
