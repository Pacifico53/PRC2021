import csv

with open('jcr-family.csv') as csvfile:
    data = list(csv.reader(csvfile))[1:]

for ind in data:
    print('###  http://www.di.uminho.pt/prc2021/myFamily#' + ind[0].replace(' ', '_'))
    print(f"{ind[0].replace(' ', '_')} rdf:type owl:NamedIndividual ;")
    print(f"\t\t:temMae :{ind[2].replace(' ', '_')} ;")
    print(f"\t\t:temPai :{ind[1].replace(' ', '_')} .")
