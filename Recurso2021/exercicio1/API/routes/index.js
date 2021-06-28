var express = require('express');
var router = express.Router();

var axios = require('axios')

const prefixes = ` PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX : <http://www.di.uminho.pt/prc2021/Cinema#>
`
const linkQuery = "http://localhost:7200/repositories/Cinema?query=";


router.get('/filmes', function (req, res, next) {
  if (!req.query.ano) {
    var query = `
    SELECT ?s ?id ?titulo ?ano WHERE {
        ?s a :Filme .
        ?s :titulo ?titulo .
        ?a :ano ?ano .
    }
    `;
    var encoded = encodeURIComponent(prefixes + query);

    axios.get(linkQuery + encoded).then(dados => {
      res.status(200).jsonp(dados);
    }).catch(err => {
      res.status(500).jsonp(err);
    });
  }
  else if(req.query.ano){
    var query = `
    SELECT ?s ?id ?titulo ?ano WHERE {
        ?s a :Filme .
        ?s :titulo ?titulo .
        ?a :ano ?ano .
        FILTER (?ano = ${req.query.ano})
    `;
    var encoded = encodeURIComponent(prefixes + query);

    axios.get(linkQuery + encoded).then(dados => {
      res.status(200).jsonp(dados);
    }).catch(err => {
      res.status(500).jsonp(err);
    });
  }
  else if(req.query.gen){
    var query = `
    SELECT ?s ?id ?titulo ?ano ?genero WHERE {
        ?s a :Filme .
        ?s :titulo ?titulo .
        ?a :ano ?ano .
        ?a :genero ?genero
        FILTER (?genero = ${req.query.gen})
    `;
    var encoded = encodeURIComponent(prefixes + query);

    axios.get(linkQuery + encoded).then(dados => {
      res.status(200).jsonp(dados);
    }).catch(err => {
      res.status(500).jsonp(err);
    });
  }

});

router.get('/filmes/:id', function (req, res, next) {
  id = req.params.id
  var query = `
      SELECT * {
          :${id} a :Filme .
      }
      `;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(linkQuery + encoded).then(dados => {
    res.status(200).jsonp(dados);
  }).catch(err => {
    res.status(500).jsonp(err);
  });
});

router.get('/atores', function (req, res, next) {
  var query = `
  SELECT DISTINCT ?s WHERE {
      ?s a :Ator .
  } ORDER BY ?nome
  `;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(linkQuery + encoded).then(dados => {
    res.status(200).jsonp(dados);
  }).catch(err => {
    res.status(500).jsonp(err);
  });
});

router.get('/atores/:id', function (req, res, next) {
  id = req.params.id
  var query = `
      SELECT ?e ?titulo ?ano {
          :${id} a :Ator .
          ?e a :Filme .
          ?e :titulo ?titulo .
          ?a :ano ?ano .
      }
      `;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(linkQuery + encoded).then(dados => {
    res.status(200).jsonp(dados);
  }).catch(err => {
    res.status(500).jsonp(err);
  });
});

router.get('/generos', function (req, res, next) {
  var query = `
  SELECT DISTINCT ?s WHERE {
      ?s a :Genero .
  } ORDER BY ?nome
  `;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(linkQuery + encoded).then(dados => {
    res.status(200).jsonp(dados);
  }).catch(err => {
    res.status(500).jsonp(err);
  });
});




module.exports = router;
