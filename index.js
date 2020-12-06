const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');
const { connectDB } = require('./db/dbConnection');

// Middleware
app.use(express.json());


// Connecting DB
connectDB()


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



// app.get('/', (req, res) => {
//     res.send('I am from LMS (Library Management System')
// })

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


// app.get('/books', (req, res) => {
//     if (books.length == 0) {
//         return res.send('No book')
//     }
//     res.status(200).send(Books)
// })

// app.get('/books/:bookId', (req, res) => {
//     const id = req.params.bookId;
//     const book = books.find(book => book.id === id)
//     if (book) return res.send(book);
//     res.status(404).send('Books Not Found');
// })

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


app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})



// Server creation
app.listen(5000, () => {
    console.log(`Listening to the port 5000`)
})