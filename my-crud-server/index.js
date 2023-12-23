const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const app = express();
const cors = require("cors");
const port = 3001;
var corsOptions = {
  origin: "http://localhost:3000/",
};
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");

let db = {};
//db.mongoose =
//db.book =
const connectToMongoDB = async () => {
  try {
    db.mongoose = await mongoose.connect("mongodb://localhost:27017/mybookdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const Schema = mongoose.Schema;
    const bookSchema = new Schema({
      title: String,
      year: Number,
      author: String,
    });
    const book = mongoose.model("Book", bookSchema);
    db.book = book;
    console.log("Connected to MongoDB");
    //db = client.db("");
  } catch (err) {
    console.error("MongoDB Connection Error: ", err);
  }
};
app.post("/books", (req, res) => {
  //const book = req.body;
  // db.collection("books").insertOne(book, (err, result) => {
  //   if (err) {
  //     console.error("Insert Error: ", err);
  //     return res.status(500).send(err);
  //   }
  //   res.status(201).send(result.ops[0]);
  // });
  book = new db.book(req.body);
  book
    .save(book)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      console.error("Insert Error: ", err);
      return res.status(500).send(err);
    });
});

app.get("/books", (req, res) => {
  console.log("hello from here");
  book = db.book;
  book
    .find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/books/:id", (req, res) => {
  if (!req.body) res.status(404).send("you have to enter new data");
  let book = new db.book(req.body);
  const id = req.params.id;
  //const updatedBook = req.body;
  book
    .updateOne({ _id: id }, book)
    .then((data) => {
      if (!data) {
        res.status(404).send("data wasn`t inserted");
      }
      res.status(200).send("book was updated");
    })
    .catch((err) => {
      console.error("Update Error: ", err);
      return res.status(500).send(err);
    });
  // db.collection("books").updateOne(
  //   { _id: new ObjectId(id) },
  //   { $set: updatedBook },
  //   (err, result) => {
  //     if (err) {
  //       console.error("Update Error: ", err);
  //       return res.status(500).send(err);
  //     }
  //     res.status(200).send(result);
  //   }
  // );
});
app.get("/simpleroute", (req, res) => {
  res.status(200).send("hello - world");
});
app.delete("/books/:id", (req, res) => {
  console.log("book to be deleted" + req.params.id);
  const id = req.params.id;
  //book = new db.book(req.body);
  db.book
    .deleteOne({ _id: id })
    .then((data) => {
      res.status(200).send("book have been removed");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(err);
    });
});
connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
