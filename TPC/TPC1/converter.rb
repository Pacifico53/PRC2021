require "json"

file = File.read("./db.json")
data_hash = JSON.parse(file)

out_file = File.new("db.ttl", "w")


data_hash["alunos"].each do |n|
    out_file.puts("### http://prc.di.uminho.pt/2021/uc#" + n["_id"])
    out_file.puts(":" + n["_id"] + " rdf:type owl:NamedIndividual ,")
    out_file.puts("\t\t\t\t:Aluno ;")
    out_file.puts("\t\t:frequenta :" + n["frequenta"] + " ;")
    out_file.puts("\t\t:nome :\"" + n["nome"] + "\" .")
    out_file.puts("\n")
end

data_hash["docentes"].each do |n|
    out_file.puts("### http://prc.di.uminho.pt/2021/uc#" + n["id"])
    out_file.puts(":" + n["id"] + " rdf:type owl:NamedIndividual ,")
    out_file.puts("\t\t\t\t:Professor ;")
    out_file.puts("\t\t:ensina :" + n["ensina"] + " ;")
    out_file.puts("\t\t:nome :\"" + n["nome"] + "\" .")
    out_file.puts("\n")
end

data_hash["uc"].each do |n|
    out_file.puts("### http://prc.di.uminho.pt/2021/uc#" + n["id"])
    out_file.puts(":" + n["id"] + " rdf:type owl:NamedIndividual ,")
    out_file.puts("\t\t\t\t:UnidadeCurricular ;")
    out_file.puts("\t\t:anoLetivo :\"" + n["anoLetivo"] + "\" ;")
    out_file.puts("\t\t:designação :\"" + n["designação"] + "\" .")
    out_file.puts("\n")
end

out_file.close
