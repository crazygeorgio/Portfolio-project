document.addEventListener('DOMContentLoaded', function() {
// BLUR	
	var blur = (function(){
		var bgImg = document.getElementsByClassName('page__footer-bg-img')[0],
			formBlur = document.getElementsByClassName('form__wrap-blur')[0];

		return {

			init: function() {

				if(!bgImg || !formBlur) return;

				if(navigator.userAgent.indexOf('Trident') + 1 != 0) {
					formBlur.classList.add('form__wrap-blur_alt');
					return;
				}

				var posLeft = bgImg.getBoundingClientRect().left - formBlur.getBoundingClientRect().left,
					posTop =  bgImg.getBoundingClientRect().top - formBlur.getBoundingClientRect().top;

				//formBlur.style.backgroundImage = 'url(' + bgImg.src + ')';
				formBlur.style.backgroundPosition = posLeft/10 + 'rem' + ' ' + posTop/10 + 'rem';
				formBlur.style.backgroundSize = bgImg.clientWidth/10 + 'rem' + ' ' + bgImg.clientHeight/10 + 'rem';	

			}

		}

	})();

	blur.init();
	window.addEventListener('resize', blur.init.bind(blur));
	window.addEventListener('scroll', blur.init.bind(blur));

//Parallax
	var parallax = (function(){

		var bgImg = document.getElementsByClassName('page__footer-bg-img')[0],
			leaf1 = document.getElementsByClassName('page__footer-bg-leaf-1')[0],
			leaf2 = document.getElementsByClassName('page__footer-bg-leaf-2')[0],
			leaf3 = document.getElementsByClassName('page__footer-bg-leaf-3')[0];

		return {

			move: function(element, speedShift, speedDrop, speedRotate) {
				
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
					pageHeight = document.documentElement.scrollHeight,
					clientHeight = document.documentElement.clientHeight,scrollTop,
					top = element.getBoundingClientRect().top + (window.innerHeight || window.body.clientHeight || document.documentElement.clientHeight),
					transform;

					transform  = speedShift ? 'translateX(' + ( (scrollTop + clientHeight) / pageHeight - 1 ) * 1000 * speedShift + '%)' : ''; 
					transform += speedDrop ? 'translateY(' + ( (scrollTop + clientHeight) / pageHeight - 1 ) * 1000 * speedDrop + '%)' : ''; 
					transform += 'translateZ(0)'; 
					transform += speedRotate ? 'rotate(' + ( (scrollTop + clientHeight) / pageHeight - 1 ) * speedRotate * 360 + 'deg)' : '';

					if(transform === 'translateZ(0)') {
						//console.log(element.style);
						element.style.bottom = ( (scrollTop + clientHeight) / pageHeight - 1 ) * 100 + '%';

						console.log(element.style);
						return;
					}

					element.style.webkitTransform = transform;
					element.style.mozTransform = transform;
					element.style.transform = transform;
					element.style.msTransform = transform;
					element.style.oTransform = transform;

			},

			init: function() {
				
				if(leaf1) this.move(leaf1, 1, 0.75, 0.5);
				if(leaf2) this.move(leaf2, 1, 2, 1);
				if(leaf3) this.move(leaf3, 1, 4, 2);
				if(bgImg) this.move(bgImg, false, false, false);
			
			}

		}

	})();	

	window.addEventListener('scroll', parallax.init.bind(parallax));


});


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