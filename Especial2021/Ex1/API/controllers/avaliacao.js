var Avaliacao = module.exports
const axios = require('axios')

function normalizeResult(r) {
  return r.results.bindings.map(o => {
    var result = {}
    for (let [k, v] of Object.entries(o)) {
      result[k] = v.value
    }
    return result;
  })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX f: <http://www.di.uminho.pt/prc2021/Avaliacao#>
`

var getLink = "http://localhost:7200/repositories/Alunos" + "?query="


Avaliacao.getLista = async function () {
  var query = `SELECT ?id ?nome ?curso WHERE { 
        ?id a f:Aluno .
        ?id f:curso ?curso .
        ?id f:nome ?nome .
    }
    group by ?id ?nome ?curso
    order by ?nome
     `
  var encoded = encodeURIComponent(prefixes + query)

  try {
    var response = await axios.get(getLink + encoded)
    return normalizeResult(response.data)
  }
  catch (e) {
    throw (e)
  }
}

Avaliacao.getAlunosCurso = async function (curso) {
  var query = `SELECT ?id ?nome ?curso WHERE { 
      ?aluno a f:Aluno .
      ?aluno f:idAluno ?id .
      ?aluno f:nome ?nome .
      ?aluno f:curso ?curso .
      ?aluno f:curso '${curso}'.
  }
  order by ?nome
     `
  var encoded = encodeURIComponent(prefixes + query)

  try {
    var response = await axios.get(getLink + encoded)
    return normalizeResult(response.data)
  }
  catch (e) {
    throw (e)
  }
}


Avaliacao.getAlunosTPC = async function () {
  var query = `SELECT ?id ?nome ?curso WHERE { 
        ?id a f:Aluno .
        ?id f:curso ?curso .
        ?id f:nome ?nome .
    }
    group by ?id ?nome ?curso
    order by ?nome
     `
  var encoded = encodeURIComponent(prefixes + query)

  try {
    var response = await axios.get(getLink + encoded)
    return normalizeResult(response.data)
  }
  catch (e) {
    throw (e)
  }
}

Avaliacao.getAluno = async function (id) {
  var query = `SELECT ?id ?nome ?curso ?exame ?tpc WHERE { 
    ?aluno a f:Aluno .
    ?aluno f:idAluno ${id} .
    ?aluno f:nome ?nome .
    ?aluno f:curso ?curso .
    ?aluno f:fezExame ?exame .
    ?aluno f:fezTPC ?tpc .
  }
`
  var encoded = encodeURIComponent(prefixes + query)

  try {
    var response = await axios.get(getLink + encoded)
    return myNormalize(response.data)
  }
  catch (e) {
    throw (e)
  }
}

