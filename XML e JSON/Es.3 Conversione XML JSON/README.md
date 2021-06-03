# info-playground-fabio-cavallero

_Stud. Fabio Cavallero_

### Conversione XML-JSON
E' stata realizzata una applicazione web che legga il file bookstore_xml memorizzato all’interno del localStorage (ese 01), e lo converta in un vettore enumerativo 
di jSon contenente per ogni record i 6 campi dell’esercizio 1 (categoria, titolo, linguaggio, autori, anno, prezzo).
Il campo autori sarà un vettore enumerativo contenente una entry per ogni autore presente nell’XML.
L’intero vettore principale è stato quindi serializzato e salvato all’interno della localStorage come backstore_json. Sono stati contemplati sia i TAG sia gli ATTRIBUTI
di ogni libro.
