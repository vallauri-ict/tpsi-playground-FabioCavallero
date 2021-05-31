"use strict"
window.onload = function(){
	let _btnConverti = document.getElementById("btnConverti");
	// converti scritto senza tonde perchè è un puntatore ad una funzione
	_btnConverti.addEventListener("click",converti);
	function converti(){
		let xml = localStorage.getItem("bookstore_xml");
		// parsifico il documento che ho ricevuto
		let parser = new DOMParser;
		let xmlDoc = parser.parseFromString(xml,"text/xml");
		let root = xmlDoc.documentElement;
		// vettore enumerativo in cui salveremo i libri in formato JSON
		let jsonVet = [];
		// scansione dell'albero xml
		// root.children è un vettore enumerativo che contiene tutti i book figli di root
	    for (let i = 0; i < root.children.length; i++) {
			let book = root.children[i];
			let title = "", category = "", language = "", 
				year = "", price = "";
			let authors = [];
			if (book.hasAttribute("category")) {
				category = book.getAttribute("category");
			}
			for (let j = 0; j < book.children.length; j++) {
				// campo è un oggetto, quindi per leggere il nome del tag bisogna mettere NodeName
				let campo = book.children[j];
				switch (campo.nodeName) {
					case "title":
						title = campo.textContent;
						if (campo.hasAttribute("lang")) {
							language = campo.getAttribute("lang");
						}
						break;
					case "author":
						authors.push(campo.textContent);
						break;
					case "price":
						price = campo.textContent;
						break;
				}
			}
			console.log("BOOK");
			console.log(title + "-" + category + "-" + authors + "-" + year + "-" + price + "-" + language);
			// dichiarazione di un vettore associativo json
			let jsonBook = {};
			jsonBook.category = category;
			jsonBook.title = title;
			jsonBook.authors = authors;
			jsonBook.language = language;
			jsonBook.year = year;
			jsonBook.price = price;
			// inserisco jsonBool nel vettore jsonVet
			jsonVet.push(jsonBook);
		}
		// alert(JSON.stringify(jsonVet));
		alert("Dati salvati correttamente");
		localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
	}
}