// $(function(){

// 	// Flipper trigger
// 	(function(){

// 		$(document).on('click', '.flipper-trigger', function(e){
// 			e.preventDefault();
//  			var $this = $(this);
//  			var flipId = $(this).attr('data-flip-id');
//  			var flipper = $('.flipper[data-flip-id = ' + flipId + ']');

//  			if($this.hasClass('flipper-trigger_back')) {
//  				flipper.addClass('flipper_turned');
//  				$this.addClass('flipper-trigger_hidden');
//  			} else {
//  				flipper.removeClass('flipper_turned');
//  				$('.flipper-trigger_back').removeClass('flipper-trigger_hidden');
//  			}

// 		});

// 	})()

// })

document.addEventListener('DOMContentLoaded', function() {
	
	(function(){
		var trigger = document.querySelectorAll('.flipper-trigger'),
			i;
		for(i in trigger) {

			if(typeof trigger[i].addEventListener !== 'function') continue;

			trigger[i].addEventListener('click', function(e){
				e.preventDefault();
	 			var flipId = this.getAttribute('data-flip-id');
	 			var flipper = document.querySelector('.flipper[data-flip-id = ' + flipId + ']');
	 			if(!flipper) return false;

	 			if(this.classList.contains('flipper-trigger_back')) {
 					flipper.classList.add('flipper_turned');
 					this.classList.add('flipper-trigger_hidden');
				} else {
					flipper.classList.remove('flipper_turned');
 	 				document.querySelector('.flipper-trigger_back[data-flip-id = ' + flipId + ']').classList.remove('flipper-trigger_hidden');
				}

			});
			
		}
	})()

});