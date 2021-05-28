"use strict";
$(function () {
	let _wFiliali=$("#wrapFiliali");
	let _wCorrentisti= $("#wrapCorrentisti");
    let _lstBanche = $("#lstBanche");
	let _lstFiliali = $("#lstFiliali");
	let _table = $("#tabCorrentisti").children("tbody");//Caricamento dinamico dei dati
    _wFiliali.css("display", "none");
	_wCorrentisti.css("display", "none");
	_table.empty();
	_lstBanche.prop("selectedIndex",-1);//-1 -> Non seleziona nessun valore di default
	_lstBanche.on("change",function(){ //Quando l'utente seleziona un valore si richiama la seguente funzione
		_lstFiliali.empty();//Per evitare di ammassare dati inutili
		//_wCorrentisti.css("display","none"); //Facoltativo
		_wFiliali.css("display", "block");//Rendo visibile la cmbFiliali
		let request = inviaRichiesta("get","servizi/elencoFiliali.php",{"cBanca": _lstBanche.val()});//Richiesta di dati al seguente file
		request.fail(errore);
		request.done(function(filiali){//Filiali è un Json, disponibili solo se i dati sono stati ricevuti correttamente
			//console.log(filiali);
			for (const filiale of filiali) {
				let opt = $("<option>");
				opt.appendTo(_lstFiliali);
				opt.val(filiale["cFiliale"]);
				opt.text(filiale.Nome);
			}
			_lstFiliali.prop("selectedIndex",-1);
		})
	})
	_lstFiliali.on("change",function(){
		let request = inviaRichiesta("get","servizi/elencoCorrentisti.php",{"cFiliale": _lstFiliali.val()});
		request.fail(errore);
		request.done(function(correntisti){
			_table.empty();
			//console.log(correntisti);
			for (const correntista of correntisti) {
				let tr = $("<tr>");
				tr.appendTo(_table);
				
				let td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.cCorrentista);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.Nome);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.cComune);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.Telefono);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.cConto);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.Saldo);
			}
			_wCorrentisti.css("display","block");
		})
	});
});