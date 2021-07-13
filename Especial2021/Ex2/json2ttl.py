import json


#UTILIZAÇÃO: python json2ttl.py > individuals.ttl

with open('mapa-virtual.json',"r", encoding='utf8') as f:
    data = json.load(f)

    d = { " ": "_", "'": " ", "&":"", "(":"", ")":"", ".":"", "\"" : "" }

    def replace_all(text, dic):
        for i, j in dic.items():
            text = text.replace(i, j)
        return text
    alldistritos = []

    for i in data['cidades']:
        if i['distrito'] not in alldistritos: 
            alldistritos.append(i['distrito'])

        print(f'###  http://www.di.uminho.pt/prc2021/Mapa#{i["id"]}')
        print(f'<http://www.di.uminho.pt/prc2021/Mapa#{i["id"]}> rdf:type owl:NamedIndividual ,')
        print(f'            <http://www.di.uminho.pt/prc2021/Mapa#Cidade> ;')
       
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#doDistrito> <http://www.di.uminho.pt/prc2021/Mapa#{replace_all(i["distrito"],d)}> ;')
       
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#nome> "{i["nome"]}" ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#populacao> "{i["população"]}" ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#descricao> "{i["descrição"]}" ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#id> "{i["id"]}" .\n')
    
    for i in data['ligações']:
        print(f'###  http://www.di.uminho.pt/prc2021/Mapa#{i["id"]}')
        print(f'<http://www.di.uminho.pt/prc2021/Mapa#{i["id"]}> rdf:type owl:NamedIndividual ,')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#Ligacao> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#origem> "{i["origem"]}" ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#destino> "{i["destino"]}" ;')

        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#temOrigem> <http://www.di.uminho.pt/prc2021/Mapa#{i["origem"]}> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#temDestino> <http://www.di.uminho.pt/prc2021/Mapa#{i["destino"]}> ;')
       
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#distancia> {i["distância"]} ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#id> "{i["id"]}" .\n')

    for dist in alldistritos:
        print(f'###  http://www.di.uminho.pt/prc2021/Mapa#{replace_all(dist,d)}')
        print(f'<http://www.di.uminho.pt/prc2021/Mapa#{replace_all(dist,d)}> rdf:type owl:NamedIndividual ,')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#Distrito> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/Mapa#nome> "{dist}" .\n')

    
f.close()
