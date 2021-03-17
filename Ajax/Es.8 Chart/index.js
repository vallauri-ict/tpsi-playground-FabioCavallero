"use strict";
window.onload=function(){
    let wr = $("#wrapper");
    let chart;
    let _btnInvia = $("#btnInvia");
    let _tbody = $("tbody");
    let _canvas = $("canvas")[0]; // questo e quello sotto sono equivalenti
    //let _canvas = document.getElementsByTagName("canvas")[0];
    _btnInvia.on("click", function(){
        // i parametri gert si possono passare in 3 modi
        // 1) "/?results=100";
        // 2) con un json ("/", {"results":"100"});
        // 3) passiamo un urlEncoded "/", "results=100"
        let request = inviaRichiesta("get", "/", {"results":"100"});
        request.fail(errore);
        request.done(function(persone){
            //console.log(data);
            _tbody.empty();
            _canvas = $("canvas")[0]; 
            let nations = {}; 
            for (const persona of persone.results) {
                if(persona.location.country in nations) // IMPORTANTE
                nations[persona.location.country]++;
                else 
                nations[persona.location.country] = 1;
            }
            console.log(nations);

            for (const key in nations) {
                let tr = $("<tr>");
                tr.appendTo(_tbody);

                let td = $("<td>");
                td.appendTo(tr);
                td.text(key);

                td = $("<td>");
                td.appendTo(tr);
                td.text(nations[key]);
            }

            let values = [];
            let colors = []
            
            for (const key in nations) {
                values.push(nations[key]);
                let r = generaNumero(0, 255);
                let g = generaNumero(0, 255);
                let b = generaNumero(0, 255);
                colors.push(`rgb(${r}, ${g}, ${b})`);
            }
            
            if(chart != undefined)
                chart.destroy();

            chart = new Chart(_canvas, // ASINCRONO
            { 
                type: 'bar', 
                data: 
                { 
                    // si aspetta un enumerativo
                    "labels": Object.keys(nations), // IMPORTANTE
                    "datasets": [{ 
                        "label": 'Grafico delle nazioni', 
                        // si aspetta un enumerativo
                        "data": values, 
                        "backgroundColor": colors, 
                        "borderColor": "#000", 
                        "borderWidth": 1  // default=2   
                        }] 
                } 
            }); 
        })
    })
    let a = $("<a>");
    a.appendTo(wr);
    a.prop("href", "#");
    a.css({"float" : "right"})
    a.text("Salva immagine");
    a.prop("download", "New file.png") // deve essere valorizzata
    // l'impostazione dell'attributo href deve essere
    // eseguita depo che i canvas venga generato
    a.on("click",function(){
        a.prop("href", _canvas.toDataURL("chart/png"));
    })
}