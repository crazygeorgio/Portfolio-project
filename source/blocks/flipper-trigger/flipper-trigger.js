(function() {
	var trigger = document.querySelectorAll('.flipper-trigger'),
		btnBack = document.getElementsByClassName('flipper-trigger_back')[0],
		i;

	function turnFlipper(flipId) {
 			
 			var flipper = document.querySelector('.flipper[data-flip-id = ' + flipId + ']');
 			if(!flipper) return false;

 			if(flipper.classList.contains('flipper_turned')) {
				flipper.classList.remove('flipper_turned');
				if(btnBack) btnBack.classList.remove('flipper-trigger_hidden');
			} else {
					flipper.classList.add('flipper_turned');
					if(btnBack) btnBack.classList.add('flipper-trigger_hidden');
			}

	}		

	for(i in trigger) {

		if(typeof trigger[i].addEventListener !== 'function') continue;

		trigger[i].addEventListener('click', function(e) {
			
			e.preventDefault();
			var flipId = this.getAttribute('data-flip-id');
			turnFlipper(flipId);

		});
		
	}

	if(window.location.hash.replace('#','') == 'login') {
		turnFlipper('main');
	}


})();