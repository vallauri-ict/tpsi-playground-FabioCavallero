"use strict"

const URL = "https://maps.googleapis.com/maps/api/"
const key  = "" 

const params = {
	"key":key,
	"center": "via san michele 68, fossano", //"44.5557763,7.7347183",
	"zoom":16,  //valore intermedio, fra i più usati
	"size":"800x600",	
	// maptype viene aggiunto dopo  manualmente
	"markers":"color:blue|size:big|label:V|via san michele 68, fossano",	//mette un marcatore di colore blu all'indirizzo indicato
	"heading" : "60",
	"pitch" : "7",
	"fov" : "45"
}
const mapType = ['roadmap', 'satellite', 'hybrid', 'terrain', 'streetview']; //vettore che da i vari tipi di visualizzazione



window.onload = function () {	
    let imgBox = $("#imgBox");
    let btnBox = $("#btnBox");
	
	for (const type of mapType) 
	{
		let button = $("<button>");
		button.text(type);
		button.appendTo(btnBox);
		button.on("click",visualizzaMappa);
	}

	$("button").eq(0).trigger("click");


	function visualizzaMappa(){
		let url;
		if($(this) != "streetview")
		{
			url = URL + "staticmap?" + setParameters($(this).text());
		}
		else
		{
			url = URL +"streetview?" + setParameters("streetview");
		}
		console.log(url);
		imgBox.prop("src", url);
		$("button").removeClass("active");
		$(this).addClass("active");
	}

	function setParameters(mapType){
		let qstring = "";
		for (const key in params) 
		{
			qstring += key + "=" +params[key] + "&";
		}
		qstring += "maptype=" + mapType;

		return qstring;
	}

}