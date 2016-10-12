document.addEventListener('DOMContentLoaded', function() {
	
	(function(){
		var elements = document.getElementsByTagName('*'),
			imgs = [],
			totalImgs,
			totalLoaded = 0,
			showedPercents = 0,
		
			preloader = document.getElementsByClassName('preloader')[0],
			preloaderPercents = document.getElementsByClassName('preloader__progress-text')[0],	
			timer;

		if(!preloader || !preloaderPercents) return;

		for(i in elements) {
			if(typeof elements[i] !== 'object') continue;
			
			var imgUrl = null;

			switch (elements[i].nodeName) {
			  case 'IMG':
			    imgUrl = elements[i].getAttribute('src');
			    break;
			  case 'SVG': case 'svg':
			    var svgUse = elements[i].getElementsByTagName('use');
			    if(!svgUse[0]) break;
			    var useHref = svgUse[0].getAttribute('xlink:href');
			    useHref = useHref.match(/(.*?)\.svg/);
			    imgUrl = (useHref !== null ? useHref[0] : null);
			    break;
			  default:
			    if(!elements[i].nodeName) break;
				var bgImg = getComputedStyle(elements[i]).backgroundImage;
				
				if(bgImg != 'none') {
					bgImg = bgImg.match(/url\((.*?)\)/);
					bgImg = (bgImg !== null ? bgImg[1].replace(/('|")/g,'') : null);
					imgUrl = bgImg;
				}
			}

			if(imgUrl !== null && imgUrl != 'none' && imgs.indexOf(imgUrl) == -1) imgs.push(imgUrl);
		}

		totalImgs = imgs.length;

		for(i in imgs) {
			var img = new Image();
			img.src = imgs[i];
			img.onload = function() {
				totalLoaded++;
			  	setPercents(totalLoaded, totalImgs);
			};
			img.onerror = function() {
				totalLoaded++;
			  	setPercents(totalLoaded, totalImgs);
			};
		}

		function setPercents(totalLoaded, totalImgs) {
			var percents = Math.ceil(totalLoaded / totalImgs * 100);

			clearInterval(timer);

			if(percents >= 100) {
				preloaderPercents.textContent = showedPercents = 100;

				if(preloader) {
					preloader.classList.add('preloader_hidden');
				}

			} else {

				timer = setInterval(function() {
					
					preloaderPercents.textContent = showedPercents;
					showedPercents++;

					if(showedPercents >= percents) {
						clearInterval(timer);
					}
				}, 10);

			}
		}


	})()

});