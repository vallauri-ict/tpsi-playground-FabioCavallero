# tpsi-playground-fabio-cavallero

_Stud. Fabio Cavallero_

###### Es.5 Negozio dischi
## Obbiettivo:
Realizzare una applicazione PHP – AJAX per la vendita di dischi online.
- Un tag DIV principale avente id=”table” è gestito tramite la proprietà css **display:grid** per cui dispone automaticamente a griglia tutti gli elementi interni
- I vari campi relativi ai dischi sono realizzati mediante semplici Text Box che ne consentono l’editazione
- I text box della prima colonna (ID) sono di tipo **readonly**
- I tre pulsanti sono realizzati tramite un tag **button class='btn btn-outline-dark' style='margin:3px'**
- I pulsanti SALVA e ANNULLA sono inizialmente disabilitati

## In corrispondenza dell’evento onkeyup su uno qualsiasi dei Text Box di una riga,:
I pulsanti SALVA e ANNULLA della riga vengono automaticamente abilitati. A differenza di onKeyPress, onKeyUp sente anche il backspace.

## Il pulsante Salva:
Tramite una chiamata POST salva su server i tre campi di testo contenenti le informazioni editabili (escluso l’id) e disabilita i pulsanti.

## Il pulsante Annulla:
Ripristina le informazioni originali andando a leggerle sul server e disabilita in pulsanti (viene ricaricata la pagina).

## Il pulsante Elimina:
Tramite una chiamata POST elimina il record dal database e visualizza una informazione del tipo “Record eliminato correttamente”.

## Il pulsante Inserisci:
Apre una nuova pagina **inserisci.html** per l’inserimento di un nuovo record. A fondo pagina un pulsante Salva richiama una procedura java script che controlla che tutti i campi siano
stati compilati e, in caso affermativo, richiama in modalità POST una pagina **inserisci.php** che aggiorna il database e poi esegue esplicitamente un redirect alla pagina principale.
