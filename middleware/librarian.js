const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.librarian = async (req, res, next) => {
    if(!req.user.isLibrarian) return res.status(403).send('You are not allowed to access');
    next();
}