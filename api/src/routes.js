const express = require('express');
const router = express.Router();

const Usuario = require('./controllers/usuarios');

router.get('/logout', Usuario.logout);
router.post('/login', Usuario.login);
router.post('/cadastrar', Usuario.cadastrarUsuario);


module.exports = router;