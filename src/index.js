require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 7000; 
//ถ้าหาตัวแปร PORT ใน .env ไม่เจอสามารถรันด้วย port 7000 แทนได้

app.get("/", (req, res) => {
  res.send("Hello teerayut keep cool");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
