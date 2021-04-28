"use strict"
$(document).ready(function(){
	let header =$("#header")
	let button = header.children("input")
	let partenza = header.find("input").eq(0)
	let arrivo = header.find("input").eq(1)
	let wrapper = $("#wrapper") 
	let map =  wrapper.children(".map")[0]     // js
	let panel= wrapper.children(".panel")[0]   // js
	let msg =  wrapper.children(".msg") 
	button.on("click", function(){
		if (partenza.val() == "" || arrivo.val() == "") 
			alert("Prego compilare i campi di partenza e arrivo")
		else{	
				let geocoder= new google.maps.Geocoder();
				geocoder.geocode( {'address': partenza.val()}, function(resultStart, status) {
					if (status != google.maps.GeocoderStatus.OK)
						alert("Stringa immessa non valida");
					else{
					geocoder.geocode( {'address': arrivo.val()}, function(resultsArrive, status) {
						if (status != google.maps.GeocoderStatus.OK)
							alert("Stringa immessa non valida");
						else
						{
							let coordStart=resultStart[0].geometry.location;
							let coordArrive=resultsArrive[0].geometry.location;
							visualizzaPercorso(coordStart, coordArrive);
						}
					})
				}
			})
		}
	})
	function visualizzaPercorso(start, arrivo)
	{
		let directionsService=new google.maps.DirectionsService();
		let directionsRenderer=new google.maps.DirectionsRenderer();
		let precorso=
		{
			"origin":start,
			"destination":arrivo,
			"travelMode":google.maps.TravelMode.DRIVING, //Default
		};
		directionsService.route(precorso, function(routes,status){
			if(status!=google.maps.DirectionsStatus.OK)
			alert("Percorso non valido");
			else
			{
				let mapOptions=
				{
					"center":start,
					"zoom":16,
					"mapTypeId":google.maps.MapTypeId.HYBRID, //Default: ROADMAP
				};
				let mappa=new google.maps.Map(map, mapOptions);
				directionsRenderer.setMap(mappa);
				directionsRenderer.setDirections(routes);
				// Pannello contenente tutte le indicazioni sul percorso
				directionsRenderer.setPanel(panel);
				let distanza=routes.routes[0].legs[0].distance.text;
				let durata=routes.routes[0].legs[0].duration.text;
				msg.html("Distanza: "+distanza+"<br>Durata: "+durata);
			}
		})
	}
});