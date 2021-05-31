"use strict" //Ti impone a dichiarare le variabile
$(document).ready(function(){
    $("#btnInvia").on("click",function(){
        let anno = $("#txtAnno");
        let titolo = $("#txtTitolo");
        let autore = $("#txtInterprete");
        if(titolo.val()!= "" && autore.val()!="" && anno.val()!="") //.val()-> prende il valore dall'input
        {
            let param  = { //Param è un oggetto
                "titolo" : titolo.val(),
                "autore" : autore.val(),
                "anno" : anno.val()
            }
            let request = inviaRichiesta("post", "servizi/inserisci.php",param);
            request.fail(errore);
            request.done(function(data){
                console.log(data);
                alert("record inserito correttamente");
                window.location.href = "index.html";
            })
        }
    })
})