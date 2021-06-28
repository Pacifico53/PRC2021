#!/usr/bin/python3
import json
import os
import shutil

#Nao consegui tirar os todos caracteres que nao sao compativeis 
# com a ontologia infelizmente...

with open('filmes.ttl', 'w+', encoding='utf-8') as filmes:

    with open('movies.json', encoding='utf-8') as f:
        data = json.load(f)

    dict_atletas = {}

    lista_atores = []
    lista_genres = []

    for c in data:

        title = c['title'].replace(' ', '_')
        title = title.replace("'",'')
        title = title.replace(',','_')
        title = title.replace('.','_')
        title = title.replace(':','_')
        title = title.replace('&','_')
        title = title.replace('?','_')
        title = title.replace('!','_')
        year = c['year']
        cast = c['cast']
        genres = c['genres']

        current_cast = ''
        current_genres = ''

        for at in cast:
            at = at.replace(' ', '_')
            at = at.replace("'", '')
            at = at.replace(".", '')
            at = at.replace("&", '')
            
            current_cast += at + ','
            if at not in lista_atores:
                lista_atores.append(at)

        if current_cast != '':
            current_cast = current_cast[:-1]

        for ge in genres:
            ge = ge.replace(' ', '_')
            ge = ge.replace("'", '')
            ge = ge.replace(".", '')

            current_genres += ge + ','
            if ge not in lista_genres:
                lista_genres.append(ge)

        if current_genres != '':
            current_genres = current_genres[:-1]


        filmes.write('###  http://www.di.uminho.pt/prc2021/Cinema#' +
                     title + '\n')
        filmes.write(':' + title + ' rdf:type owl:NamedIndividual ,\n')
        filmes.write('            :Filme ;\n')
        filmes.write('   :ano ' + str(year) + ' ;\n')        
        filmes.write(f'   :elenco "' + current_cast + '" ;\n')
        filmes.write(f'   :generos "' + current_genres + '" ;\n')
        filmes.write('   :titulo "' + title + '" .\n\n')        

    for at in lista_atores:
        filmes.write(f'###  http://www.di.uminho.pt/prc2021/Cinema#{at}\n')
        filmes.write(f':{at} rdf:type owl:NamedIndividual ,\n')
        filmes.write('            :Ator .\n\n')

    for ge in lista_genres:
        filmes.write(f'###  http://www.di.uminho.pt/prc2021/Cinema#{ge}\n')
        filmes.write(f':{ge} rdf:type owl:NamedIndividual ,\n')
        filmes.write('            :Genero .\n\n')
