const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');
const { connectDB } = require('./db/dbConnection');
const { error } = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Port
const PORT = process.env.PORT || 5000;

// Config
require('dotenv').config({
    path: './config/keys.env'
})

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(cors());

// Connecting DB
connectDB();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "LMS",
            description: "Library Management System API Endpoints",
            contact: {
                name: "Mostafa Al Mahmud"
            },
            servers: ['http://localhost:5000'],
            version: '1.0.0'  
        }
    },
    apis: ['index.js']
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Import Routes
const indexRoute = require('./routes');
const booksRoute = require('./routes/books');
const usersRoute = require('./routes/users');


// Handling Routes
app.use('/books', booksRoute);
app.use('/users', usersRoute);
app.use('/', indexRoute);
app.use(error);

/**
 * @swagger
 * /books:
 *  get:
 *    description: Get all books
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/books', (req, res) => {
    res.send('successfully books found')
})

/**
 * @swagger
 * /books:
 *   post:
 *     description: Get all books
 *     parameters:
 *      - name: title
 *        description: title of the book
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
app.post('/books', (req, res) => {
    console.log(req.body);
    
})

// Server creation
app.listen(PORT, () => {
    console.log(`Listening on the ${PORT}`);
})