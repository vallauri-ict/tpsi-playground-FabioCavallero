# tpsi-playground-fabio-cavallero

_Stud. Fabio Cavallero_

## Es.4 Sondaggi
## Obiettivo:
Si vuole realizzare una applicazione web per la gestione di alcuni sondaggi onLine.

## In corrispondenza della richiesta della pagina iniziale index.php:
- Il server si limita ad inviare al client una lista contenente l’elenco dei sondaggi disponibili, letti dal database.
- Il pulsante di submit invia una richiesta POST per la risorsa votazione.php contenente il codice del sondaggio selezionato.

## La pagina votazione.php:
Consente all’utente di esprimere il proprio voto visualizzando:
- Il titolo del sondaggio scelto.
- L’immagine relativa al sondaggio, (proprietà **src** del tag **img**).
- Il testo della domanda.
- 3 option button di scelta della risposta.
- In corrispondenza del submit, invia al server una richiesta GET relativamente alla risorsa risultati.php.

## La pagina risultati.php deve:
- **Registrare** i risultati all’interno del database.
- **Inviare** al client una pagina di conferma che mostri al visitatore i risultati finora ottenuti dal sondaggio scelto, cioè: il numero totale dei votanti, la percentuale dei Si, dei No e dei Non so.
