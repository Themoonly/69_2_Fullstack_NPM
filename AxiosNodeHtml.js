const express = require("express");
const axios = require("axios");
var bodyParser = require('body-parser');
const path = require("path");
const app = express();

const base_url = "http://localhost:3000"; 

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(__dirname + "/public"));

// Route for viewing all books
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/books");
        res.render("books", { books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});

// Route for viewing a single book
app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/books/" + req.params.id);
        res.render("book", { book: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});

// Route for creating a new book
app.get("/create", (req, res) => {
    res.render("create");
});

// Route for handling the creation of a new book
app.post("/create", async (req, res) => {
    try {
        const data = {title: req.body.title, author: req.body.author, genre: req.body.genre};
        await axios.post(base_url + "/books", data);
        res.redirect("/");
    } catch (err) {
        console.error(err);   
        res.status(500).send('error');
    }
});

// Route for updating a book
app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(
        base_url + "/books/" + req.params.id);
        res.render("update", { book: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});

// Route for handling the update of a book
app.post("/update/:id", async (req, res) => {
    try {
        const data = {title: req.body.title, author: req.body.author, genre: req.body.genre};
        await axios.put(base_url + "/books/" + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);   
        res.status(500).send('error');
    }
});

// Route for deleting a book
app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/books/" + req.params.id); 
        res.redirect("/");
    } catch (err) {
        console.error(err);   
        res.status(500).send('error');
    }
});

// Start the server
app.listen(5500, () => {
    console.log("Server is running on port 5500");
});
