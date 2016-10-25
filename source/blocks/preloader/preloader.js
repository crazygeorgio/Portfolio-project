// PRELOADER	
var preloader = (function() {

	var elements = document.getElementsByTagName('*'),
		totalImgs,
		html = document.getElementsByTagName('html')[0],
	
		preloader = document.getElementsByClassName('preloader')[0],
		preloaderPercents = document.getElementsByClassName('preloader__progress-text')[0],	
		timer;

		if(!preloader || !preloaderPercents) return;

		html.classList.remove('_loaded');

	return {

		totalLoaded: 0,

		showedPercents: 0,

		getImgs: function() {

			var imgs = [];

			for(var i in elements) {
				if(typeof elements[i] !== 'object') continue;
				
				var imgUrl = null;

				switch (elements[i].nodeName) {
				  case 'IMG':
				    imgUrl = elements[i].getAttribute('src');
				    break;
				  /*case 'SVG': case 'svg':
				    var svgUse = elements[i].getElementsByTagName('use');
				    if(!svgUse[0]) break;
				    var useHref = svgUse[0].getAttribute('xlink:href');
				    useHref = useHref.match(/(.*?)\.svg/);
				    imgUrl = (useHref !== null ? useHref[0] : null);
				    break;*/
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

			return imgs;

		},

		loadImgs: function() {

			var imgs = this.getImgs(),
				totalImgs = imgs.length,
				$that = this;

			for(i in imgs) {
				var img = new Image();
				img.src = imgs[i];
				img.onload = function() {
					$that.totalLoaded++;
				  	$that.setPercents($that.totalLoaded, totalImgs);
				  	console.log(this.src + ' загружено');
				};
				img.onerror = function() {
					$that.totalLoaded++;
				  	$that.setPercents($that.totalLoaded, totalImgs);
				};
			}

		},

		setPercents: function(totalLoaded, totalImgs) {
			var percents = Math.ceil(totalLoaded / totalImgs * 100),
				$that = this;

			clearInterval(timer);
			preloaderPercents.textContent = this.showedPercents;

			if(percents >= 100) {
				preloaderPercents.textContent = this.showedPercents = 100;

				if(preloader) {
					preloader.classList.add('preloader_hidden');
					html.classList.remove('_init');
					html.classList.add('_loaded');
				}

			} else {

				timer = setInterval(function() {
					
					preloaderPercents.textContent = $that.showedPercents;
					$that.showedPercents++;

					if($that.showedPercents >= percents) {
						clearInterval(timer);
					}
				}, 10);

			}
		},

		init: function() {

			this.loadImgs();

		}

	}

})();

var stylesheet = loadCSS(preloadStyle ? preloadStyle : null, document.getElementsByClassName('page')[0]);
onloadCSS(stylesheet, function() {
    preloader.init();
});