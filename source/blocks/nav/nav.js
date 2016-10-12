document.addEventListener('DOMContentLoaded', function() {
	
	(function(){
		var btnMenu = document.querySelectorAll('.btn-menu'),
			i;
		for(var i in btnMenu){

			if(typeof btnMenu[i].addEventListener !== 'function') continue;

			btnMenu[i].addEventListener('click', function(e) {
				e.preventDefault();
				var nav = document.querySelector('.nav');
				if(!nav) return false;

				if(!nav.classList.contains('nav_open')) {
					nav.classList.add('nav_open');
					this.classList.add('btn-menu_cross');
					this.classList.add('nav__btn-menu_fixed');
				} else {
					nav.classList.remove('nav_open');
					this.classList.remove('btn-menu_cross');
					this.classList.remove('nav__btn-menu_fixed');
				}
			});
			
		}
	})()

});