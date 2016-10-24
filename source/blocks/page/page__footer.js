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
						element.style.bottom = ( (scrollTop + clientHeight) / pageHeight - 1 ) * 100 + '%';
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