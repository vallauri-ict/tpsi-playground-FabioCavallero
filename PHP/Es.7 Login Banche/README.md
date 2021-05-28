# tpsi-playground-fabio-cavallero

_Stud. Fabio Cavallero_

###### Es.7 Login banche
## Obiettivo:
Realizzare una pagina **login.php** in cui un correntista inserisce il proprio nome e password.

- In corrispondenza dell'invia, la pagina richiama in modalità **post** un servizio login.php che provvede a validare username e password. La password sono salvate nel database in **formato md5**, ed il contenuto è password per tutti. In caso di credenziali corrette l'applicazione salva l'ID utente in una variabile session ed esegue il redirect verso la pagina **index.html**
- La pagina index.html, richiama un apposito servizio **elencoFiliali** che deve preventivamente verificare la **validità della Sessione**.
- In caso di sessione non valida restituisce uno status **code 403 (forbidden)** in corrispondenza del quale la pagina index.html esegue un redirect verso la pagina di login
- In caso di sessione valida restituisce il nome di tutte le filiali in cui quel correntista ha in deposito un conto corrente (realizzabile passando attraverso la tabella conti), più il nome del correntista, utilizzando ad esempio il seguente json: { name: "Rossi", data: [{cFiliale: "1", Nome: "Sanpaolo Centallo"}, {cFiliale: "9", Nome: "Unicredit Savigliano"}] }. La pagina visualizza nella sezione del titolo il nome del correntista e nella sezione inferiore un option button per ogni nome di filiale ricevuto
- In corrispondenza della scelta di una filiale e del click sul relativo pulsante, richiamare un apposito servizio **elencoMovimenti** e visualizzare all'interno di un DataTable tutti i movimenti eseguiti da quel correntista sul conto appartenente alla filiale selezionata. Ogni correntista dispone di un solo conto per ciascuna filiale. Anche questo servizio deve eseguire un controllo sulla sessione, operando in modo analogo a quello del punto precedente
- Un apposito pulsante di **logout** presente nella pagina consente la chiusura della sessione rimandando automaticamente alla pagina di login
