import requests
import urllib.parse

query = '''
PREFIX : <http://prc.di.uminho.pt/2021/myfamily#>
    CONSTRUCT {
        ?a :Trisavo ?b .
    } 
    WHERE {
        ?a :ePaide ?p1 .
        ?p1 :eProgenitorDe ?p2 .
        ?p2 :eProgenitorDe ?p3 .
        ?p3 :eProgenitorDe ?b .
    }
'''

q = urllib.parse.quote_plus(query)

linkQuery = "http://localhost:7200/repositories/familyJCR?query=" + q

p = {'Content-type': 'application/x-binary-rdf-results-table'}

result = requests.get(linkQuery, p)
result.raise_for_status()

print(result.json())

if result.data:
    insert = "http://localhost:7200/familyJCR/statements?query=INSERT%20DATA%20{" + result.data + "}"
    requests.post(insert)
