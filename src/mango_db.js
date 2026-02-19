// Description: Node Express REST API with Sequelize and SQLite CRUD Book
// Date: 03/29/2020
// npm install express sequelize sqlite3
// Run this file with node SequlizeSQLiteCRUDBook.js
// Test with Postman
// require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// parse incoming requests
// app.use(express.json());

// set db url from environment variable or use default value if not set
// const dbUrl = 'postgres://admin:MTLecf24168@node86097-env-few7049975.th.app.ruk-com.cloud:11830'

mongoose.connect(
  "mongodb://admin:MTLecf24168@node86097-env-few7049975.th.app.ruk-com.cloud:11830",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

//create model หนังสือ (Book)
const Book = mongoose.model("Book", {
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title:String,
  author:String,
});

const app = express();
app.use(bodyParser.json());

// เส้นทาง API ต่างๆ
// app.get("/", (req, res) => {
//   res.send("Hello Fewkung keepcool handsome and smart! :D file PGCRUD.js");
// });

app.post("/books", async (req, res) => {
  try {
    const lastbook = await Book.findOne().sort({ id: -1 });
    const nextId = lastbook ? lastbook.id + 1 : 1;

    const book = new Book({
      id: nextId,
      ...req.body,
    });

    await book.save();
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ดึงข้อมูลหนังสือทั้งหมด
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ดึงข้อมูลหนังสือตาม ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// สร้างหนังสือใหม่
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ id: req.params.id });
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});
// ค้นหาหนังสือตาม ID ที่ระบุในพารามิเตอร์ของ URL

// เริ่มต้นเซิร์ฟเวอร์
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
