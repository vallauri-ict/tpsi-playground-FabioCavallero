"use strict";

$(document).ready(function(){
    let wrapper = $("#wrapper");

    $("#btnVisualizza").on("click",function(){
        let address = $("#txtIndirizzo").val();
        if(address=="")
            alert("Inserisci un indirizzo");
        else
        {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode( {'address': address}, 
            function(results, status) 
            {
                if (status == google.maps.GeocoderStatus.OK)
                    disegnaMappa(results[0]);
                else 
                    alert("Stringa immessa non valida");
            });
        }
    })

    function disegnaMappa(geocoderResult){
        let mapOption = {
            "center" : geocoderResult.geometry.location,
            "zoom" : 17
        }
        let mappa = new google.maps.Map(wrapper[0],mapOption); // wrapper è una collezione di puntatori quindi si prende [0]
        let marcatore = new google.maps.Marker({
            "map" : mappa,
            "position" : geocoderResult.geometry.location,
            "title" : "IIS G. Vallauri"
        })
        let infoWindow = new google.maps.InfoWindow({
            "content" : "Vallauri"
        })
        marcatore.addListener("click",function(){
            infoWindow.open(mappa,marcatore);
        })
    }
})

