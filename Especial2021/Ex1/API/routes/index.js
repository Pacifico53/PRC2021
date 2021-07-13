var express = require('express');
var router = express.Router();
var Avaliacao = require('../controllers/avaliacao')

router.get('/api/alunos', function(req, res, next) {
  Avaliacao.getLista()
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});

router.get('/api/alunos/:id', function(req, res, next) {
  Avaliacao.getLista()
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});

router.get('/api/alunos', function(req, res, next) {
  Avaliacao.getAlunosCurso(req.query.curso)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});



module.exports = router;
