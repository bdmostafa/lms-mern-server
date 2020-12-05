const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('I am from LMS (Library Management System')
})





// Server creation
app.listen(5000, () => {
    console.log(`Listening to the port 5000`)
})