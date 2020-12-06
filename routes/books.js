const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Contorllers
const {
  getBooksController,
  getBookController,
  addBookController,
  updateBookController,
  deleteBookController,
} = require("../controllers/bookControllers");

// Middleware
const { auth } = require("../middleware/auth");

// GET all books
router.get("/", getBooksController);

// GET single Book
router.get(
  "/:bookId",
  check("bookId", "Book Not Found").isMongoId(),
  getBookController
);

// Add Book
router.post(
  "/",
  [
    auth,
    check("title", "Title is required").notEmpty(),
    check("description", "Description is required").notEmpty(),

    // For multiple validation rules
    // check('description')
    //     .notEmpty()
    //     .withMessage('Description is required')
    //     .isLength({ min: 10, max: 100 })
    //     .withMessage('Description be in 10 to 100 characters')
  ],
  addBookController
);

// Update book
router.put(
  "/:bookId",
  [
    auth,
    check("bookId", "Book Not Found").isMongoId(),
    check("title", "Title is required").optional().notEmpty(),
    check("description", "Description is required").optional().notEmpty(),
  ],
  updateBookController
);

// Delete books
router.delete(
  "/:bookId",
  [auth, check("bookId", "Book Not Found").isMongoId()],
  deleteBookController
);

module.exports = router;
