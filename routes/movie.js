const movies = require('express').Router();
const { postCard, getCards, deleteCard } = require('../controllers/movies');
const { validateCard, validateIds } = require('../middlewares/validate');

movies.get('/movies', getCards);
movies.post('/movies', validateCard, postCard);
movies.delete('/movies/:id', validateIds, deleteCard);

module.exports = movies;
