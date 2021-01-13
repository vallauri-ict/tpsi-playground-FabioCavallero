"use strict";
window.onload = function () {
  // tiriamo su json come stringa
  let json = localStorage.getItem("bookstore_json");
  console.log(json);
  // parsifico la STRINGA json in un file di tipo json
  let jsonVet = JSON.parse(json);
  console.log(jsonVet);
  console.log(jsonVet.length);
  let _table = document.createElement("table");
  // let _body = document.getElementsByTagName("body")[0];
  let _bodies = document.getElementsByTagName("body");
  let _body = _bodies[0];
  _body.appendChild(_table);
  creaIntestazioni();
  caricaDati();
  let _divDetails = document.createElement("div");
  _body.appendChild(_divDetails);
  _divDetails.setAttribute("class", "details");
  let currentBook = 0;
  seeDetails();
  createButtons();
  // ********************ELENCO FUNZIONI********************
  function seeDetails() {
    _divDetails.innerHTML = "";
    for (const key in jsonVet[currentBook]) {
      // creo l'intestazione e la appendo alla grid
      let _p1 = document.createElement("p");
      _p1.innerHTML = key + ": ";
      _p1.style.textAlign = "right";
      _p1.style.fontWeight = "bold";
      _divDetails.appendChild(_p1);
      // creo il contenuto e lo appendo alla grid
      let _p2 = document.createElement("p");
      _p2.innerHTML = jsonVet[currentBook][key];
      _divDetails.appendChild(_p2);
    }
  }
  function creaIntestazioni() {
    let _tr = document.createElement("tr");
    _table.appendChild(_tr);
    let intestazioni = ["title", "authors", "category", "price", ""];
    for (let i = 0; i < intestazioni.length; i++) {
      let _th = document.createElement("th");
      _th.innerHTML = intestazioni[i];
      _tr.appendChild(_th);
    }
  }
  function caricaDati() {
    for (let i = 0; i < jsonVet.length; i++) {
      let _tr = document.createElement("tr");
      _table.appendChild(_tr);
      let item = jsonVet[i];
      let _td = document.createElement("td");
      _td.innerHTML = item.title;
      _tr.appendChild(_td);
      _td = document.createElement("td");
      // authors è un vettore enumerativo, join è un metodo dei vettori enumerativi e funziona solo con questi
      // il metodo join restituisce una stringa contenente tutte le voci del vettore separate da una virgola
      // serializzazione fatta in automatico nel caso dei vettori enumerativi
      _td.innerHTML = item.authors.join(", "); // funziona anche senza join, ma mette solo la virgola senza spazio
      _tr.appendChild(_td);
      _td = document.createElement("td");
      _td.innerHTML = item.category;
      _tr.appendChild(_td);
      _td = document.createElement("td");
      _td.innerHTML = item.price;
      _tr.appendChild(_td);
      // creazione pulsante elimina per record
      _td = document.createElement("td");
      let _button = document.createElement("button");
      _button.innerHTML = "ELIMINA";
      _button.addEventListener("click", deleteRecord);
      _button.whichRecordToDelete = i;
      _td.appendChild(_button);
      _tr.appendChild(_td);
    }
  }
  function deleteRecord() {
    // this = bottone che ha attivato la funzione
    let pos = this.whichRecordToDelete; 
    jsonVet.splice(pos, 1);
    localStorage.setItem("bookstore_json", JSON.stringify(jsonVet));
    window.location.reload();
  }
  function createButtons() {
    let _divNavigationButtons = document.createElement("div");
    _divNavigationButtons.setAttribute("class", "navigationButtonsContainer");
    _body.appendChild(_divNavigationButtons);
    let buttonNames = [
      "primo",
      "indietro",
      "avanti",
      "ultimo",
      "aggiungi",
      "elimina per categoria",
    ];
    for (const item of buttonNames) {
      let _button = document.createElement("button");
      // assegno come id il nome stesso del pulsante in
      // modo che sia poi accessibile nelle altre procedure
      _button.id = item;
      _button.style.padding = "5px 10px";
      _button.innerHTML = item;
      _button.setAttribute("class", "navigationButtons");
      _button.addEventListener("click", navigation);
      _divNavigationButtons.appendChild(_button);
    }
    document.getElementById("indietro").disabled = true;
  }
  function navigation() {
    // differenziamo il pulsante premuto usando this e innerHTML
    let _indietro = document.getElementById("indietro");
    let _avanti = document.getElementById("avanti");
    switch (this.innerHTML) {
      case "primo":
        currentBook = 0;
        _indietro.disabled = true;
        _avanti.disabled = false;
        break;
      case "indietro":
        currentBook--;
        if (currentBook == 0) {
          _indietro.disabled = true;
        }
        _avanti.disabled = false;
        break;
      case "avanti":
        currentBook++;
        if (currentBook == jsonVet.length - 1) {
          _avanti.disabled = true;
        }
        _indietro.disabled = false;
        break;
      case "ultimo":
        currentBook = jsonVet.length - 1;
        _avanti.disabled = true;
        _indietro.disabled = false;
        break;
      case "aggiungi":
        // window.open("pagina2.html");
        window.location.href = "pagina2.html";
        break;
      case "elimina per categoria":
        // per leggere un input da tastiera si utilizza il prompt
        let searchCategory = prompt("Inserisci la categoria da cancellare: ");
        let qta = 0;
        for (let i = jsonVet.length-1; i >= 0; i--) {
          if (jsonVet[i].category == searchCategory) {
            // modifica la lunghezza del vettore, quindi bisogna decrementare la lunghezza del vettore
            jsonVet.splice(i, 1);
            qta++;
          }
        }
        if (qta != 0) {
          alert("Cancellati " + qta + " record");
          localStorage.setItem("bookstore_json", JSON.stringify(jsonVet));
          // prima del reload carichiamo sul json il catalogo aggiornato !!!
          window.location.reload();
        } 
        else {
          alert("Nessun record trovato");
        }
        break;
    }
    // non viene richiamato se clicchiamo elimina e aggiungi, perchè apre due nuove pagine
    seeDetails();
  }
}