"use strict"


$(document).ready(function(){
    
var wrapper = $("#wrapper")[0]
 // vallauri    // LatLng non accetta strignhe
let position = new google.maps.LatLng(44.5557763, 7.7347183);	

let mapOptions = {
	"center":position,
	"zoom":16, 
	"mapTypeId": google.maps.MapTypeId.ROADMAP,	
	
	// ---------------------------------------------------------------
	//   IMPOSTAZIONE MANUALE DEI BOTTONI DI CONTROLLO 
	// ---------------------------------------------------------------
	// disabilito tutti i pulsanti di controllo
	disableDefaultUI:true,  
	
	// Pulsanti di zoom + -
	zoomControl: true,
	zoomControlOptions: {
		// style: deprecata,
		position: google.maps.ControlPosition.RIGHT_CENTER
	},
	
	// Omino StreetView
	streetViewControl: true,
	streetViewControlOptions: {
		position: google.maps.ControlPosition.RIGHT_CENTER
	},
	
	// Pulsanti switch Mappa/Satellite (il chek Rilievo visualizza il TERRAIN)
	mapTypeControl: true,
	mapTypeControlOptions: {
		style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, // default
		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,  // verticale	
		position: google.maps.ControlPosition.TOP_LEFT,
	},		
	
	// Pulsante FullScreen
	fullscreenControl: true,
	fullscreenOptions: {
		// Non ha opzioni, utilizza una posizione fissa in alto a destra
	},	
	
	// Visualizza nella riga di stato in basso a destra un fattore di scala
	// per default è disabilitato
	scaleControl: true,       
	scaleControlOptions: {
		// Non ha opzioni
	},	
};
	
// Visualizzazione della mappa  
var mappa = new google.maps.Map(wrapper, mapOptions); 



})