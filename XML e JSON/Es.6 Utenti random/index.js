"use strict"


window.onload=function(){
    let _lstNazioni = document.getElementById("lstNazioni");
    let _table = document.getElementById("table");
    let _thead = document.getElementById("thead");
    let _tbody = document.getElementById("tbody");
    let _divDettagli = document.getElementById("dettagli");
    let intestazioni = ["name", "username","state","nat", "img"];
    let vetNazionalità = json;
    let nazionalità = [];
    let vetEliminati=new Array();

    caricaNazionalità();
    //creaIntestazioni();
    caricaTabella();

    _lstNazioni.addEventListener("change", caricaTabella);

    /* *************************************************** */

    function caricaNazionalità(){
        _lstNazioni.value = "";
        let j=0;
       _lstNazioni.value = "tutti";
        vetNazionalità = json.results;
         for (let i=0;i<vetNazionalità.length;i++) {
             if(!nazionalità.includes(vetNazionalità[i].nat))
             {
                let _option = document.createElement("option");
                _option.text = (vetNazionalità[i].nat);
                _lstNazioni.appendChild(_option);
                nazionalità[j++] = vetNazionalità[i].nat;
             }
         }
    }

    function creaIntestazioni(){
        _thead.innerHTML = "";
        //let _tr = document.createElement("tr");
        _table.appendChild(_thead);
        //_thead.appendChild(_tr);
		for (let i = 0; i < intestazioni.length; i++) {
			let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
			_thead.appendChild(_th);
		}
    }

    function caricaTabella(){
        _divDettagli.innerHTML = "";
        let _td;
        _tbody.innerHTML = "";
        _table.innerHTML="";
        creaIntestazioni();
        
            for (const item of vetNazionalità) {
                if(((_lstNazioni.value == "tutti") || (_lstNazioni.value == item.nat)) && (!(vetEliminati.includes(item.login.username))))
                {   
                let _tr = document.createElement("tr");
                _table.appendChild(_tbody);
                
                // cognome - nome
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.name.first + " " + item.name.last;

                //username
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.login.username;

                // state
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.location.state;

                // nat
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.nat;

                // img
                _td = document.createElement("td");
                _tr.appendChild(_td);
                let _img = document.createElement("img");
                _td.appendChild(_img);
                _img.src = item.picture.thumbnail;
                _img.style.width = "50px";
                _img.style.height = "50px";
                _img.id = item.name.first
                _img.addEventListener("click", visualizzaDettagli)

                _tbody.appendChild(_tr);
                _divDettagli.innerHTML = "";
            }
        }
       
    }

    function visualizzaDettagli(){
        _divDettagli.innerHTML="";
        for (let i =0; i< vetNazionalità.length;i++) {
            let item = vetNazionalità[i];
            if((item.name.first) == this.id)
            {
               // img
                let _img = document.createElement("img");
                _divDettagli.appendChild(_img);
                _divDettagli.style.lineHeight = "0px";
               // _img.style.width = "140px";
                _img.src = item.picture.large;

                // name 
                let _p = document.createElement("p");
                _p.innerHTML = item.name.first + " " + item.name.last;
                _divDettagli.appendChild(_p);

                // mail
                 _p = document.createElement("p");
                _p.innerHTML = item.email;
                _divDettagli.appendChild(_p);

                // phone
                _p = document.createElement("p");
                _p.innerHTML = item.phone;
                _divDettagli.appendChild(_p);

                // cell
                _p = document.createElement("p");
                _p.innerHTML = item.cell;
                _divDettagli.appendChild(_p);

                // button
                let _button = document.createElement("button");
                _divDettagli.appendChild(_button);
                _button.innerHTML = "elimina";
                _button.id = i;
                _button.addEventListener("click",eliminaRecord);
                 
                break;
            }
        }
    }

    function eliminaRecord(){
        _divDettagli.innerHTML="";
        let pos = this.id;
        json.results.splice(pos,1);
        caricaTabella();
        _divDettagli.innerHTML="";
        caricaNazionalità();
    }


}