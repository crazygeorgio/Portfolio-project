//FORMS	
var allForms = document.getElementsByTagName('form'),
	ajaxForms = document.getElementsByClassName('ajax-form'),
	i,
	forms = (function(){

		var i,
			minLength = 3,
			tipClass = 'form__tip',
			tipClassVisible = 'form__tip_visible',
			messageClass = 'form__tip-message',
			messageText = {
				'required' : 'Поле не заполнено',
				'pattern' : 'Значение поля не соответствует формату'
			},
			elementClassError = '_error';

		return {

			showTip: function(element, typeErr) {
				var container = (element.type === 'radio' ? element.parentNode.parentNode.parentNode : element.parentNode),
					tip = container.getElementsByClassName(tipClass)[0],	
					typeMessageClass = messageClass + '_' + typeErr,
					message;

				if(!tip) {
					var tip = document.createElement('span');
					tip.classList.add(tipClass);
					container.appendChild(tip);
				}

				message = tip.getElementsByClassName(typeMessageClass)[0];

				if(!message) {
					message = document.createElement('span');
					message.classList.add(messageClass);
					message.classList.add(typeMessageClass);
					message.innerHTML = messageText[typeErr];

					tip.appendChild(message);
				}	

				tip.classList.add(tipClassVisible);		
			},

			hideTip: function(element, typeErr) {
				var container = (element.type === 'radio' ? element.parentNode.parentNode.parentNode : element.parentNode),
					tip = container.getElementsByClassName(tipClass)[0],
					typeMessageClass = messageClass + '_' + typeErr,
					message;

				if(!tip) return;

				message = tip.getElementsByClassName(typeMessageClass)[0];

				if(message) {
					tip.removeChild(message);
				}	

				if(!tip.getElementsByClassName(messageClass).length) {
					tip.classList.remove(tipClassVisible);
				}
			},

			clearOnFocus: function() {
				this.classList.remove(elementClassError);
			},

			triggerTip: function(element, cond, typeErr) {
				if(cond) {
					this.showTip(element, typeErr);
					return false;
				} else {
					this.hideTip(element, typeErr);
					return true;
				}
			},

			checkRequired: function(element) {
				var typeErr = 'required',
					cond;

				switch(element.type) {
					case 'checkbox': 
						cond = (element.required && !element.checked);
					break;
					case 'radio':
						cond = (element.required && !element.checked);
						if(!element.required) return true;
					break;
					default:
						cond = (element.required && element.value.length < 3);
					break;
				}
				
				return this.triggerTip(element, cond, typeErr);
			},

			checkPattern: function(element) {
				if(!element.value) return true;

				var typeErr = 'pattern',
					cond = (element.pattern && !element.value.match(new RegExp(element.pattern, 'i')));

				return this.triggerTip(element, cond, typeErr);				
			},

			checkValidation: function(element, showStyleErr) {
				var elementIsValid = true;
				if(!this.checkRequired(element)) elementIsValid = false;
				if(!this.checkPattern(element)) elementIsValid = false;

				if(showStyleErr) {
					if(!elementIsValid) element.classList.add(elementClassError);
					else element.classList.remove(elementClassError);
				}

				return elementIsValid;
			},

			validateForm: function(form) {
				var input = form.getElementsByTagName('input'),
					textarea = form.getElementsByTagName('textarea'),
					elements = [],
					formIsValid = true,
					$that = this;

				for(i = 0; i < input.length; i++) elements = elements.concat(input[i]);
				for(i = 0; i < textarea.length; i++) elements = elements.concat(textarea[i]);

				for(i = 0; i < elements.length; i++) {

					var elementValidation = $that.checkValidation(elements[i], true);
					formIsValid = formIsValid ? elementValidation : formIsValid;

					elements[i].onkeyup = elements[i].oninput = elements[i].onclick = function() {
						$that.checkValidation(this);
					};
					elements[i].onpropertychange = function(e) {
						if (e.propertyName == 'value') $that.checkValidation(this);
					};
					elements[i].oncut = function() {
						setTimeout($that.checkValidation(elements[i]), 0); 
					};

					elements[i].addEventListener('focus', $that.clearOnFocus);
					elements[i].addEventListener('click', $that.clearOnFocus);
			
				}

				form.addEventListener('reset', function(e){
					var tips = form.getElementsByClassName(tipClass);
					for(i = 0; i < elements.length; i++) {
						$that.clearOnFocus.bind(elements[i])();
						elements[i].onkeyup = elements[i].oninput = elements[i].onclick = elements[i].onpropertychange = elements[i].oncut = null;
					}
					for(i = tips.length - 1; i >= 0; i--) {
						tips[i].parentNode.removeChild(tips[i]);
					}
				});

				return formIsValid;
			}

		}

	})();

	for(i = 0; i < allForms.length; i++) {
		allForms[i].noValidate = true;
		allForms[i].onsubmit = function(e) {
			return forms.validateForm(this);
		};
	};

	for(i = 0; i < ajaxForms.length; i++) {
		ajaxForms[i].onsubmit = function(e) {
			e.preventDefault();
			if(!forms.validateForm(this)) return;
		};
	};
