"use strict"
window.onload = function(){
	var studente = 
	{
		"nome": "mario",
		"cognome": "rossi",
		"eta": 16,
		"studente": true,
		"images": ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
		"hobbies": [], // vettore al momento vuoto
		"pos": {"x": 40, "y": 300}, // oggetto annidato
		"stampa": function() { alert("Hello "+ this.nome); },
		"fullName": function(){return this.nome+ " " + this.cognome; }
	};
	this.console.log(studente["eta"]);
	studente.eta++;
	this.console.log(studente.eta);
	this.console.log(studente.fullName());
	// anche this.console.log(studente["fullName"]());
	// aggiunta di una nuova chiave
	studente["residenza"] = "fossano";
	studente.classe = "4b inf";
	this.console.log(studente.residenza);
	// ***************NOTA BENE***************
	if("classe" in studente) // se questa chiave appartiene a studente
	// anche if (studente.hasOwnProperty("classe"))
	{
		this.console.log(studente["classe"]);
	}
	else
	{
		this.console.log("chiave inesistente");
	}
	// dichiarazione di un nuovo object
	let studente2 = {};
	studente2.nome = "pluto";
	studente2.residenza = "alba";
	// scansione delle proprietà di un oggetto
	this.console.log("******STUDENTE2******");
	for (let key in studente2) // key variabile che scandisce le variabili del vettore studente2
	{
		if (studente2.hasOwnProperty(key))
		{
			this.console.log(key + ": " + studente2[key]);
		}
	}
	this.console.log("******STUDENTE******");
	for (let key in studente)
	{
		//if(!studente[key].toString().includes("function"))
		if(typeof(studente[key]) != "function")
		{
			this.console.log(key + ": " + studente[key]);
		}
		// console.log(key + ": " + typeof(studente[key]));
	}	
	// serializzazione di un oggetto
	// console log serializza in automatico, alert non serializza
	this.console.log(studente);
	this.alert(studente);
	this.alert(JSON.stringify(studente)); // serializzazione di JSON, diverso dall'XML
	// vettore enumerativo delle chiavi
	let keys = Object.keys(studente);
	// for of scandisce il contenuto del vettore enumerativo (keys)
	for(let iterator of keys)
	{
		this.console.log(iterator);
	}
}