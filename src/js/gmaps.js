
//See coordinates on: http://www.geo-tag.de/generator/en.html

function initialize() {

	var gmaps = document.querySelector('.gmaps--js');
	var latitude = gmaps.getAttribute('data-latitude');
	var longitude = gmaps.getAttribute('data-longitude');
	var title = gmaps.getAttribute('data-title');
  	var icon = gmaps.getAttribute("data-pin");

	var myLatlng = new google.maps.LatLng(latitude, longitude);
	var mapOptions = {

		zoom: 15,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		streetViewControl: false

	}

	var map = new google.maps.Map(gmaps, mapOptions);

	//var image = "img/pin.png";
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: icon,
		title: title,
		animation: google.maps.Animation.DROP
	});

}

function googleMaps() {

	var gmaps = document.querySelector('.gmaps--js');

	if(gmaps == null) {
		console.log('GoogleMaps not initialized.');
		return null;
	}
	console.log('GoogleMaps initialized with success.');

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src ="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5a_04MNISrrljjff4kKB37zz5HNCI8Rg&callback=initialize";

	document.body.appendChild(script);

}
