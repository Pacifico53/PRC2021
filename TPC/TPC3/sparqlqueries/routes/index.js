var express = require('express');
var router = express.Router();

var axios = require('axios');

var prefixes = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX adv: <http://www.di.uminho.pt/prc2021/Charada#>
`

var query = `select * where { ?s rdf:type owl:Class }`


var getLink = "http://localhost:7200/repositories/"


/* GET home page. */
router.get('/', function (req, res) {
  axios.get("http://localhost:7200/rest/repositories/")
    .then(dados => {
      repos = dados.data.map(a => {
        return ({
          id: a.id,
          tit: a.title
        })
      })

      res.render('index', {
        lista: repos
      });
    })
    .catch(erro => console.log(erro))
});

router.get('/rep/:id', function (req, res) {
  var encoded1 = encodeURIComponent(prefixes + query)

  axios.get(getLink + req.params.id + '?query=' + encoded1)
    .then(dados => {
      var classes = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
      console.dir(classes)
      res.render('repositorio', {
        cls: classes,
        rep: req.params.id
      })
    })
    .catch(erro => console.log(erro))
})

module.exports = router;
