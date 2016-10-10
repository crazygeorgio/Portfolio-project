document.addEventListener('DOMContentLoaded', function() {
	
	(function(){
		var elements = document.getElementsByTagName('*'),
			imgs = [];

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
				var bgImg = getComputedStyle(elements[i], false).backgroundImage;
				if(bgImg != 'none') {
					bgImg = bgImg.match(/url\((.*?)\)/);
					bgImg = (bgImg !== null ? bgImg[1].replace(/('|")/g,'') : null);
					imgUrl = bgImg;
				}
			}

			if(imgUrl !== null && imgUrl != 'none' && imgs.indexOf(imgUrl) == -1) imgs.push(imgUrl);
		}

		var totalLoaded = 0;
		var totalLoadedPercents = 0;
		var total = imgs.length;

		for(i in imgs) {
			var img = new Image();
			img.src = imgs[i];
			img.onload = function() {
				totalLoaded++;
			  	setPercents(totalLoaded, total);
			};
			img.onerror = function() {
				totalLoaded++;
			  	setPercents(totalLoaded, total);
			};
		}

		function setPercents(totalLoaded, total) {
			//console.log(totalLoaded);
			var percents = Math.ceil(totalLoaded/total*100);

			while(totalLoadedPercents < percents){
				totalLoadedPercents++;
				console.log(totalLoadedPercents);
			}

		}


	})()

});