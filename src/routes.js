const routes = require('express').Router();
const multer = require('multer');

const multerConfig = require('./config/multer');

const SongController = require('./controllers/SongController');
const SearchController = require('./controllers/SearchController');
const AuthController = require('./controllers/AuthController');

const SignUpValidation = require('./validations/SignUpValidation');
const LoginValidation = require('./validations/LoginValidation');

const authMiddleware = require('./middlewares/auth');

routes.post('/register', SignUpValidation, AuthController.create);
routes.post('/login', LoginValidation, AuthController.login);

routes.get('/songs', SongController.index);
routes.get('/songs/:id', SongController.get);
routes.delete('/songs/:id', SongController.delete);

routes.post(
    '/songs',
    authMiddleware,
    multer(multerConfig).single('file'),
    SongController.create
);

routes.get('/search', SearchController.search);

module.exports = routes;
