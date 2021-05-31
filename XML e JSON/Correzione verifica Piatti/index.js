"use strict"

let intestazioni = ["idMeal", "strMeal", "img", "", ""];
let larghezze = ["50px", "310px", "60px", "40px", "40px"];

window.onload=function()
{
    let _radioWrapper = document.getElementById("radioWrapper");
    let _dettagliWrapper = document.getElementById("dettagliWrapper");
    let _table = document.getElementById("table");
    let categoria = "Breakfast";

    caricaRadioButtons();
    caricaTabella();

    /* *************************************** */

    function caricaRadioButtons(){
        for (const key in categoryList) {        // oggetto principale JSON (inizia con la graffa) e uso  il ciclo for in, enumerativo ([]) uso for of
            let _radioButton = document.createElement("input");
            _radioButton.type = "radio";
            _radioButton.name = "category";
            _radioButton.value = key;
            _radioWrapper.appendChild(_radioButton);
            let _span = document.createElement("span");
            _span.innerHTML = key;
            _radioWrapper.appendChild(_span);
            let _br = document.createElement("br");
            _radioWrapper.appendChild(_br);
            if(key == "Breakfast")
            {
                _radioButton.checked = true;
            }
        _radioButton.addEventListener("click", function(){
            categoria = this.value;
            caricaTabella();
        })
        }
    }

    function caricaTabella(){
        _table.innerHTML="";
        let _td;
        caricaIntestazioni();
        
            for (const item of categoryList[categoria]) {
                let _tr = document.createElement("tr");
                _table.appendChild(_tr);
                
                // idMeal
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.idMeal;

                // strMeal
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.strMeal;

                // img
                _td = document.createElement("td");
                _tr.appendChild(_td);
                let _img = document.createElement("img");
                _td.appendChild(_img);
                _img.src = item.strMealThumb;
                _img.id = item.idMeal;
                _img.addEventListener("click",visualizzaVideo);
                _img.style.width = "55px";

                // cerca
                _td = document.createElement("td");
                _tr.appendChild(_td);
                 _img = document.createElement("img");
                _td.appendChild(_img);
                _img.src = "img/lente.jpg";
                _img.addEventListener("click",visualizzaDettagli);
                _img.id = item.idMeal;
                _img.style.width = "30px";

                // elimina
                _td = document.createElement("td");
                _tr.appendChild(_td);
                 _img = document.createElement("img");
                _td.appendChild(_img);
                _img.idMeal = item.idMeal;
                _img.addEventListener("click",cancella);
                _img.src = "img/delete.png";
                _img.style.width = "30px";
            }
        
    }

    function visualizzaVideo(){
         for (const item of details["meals"]) {
            let meal = item["meals"][0];
            if(meal["idMeal"] == this.id)
            {
                window.open(meal.strYoutube);
                break;
            }
        }
    }

    function visualizzaDettagli(){
        _dettagliWrapper.innerHTML = "";
        for (const item of details["meals"]) {
            let meal = item["meals"][0];
            if(item["meals"][0]["idMeal"] == this.id)
            {
                let s = " <b> " +  meal.strMeal + " </b>"
                s += meal.strInstructions;
                _dettagliWrapper.innerHTML = s;
                break;
            }
        }
    }

    function caricaIntestazioni(){
        let _tr = document.createElement("tr");
	    _table.appendChild(_tr);
		for (let i = 0; i < intestazioni.length; i++) {
			let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _th.style.width = larghezze[i];
			_tr.appendChild(_th);
		}
    }

    function cancella(){
        for (let i = 0; i < categoryList[categoria].length; i++) {
            let item = categoryList[categoria][i];
            if(item.idMeal == this.idMeal)
            {
                categoryList[categoria].splice(i,1);
                break;
            }
        }
        caricaTabella();
    }
	
}