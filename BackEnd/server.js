const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');


app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.gg1uhaj.mongodb.net/?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Defined a Schema
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
})

// Mongoose Model
const bookModel = mongoose.model('books', bookSchema);

app.delete('/api/book/:id' ,async (req, res)=>{
  console.log("Delete: " + req.params.id);

  let book = await bookModel.findByIdAndDelete(req.params.id);
  res.send(book);
})



app.put('/api/book/:id', async(req, res) =>{
  console.log("Update: " +req.params.id)
  let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(book);
})

// Express Post Route for Creating a Book
app.post('/api/book', (req, res) => {
  console.log(req.body);
  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })
    .then(() => { res.send("Book Created") })
    .catch(() => { res.send("Book Not Created") })
})

// Default Route for HTTP GET Requests at Root Path ('/')
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Express Get Route for Fetching All Books
app.get('/api/books', async (req, res) => {

  let books = await bookModel.find({});
  res.json(books);

})

// Express Get Route for Fetching a Specific Book by ID
app.get('/api/book/:id', async (req, res) => {

  console.log(req.params.id);

  let book = await bookModel.findById({ _id: req.params.id })
  res.send(book);

})

// Express Server Listening on a Port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})