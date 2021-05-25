# tpsi-playground-fabio-cavallero

_Stud. Fabio Cavallero_

## Es.3 Registrazione
## Obiettivo:
L'utente deve compilare i campi della form per registrarsi al Vallauri (campi Nome, Residenza e Indirizzo obbligatori).

## Al click del pulsante invia:
- Nel file index.js viene fatto un controllo dei parametri da inviare. Se ci sono errori viene visualizzata in rosso una stringa di errore, altrimenti viene fatto un submit del pulsante. Come **action viene passata la pagina2.php** e come **action la chiamata GET**.

## Nella pagina2 php
- Viene inclusa la libreria **php-mysqli.php**
- Viene fatto il controllo dei parametri ricevuti (tramite il metodo **isset**)
- Avviene la connessione al **db 4b_studenti**
- Successivamente viene eseguita la query **INSERT INTO studenti(nome, settore, hobbies, residenza, segni, media) VALUES ('$nome','$indirizzo','$hobbies',$citta,'$segni','$scoperta')**. In pratica vengono caricati sul database i dati dell'utente registrato
- Infine vengono visualizzati nella stessa pagina i dati ricevuti correttamente.
