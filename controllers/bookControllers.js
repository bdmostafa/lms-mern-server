const { validationResult } = require("express-validator");

//Models
const Book = require("../models/books");

module.exports.addBookController = async (req, res, next) => {
  // Firstly check on validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors.array());

  // If valid, then execute to add a new Book
  try {
    const newBook = new Book({
      // Adding new field as owner
      ...req.body,
      owner: req.user._id,
    });
    await newBook.save();
    res.send(newBook);
  } catch (err) {
    next(err);
  }
};

module.exports.getBooksController = async (req, res, next) => {
  console.log(req.user);

  // Getting Books from server
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    next(err);
  }
};

module.exports.getBookController = async (req, res, next) => {
  // Check on validationResult
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(404).send("Book Not Found");

  // Getting Book from server
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id).populate(
      "owner",
      "firstName lastName"
    );
    if (!book) return res.status(404).send("Book Not Found");
    res.send(book);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBookController = async (req, res, next) => {
  // Delete from database
  const id = req.params.bookId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors.array());

  // Delete book from server
  try {
    const book = await Book.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });
    if (!book) return res.status(404).send("Book Not Found");
    res.send(book);
  } catch (err) {
    next(err);
  }
};

module.exports.updateBookController = async (req, res, next) => {
  const id = req.params.bookId;
  const bookInputValue = req.body;

  // validation update operation and inputData
  const keysInput = Object.keys(bookInputValue);
  const allowedForUpdates = ["title", "description"];

  // Check if any extra invalid field out of allowedForUpdates is requested or not
  const isAllowed = keysInput.every((update) =>
    allowedForUpdates.includes(update)
  );
  if (!isAllowed) return res.status(400).send("Invalid Update Operation.");

  // Dealing with errors on express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(404).send(errors.array());

  // After passing all errors and validations, executes try/catch
  // Update Book from server
  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: id,
        author: req.user._id,
      },
      bookInputValue,
      {
        // For adding new Book to be updated
        new: true,
        // Active validating rules from Schema model when updating
        // runValidators: ture,
        // context: 'query'
      }
    );
    if (!book) return res.status(404).send("Book Not Found");
    res.send(book);
  } catch (err) {
    next(err);
  }

};
