require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "Book 1",
        auther: "Author 1"
    },
    {
        id: 2,
        title: "Book 2",
        auther: "Author 2"
    },
    {
        id: 3,
        title: "Book 3",
        auther: "Author 3"
    }
];

app.get("/", (req, res) => {
  res.send("Hello teerayut test cool world");
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    res.json(book);
});

// create
app.post('/books', (req, res) => {
    const Book = {
        id: books.length + 1,
        title: req.body.title,
        auther: req.body.auther
    };
    // add in end array
    books.push(Book);
    res.send(Book);
});

// update book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    book.title = req.body.title;
    book.auther = req.body.auther;
    res.send(book);
});

// delete book
app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    const index = books.indexOf(book);
    // cut index from array
    books.splice(index, 1);
    res.send(book);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});