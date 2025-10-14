const express = require('express');
const router = express.Router();

const Usuario = require('./controllers/usuarios');
const Tarefa = require('./controllers/tarefa');
const Turma = require('./controllers/turma')

router.get('/logout', Usuario.logout);
router.post('/login', Usuario.login);
router.post('/cadastrar', Usuario.cadastrarUsuario);

router.post('/tarefa', Tarefa.create);
router.get('/tarefa', Tarefa.read);
router.delete('/tarefa', Tarefa.remove);

router.post('/turma', Turma.createTurma);
router.get('/turma', Turma.read);
router.delete('/turma', Turma.remove);


module.exports = router;