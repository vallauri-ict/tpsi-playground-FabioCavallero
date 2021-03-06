"use strict"
$(document).ready(function(){
    let table = $("#table>div");//Riferimento al div che ha id table
    // nell'url la risorsa non deve cominciare con "/"
    // perchè altrimenti va a cercare il file come risorsa
    // assoluta !!!
    let request = inviaRichiesta("GET", "servizi/elencoDischi.php");
    request.fail(errore);
    request.done(function(data){
        console.log(data);
        // qui data arriva come oggetto perchè nella richiesta abbiamo
        // fatto dataType json, che parsifica i dati che ci arrivano
        // trasformandoli in object
        for (const item of data) { //Per ogni item di data(vettore di oggetti)
            // let div = $("<div>");
            // div.appendTo(table);
            let txt = $("<input type='text'>");
            txt.val(item.id);//Prende il campo id dell'oggetto item
            txt.prop("readonly",true);
            txt.appendTo(table);//Lo copia dentro la tabella

            txt = $("<input type='text'>");
            txt.val(item.autore);
            txt.appendTo(table);

            txt = $("<input type='text'>");
            txt.val(item.titolo);
            txt.appendTo(table);

            txt = $("<input type='text'>");
            txt.val(item.anno);
            txt.appendTo(table);

            let button = $("<button class='btn btn-outline-dark'>");
            button.html("Salva");//Cosa si vede scritto nel bottone
            button.appendTo(table);
            button.prop("disabled", true);
            button.prop("id",item.id);//Aggiungo al pulsante l'attributo id a cui assegno il valore dell'item del campo dell'oggetto id
            button.on("click", salva);

            button = $("<button class='btn btn-outline-dark'>");
            button.html("Annulla");
            button.appendTo(table);
            button.prop("disabled", true);
            button.prop("disco",item);//?
            button.on("click", annulla);

            button = $("<button class='btn btn-outline-dark'>");
            button.html("Elimina");
            button.appendTo(table);
            button.prop("id", item.id);
            button.on("click", elimina);
        }
        table.on("input","input",function(){//Richiamata solo quando i seguenti input vengono modificati
            let salva = $(this).nextAll("button").eq(0);//Prende il primo bottone della riga toccata
            salva.prop("disabled",false);
            let annulla = $(this).nextAll("button").eq(1);//Prende il secondo bottone della riga toccata
            annulla.prop("disabled",false);
        })
    });
    function elimina(){
        let param = {
            "id" : $(this).prop("id"),//Prende la proprietà id con il suo valore
        }
        let request = inviaRichiesta("post", "servizi/elimina.php", param);
        request.fail(errore);
        request.done(function(data){
            console.log(data);
            alert("dati eliminati correttamente");
            window.location.reload();
        });
    }
    function annulla(){
        window.location.reload();
    }
    function salva(){
        let param = {
            "id" : $(this).prop("id"),
            "autore" : $(this).prevAll("input").eq(2).val(),//Prende il valore che contiene l'input in questione
            "titolo" : $(this).prevAll("input").eq(1).val(),//da 2 a 0 e non da 0 a 2 perchè torna indietro
            "anno" : $(this).prevAll("input").eq(0).val()
        };
        let request = inviaRichiesta("post", "servizi/salva.php", param);
        request.fail(errore);
        request.done(function(data){
            console.log(data);
            alert("dati salvati correttamente");
            window.location.reload();
        });
    }
});