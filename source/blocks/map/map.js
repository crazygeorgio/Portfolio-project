var map,
	styleMap = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "100"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#86a77a"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

function initMap() {

    if(!document.getElementById('map')) return;

	var myLatLng = {lat: 60.065651, lng: 30.312249};

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 15,
		mapTypeControl: false,
		panControl: false,
      	zoomControl: true,
      	zoomControlOptions: {
      		position: google.maps.ControlPosition.RIGHT_CENTER
    	},
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        draggable: !("ontouchend" in document),
        styles: styleMap
	});

	var marker = new google.maps.Marker({
	    position: myLatLng,
	    map: map,
	    title: 'Моя локация'
	});

	marker.setMap(map);
}