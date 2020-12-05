const express = require('express');
const app = express();

const books = [
    {
        id: 1,
        name: "abc",
        author: "xyz"
    },
    {
        id: 1,
        name: "abc",
        author: "xyz"
    }
    
]


app.get('/', (req, res) => {
    res.send('I am from LMS (Library Management System')
})

app.get('/books', (req, res) => {
    if (books.length == 0) {
        return res.send('No book')
    }
    res.status(200).send(Books)
})

app.get('/books/:bookId', (req, res) => {
    const id = req.params.bookId;
    const book = books.find(book => book.id === id)
    if (book) return res.send(book);
    res.status(404).send('Books Not Found');
})




app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})



// Server creation
app.listen(5000, () => {
    console.log(`Listening to the port 5000`)
})