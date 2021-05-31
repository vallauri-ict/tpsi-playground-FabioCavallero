"use strict"

window.onload = function(){
    let _table = document.getElementById("table");
    let _lstIngredienti = document.getElementById("lstIngredienti");
    let intestazioni = ["","id","name","alcoholic","main ingredient", ""];
    let larghezze = [40,40,60,70,70,40];
    let _optTutti = document.getElementById("optTutti");
    let _optAlcolici = document.getElementById("optAlcoholic");
    let _optNonAlcolici = document.getElementById("optNonAlcoholic");

    _optTutti.addEventListener("click",caricaTabellaCocktails);
    _optAlcolici.addEventListener("click",caricaTabellaCocktails);
    _optNonAlcolici.addEventListener("click",caricaTabellaCocktails);
    _lstIngredienti.addEventListener("change",caricaTabellaCocktails);

    caricaListaIngredienti();
    caricaTabellaCocktails();

    /* ************************************************************************ */
    function creaIntestazioni(){
        let _tr = document.createElement("tr");
	    _table.appendChild(_tr);
		for (let i = 0; i < intestazioni.length; i++) {
			let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _th.style.width = larghezze[i] + "px";
			_tr.appendChild(_th);
		}
    }

    function caricaListaIngredienti(){
         let vetIngredienti = ingredients.ingredients; // oppure let vetIngredienti = ingredients["ingredients"];
            
         // per ordinare il vettore di record
         vetIngredienti.sort(function(record1,record2){
            let str1 = record1.strIngredient1.toUpperCase();
            let str2 = record2.strIngredient1.toUpperCase();
            if(str1 < str2)
                return -1;
                else if(str1 > str2)
                    return 1;
                else
                    return 0;
         });

         // caricamento del listBox
         let _option = document.createElement("option");
         _option.text = "";
         _lstIngredienti.appendChild(_option);
         for (const item of vetIngredienti) {
             let _option = document.createElement("option");
             _option.text = (item["strIngredient1"]);
             _lstIngredienti.appendChild(_option);
         }
    }


    function caricaTabellaCocktails(){
        let _td;
        let vetCocktails = cocktails.drinks;
        _table.innerHTML = "";
        _table.style.overflow = "auto";
        creaIntestazioni();
        for (const item of vetCocktails) {
            if(((_optTutti.checked) || (_optAlcolici.checked && item.strAlcoholic == "Alcoholic") || (_optNonAlcolici.checked && item.strAlcoholic == "Non alcoholic")) 
                && (_lstIngredienti.value == "") || (_lstIngredienti.value == item.strIngredient1))
            {
                let _tr = document.createElement("tr");
                _table.appendChild(_tr);
                
                // immagine img, bisogna crearsi un tag img
                _td = document.createElement("td");
                _tr.appendChild(_td);
                let _img = document.createElement("img");
                _td.appendChild(_img);
                _img.src = item.strDrinkThumb;
                _img.style.width = "40px";
    
                // id
                 _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.idDrink;
    
                 // name
                 _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.strDrink;
    
                // alcoholic
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.strAlcoholic;
    
                 // ingrediente principale
                 _td = document.createElement("td");
                 _tr.appendChild(_td);
                 _td.innerHTML = item.strIngredient1;
    
                 // dettagli
                _td = document.createElement("td");
                _tr.appendChild(_td);
                let _a = document.createElement("a");
                _td.appendChild(_a);
                _a.href = "#";
                _a.idDrink = item.idDrink;
                _a.innerHTML = "dettagli";
                _a.addEventListener("click",visualizzaDettagli);
            }
            
        }
    }

    function visualizzaDettagli(){
        let _divDettagli = document.getElementById("dettagli");
        _divDettagli.innerHTML="";
        for (const item of cocktails.drinks) {
            if(item.idDrink == this.idDrink)
            {
                // h3
                let _h3 = document.createElement("h3");
                _h3.innerHTML = item.strDrink;
                _divDettagli.appendChild(_h3);

                // ingredienti
                let ingredients = "";
                for (let i = 1; i <= 5; i++) {
                    if(item["strIngredient"+i]!=null)
                        ingredients += item["strIngredient"+i] + " - ";
                }
                let _pIngredients = document.createElement("p");
                _divDettagli.appendChild(_pIngredients);
                _pIngredients.innerHTML = ingredients;
                
                // img
                let _img = document.createElement("img");
                _divDettagli.appendChild(_img);
                _img.style.width = "140px";
                _img.src = item.strDrinkThumb;

                break;
            }
        }
    }
}