"use strict"
function crea(){
	localStorage.setItem("bookstore_xml", bookstore);
	alert("Dati salvati correttamente all'interno del localStorage");
}
function visualizza(){
	// lettura della stringa dal localStorage
	let xml = localStorage.getItem("bookstore_xml");
	/****** INIZIO ELABORAZIONE ******/
	// istanzio un nuovo parser
	let parser = new DOMParser();
	// tramite il DOMParser, parsifico la stringa xml
	let xmlDoc = parser.parseFromString(xml, "text/xml");
	// accedo alla radice dell'albero
	let root = xmlDoc.documentElement;
	// inizialmente il nodo corrente è la root (in questo caso bookstore)
	let nLibri = root.children.length;
	alert("Dati letti correttamente dal localStorage. N° di record letti = " + nLibri);
	// accedo al tBody e lo ripulisco
	let _tbody = document.getElementById("tabLibri");
	_tbody.innerHTML = "";
	for(let i=0; i<nLibri; i++)
	{
		let titolo = "", categoria = "", lingua = "", 
			autori = "", anno = "", prezzo = "";
		let libro = root.children[i];
		if(libro.hasAttribute("category"))
		{
			categoria = libro.getAttribute("category");
		}
		// faccio un ciclo che scandisce tutti i nodi di book
		for(let j=0; j<libro.children.length; j++)
		{
			let campo = libro.children[j];
			switch(campo.nodeName)
			{
				case 'title':
					titolo = campo.textContent;
					if(campo.hasAttribute("lang"))
					{
						lingua = campo.getAttribute("lang");
					}
					break;
				case 'year':
					anno = campo.textContent;
					break;
				case 'price':
					prezzo = campo.textContent;
					break;
				case 'author':
					if(autori=="")
					{
						autori += campo.textContent;
					}
					else
					{
						autori += " - " + campo.textContent;
					}	
					break;
			}
		}
		let tr = document.createElement("tr");
		_tbody.appendChild(tr);
		
		let td = document.createElement("td");
		td.innerHTML = titolo;
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = categoria;
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = lingua;
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = autori;
		tr.appendChild(td);
	
		td = document.createElement("td");
		td.innerHTML = anno;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = prezzo;
		tr.appendChild(td);
	}
}