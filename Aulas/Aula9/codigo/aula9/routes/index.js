const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
var gdb = require('../utils/graphdb')

/* GET home page. */
router.get('/cidades', async function (req, res) {
  var myQuery = `select ?s ?n ?d where{
    ?s a :Cidade;
         :nome ?n ;
         :distrito ?d ;.
  }
  order by ?n`
  
  var result = await gdb.execQuery(myQuery);
  var dados = result.results.bindings.map(c => {
    return {
      id: c.s.value.split("#")[1],
      nome: c.n.value,
      distrito: c.d.value
    }
  })
  res.jsonp(dados)
});

router.get('/cidades/:id', async function (req, res, next) {
  var myQuery = `select ?n ?d ?p ?desc where{
    :${req.params.id} a :Cidade;
         :nome ?n ;
         :distrito ?d ;
         :população ?p;
         :descrição ?desc
  }`
  var result = await gdb.execQuery(myQuery);

  res.jsonp(result)
});

router.post('/cidades/', async function (req, res, next) {
  var myQuery = `insert data {
    :nome "${req.body.nome}" ;
    :distrito "${req.body.distrito}" ;
    :população "${req.body.população}" ;
    :descrição "${req.body.descrição}" .
  }`

  var result = await gdb.execQuery(myQuery);
  res.jsonp("Triplos inseridos: " + result)
});

router.delete('/cidades/:id', async function (req, res) {
  var cidade = await axios.get('http://localhost:13000/cidades/' + req.params.id)
  var myQuery = `delete data{
    :nome "${cidade.nome}" ;
    :distrito "${cidade.distrito}" ;
    :população "${cidade.população}" ;
    :descrição "${cidade.descrição}" .
  }`

  var result = await gdb.execTransaction(myQuery)
  res.jsonp("Dados apagados: " + result)
})


router.post('/cidades', function (req, res, next) {
  res.jsonp("Dados")
});

router.delete('/cidades/:id', function (req, res, next) {
  res.jsonp("Dados")
});


module.exports = router;
