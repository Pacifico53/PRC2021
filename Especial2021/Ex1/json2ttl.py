import json


#UTILIZAÇÃO: python json2ttl.py > individuals.ttl

with open('aval-alunos.json',"r", encoding='utf8') as f:
    data = json.load(f)

    for i in data['alunos']:
        for tpc in i["tpc"]:
            nometpc = tpc["tp"] + '_' + i['idAluno']

            print(f'###  http://www.di.uminho.pt/prc2021/Avaliacao#{nometpc}')
            print(f'<http://www.di.uminho.pt/prc2021/Avaliacao#{nometpc}> rdf:type owl:NamedIndividual ,')
            print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#TPC> ;')
            print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#tpcNum> "{tpc["tp"]}" ;')
            print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#nota> {tpc["nota"]} .\n')

        for ex in i["exames"].items():
            nomeexame = ex[0] + '_' + i['idAluno']
            print(f'###  http://www.di.uminho.pt/prc2021/Avaliacao#{nomeexame}')
            print(f'<http://www.di.uminho.pt/prc2021/Avaliacao#{nomeexame}> rdf:type owl:NamedIndividual ,')
            print(f'            <http://www.di.uminho.pt/prc2021/Avaliacao#Exame> ;')
            print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#tipoExame> "{ex[0]}" ;')
            print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#nota> {ex[1]} .\n')

        nomeprojeto = 'PROJ_' + i['idAluno'] 
        print(f'###  http://www.di.uminho.pt/prc2021/Avaliacao#{nomeprojeto}')
        print(f'<http://www.di.uminho.pt/prc2021/Avaliacao#{nomeprojeto}> rdf:type owl:NamedIndividual ,')
        print(f'            <http://www.di.uminho.pt/prc2021/Avaliacao#Projeto> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#nota> {i["projeto"]} .\n')

        print(f'###  http://www.di.uminho.pt/prc2021/Avaliacao#{i["idAluno"]}')
        print(f'<http://www.di.uminho.pt/prc2021/Avaliacao#{i["idAluno"]}> rdf:type owl:NamedIndividual ,')
        print(f'            <http://www.di.uminho.pt/prc2021/Avaliacao#Aluno> ;')
        for tpc in i["tpc"]:
            nometpc = tpc["tp"] + '_' + i['idAluno']
            print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#fezTPC> <http://www.di.uminho.pt/prc2021/Avaliacao#{nometpc}> ;')
        for ex in i["exames"].items():
            nomeexame = ex[0] + '_' + i['idAluno']
            print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#fezExame> <http://www.di.uminho.pt/prc2021/Avaliacao#{nomeexame}> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#fezProjeto> <http://www.di.uminho.pt/prc2021/Avaliacao#{nomeprojeto}> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#nome> "{i["nome"]}" ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#curso> "{i["curso"]}" ;\n')
        print(f'        <http://www.di.uminho.pt/prc2021/Avaliacao#idAluno> "{i["idAluno"]}" .\n')
     
    
f.close()
