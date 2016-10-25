// SLIDER	
(function(){

	var slider = document.getElementsByClassName('slider');

	if (!slider.length) return;

	function Slider(root) {
		this.sliderRoot = root;

		this.sliderItems = [];
		
		this.currentItemNum = 0;

		this.flag = false;

		this.getValuesItemsHelper = function(item, name) {
			var classPrefix = 'slider__item-',
				value;

			value = item.getAttribute('data-' + name);

			if(!value) {
				value = item.getElementsByClassName(classPrefix + name)[0];
				value = (value ? value.innerHTML.trim() : null);	
			}

			return value;
		};

		this.genItems = function() {
			var items = this.sliderRoot.getElementsByClassName('slider__item'),
				i,
				sliderItem;
			
			if (!items.length) return false;

			for(i in items) {
				if(typeof items[i] !== 'object') continue;
				sliderItem = {
					'title': this.getValuesItemsHelper(items[i], 'title'),
					'descr': this.getValuesItemsHelper(items[i], 'descr'),
					'img': this.getValuesItemsHelper(items[i], 'img'),
					'href': this.getValuesItemsHelper(items[i], 'href'),
				};

				this.sliderItems[i] = sliderItem;
			}
			this.total = this.sliderItems.length;
		};

		this.genHTML = function() {
			var blockPic = document.createElement('div'),
				blockPicItem = document.createElement('div'),
				blockAboutUnit = document.createElement('div'),
				blockUnitTitle = document.createElement('div'),
				blockUnitTitleCnt = document.createElement('div'),
				blockUnitDescr = document.createElement('div'),
				blockUnitLink = document.createElement('div'),
				blockUnitLinkHref = document.createElement('a'),
				blockNav = document.createElement('div'),
				blockNavBtnPrev = document.createElement('a'),
				blockNavBtnNext = document.createElement('a'),
				i;

			blockPic.classList.add('slider__init-pic');
			this.blockPic = blockPic;
			this.blockPicActiveItem = blockPic.appendChild(blockPicItem.cloneNode());
			this.blockPicActiveItem.classList.add('slider__init-pic-item');
			this.blockPicActiveItem.classList.add('slider__init-pic-item_visible');
			this.blockPicDisactiveItem = blockPic.appendChild(blockPicItem);	
			this.blockPicDisactiveItem.classList.add('slider__init-pic-item');
			this.blockPicDisactiveItem.classList.add('slider__init-pic-item_hidden');		

			blockAboutUnit.classList.add('slider__about-unit');
			blockUnitTitle.classList.add('slider__unit-title');
			blockUnitTitleCnt.classList.add('title');
			blockUnitTitleCnt.classList.add('title_with-line');
			blockUnitTitleCnt.classList.add('title_with-line-upper');
			blockUnitDescr.classList.add('slider__unit-descr');
			blockUnitLink.classList.add('slider__unit-link');
			blockUnitLinkHref.classList.add('btn');
			blockUnitLinkHref.classList.add('btn_with-icon');
			blockUnitLinkHref.setAttribute('href', '#');
			blockUnitLinkHref.setAttribute('target', '_blank');
			blockUnitLinkHref.innerHTML = '<svg class="svg-icon svg-icon_link" role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./assets/img/sprite.svg#link"></use></svg><span>Посмотреть сайт</span>';
			
			this.blockUnitTitle = blockAboutUnit.appendChild(blockUnitTitle).appendChild(blockUnitTitleCnt);
			blockAboutUnit.appendChild(blockUnitTitle).style.display = 'none';
			this.blockUnitDescr = blockAboutUnit.appendChild(blockUnitDescr);
			this.blockUnitDescr.style.display = 'none';
			this.blockUnitLink = blockAboutUnit.appendChild(blockUnitLink).appendChild(blockUnitLinkHref);
			this.blockUnitLink.parentNode.style.display = 'none';

			blockNav.classList.add('slider__nav');
			blockNavBtnPrev.classList.add('slider__nav-btn');
			blockNavBtnPrev.setAttribute('href', '#');
			blockNavBtnPrev.setAttribute('rel', 'nofollow');
			blockNavBtnPrev.innerHTML = '<span class="slider__nav-icon"></span>';
			blockNavBtnNext = blockNavBtnPrev.cloneNode();
			blockNavBtnNext.innerHTML = blockNavBtnPrev.innerHTML;
			this.blockNavBtnPrev = blockNav.appendChild(blockNavBtnPrev);
			this.blockNavBtnPrev.classList.add('slider__nav-btn_prev');
			this.blockNavBtnNext = blockNav.appendChild(blockNavBtnNext);
			this.blockNavBtnNext.classList.add('slider__nav-btn_next');

			this.blockNavBtnNext.addEventListener('click', this.clickNavBtn.bind({slider: this, type: 'next'}));
			this.blockNavBtnPrev.addEventListener('click', this.clickNavBtn.bind({slider: this, type: 'prev'}));

			this.sliderRoot.appendChild(blockPic);
			this.sliderRoot.appendChild(blockAboutUnit);
			this.sliderRoot.appendChild(blockNav);	

			var $that = this;
			return new Promise(function(resolve) {

				var loadedSlides = 0;

				function listenLoaded(loaded, total) {
					if(loaded == total) {
						resolve($that);
					}
				};

				for(i in $that.sliderItems) {
					var sliderItem = $that.sliderItems[i],
						slideImg = new Image(),
						slideThumb = document.createElement('span');

					slideThumb.classList.add('slider__nav-btn-thumb');
					
					slideImg.src = sliderItem.img;
					slideImg.onload = function() {
							console.log(this.src + ' загружено в слайдер');
							loadedSlides++;
							listenLoaded(loadedSlides, $that.total);
						};
					slideImg.onerror = function() {
							console.log(this.src + ' не загружено в слайдер');
							loadedSlides++;
							listenLoaded(loadedSlides, $that.total);
						};

					$that.blockNavBtnNext.appendChild(slideThumb).appendChild(slideImg);
					$that.blockNavBtnPrev.appendChild(slideThumb.cloneNode()).appendChild(slideImg.cloneNode());
				}

			});

		};

		this.changeSlide = function(currentNew, type) {
			var current = this.currentItemNum,
				next = this.getNextNum(current),
				prev = this.getPrevNum(current),
				nextNew = this.getNextNum(currentNew),
				prevNew = this.getPrevNum(currentNew),
				$that = this;

			return new Promise(function(resolve) {

				(type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb')[(type == 'next' ? next : prev)].classList.add('slider__nav-btn-thumb_unactive');
				(type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb')[(type == 'next' ? next : prev)].classList.remove('slider__nav-btn-thumb_active');
				(type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb')[(type == 'next' ? nextNew : prevNew)].classList.add('slider__nav-btn-thumb_active');
			
				(type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb_unactive')[0].addEventListener('transitionend', function() {
					this.classList.remove('slider__nav-btn-thumb_unactive');
					resolve(this);
				});

			});

		};

		this.setActiveInfo = function(current) {

			var activeSlide = this.sliderItems[current];

			if(activeSlide.title) {
				this.blockUnitTitle.innerHTML = activeSlide.title;
				this.blockUnitTitle.parentNode.style.display = '';
			} else {
				this.blockUnitTitle.parentNode.style.display = 'none';
			}

			if(activeSlide.descr) {
				this.blockUnitDescr.innerHTML = activeSlide.descr;
				this.blockUnitDescr.style.display = '';
			} else {
				this.blockUnitDescr.style.display = 'none';
			}

			if(activeSlide.href) {
				this.blockUnitLink.setAttribute('href', activeSlide.href);
				this.blockUnitLink.parentNode.style.display = '';
			} else {
				this.blockUnitLink.parentNode.style.display = 'none';
			}

		};

		this.setActivePic = function(current, blockPicItem) {
			var activeSlide = this.sliderItems[current],
			    img = document.createElement('img');

			return new Promise(function(resolve) {

				img.src = activeSlide.img;

				if(blockPicItem.classList.contains('slider__init-pic-item_visible')) {
					blockPicItem.classList.remove('slider__init-pic-item_visible');
					blockPicItem.classList.add('slider__init-pic-item_hidden');
					blockPicItem.innerHTML = '';
				} else {
					blockPicItem.appendChild(img).parentNode.classList.remove('slider__init-pic-item_hidden');
					blockPicItem.classList.add('slider__init-pic-item_visible');						
				}

				blockPicItem.addEventListener('transitionend', function() {
					resolve();
				});
	
			});
		};

		this.clickNavBtn = function(e) {
			e.preventDefault();

			if(this.slider.flag) {

			var current = this.slider.currentItemNum,
				currentNew = (this.type == 'next' ? this.slider.getNextNum(current) : this.slider.getPrevNum(current));	
		
				this.slider.flag = false;
				this.slider.animationDone([
					this.slider.changeSlide(currentNew, 'next'),
					this.slider.changeSlide(currentNew, 'prev'),
					this.slider.setActivePic(currentNew, this.slider.blockPicActiveItem),
					this.slider.setActivePic(currentNew, this.slider.blockPicDisactiveItem)
				]);

				this.slider.setActiveInfo(currentNew);

				this.slider.currentItemNum = currentNew;

			}

		};

		this.getNextNum = function(current) {
			current++;
        	return (current > this.total - 1 ? 0 : current);
		};

		this.getPrevNum = function(current) {
        	current--;
        	return (current < 0 ? this.total - 1 : current);
		};

		this.animationDone = function(arr) {
			var $that = this;
			Promise.all(arr).then(function(results) {
			  	$that.flag = true;
			  	console.log('aimation done');
			});
		};

		this.init = function() {

			this.genItems();

			if(this.sliderItems.length === 0) return;

			this.genHTML().then(function(slider) {

				slider.sliderRoot.classList.add('slider_loaded');

				slider.animationDone([
					slider.changeSlide(slider.currentItemNum, 'next'),
					slider.changeSlide(slider.currentItemNum, 'prev'),
					slider.setActivePic(slider.currentItemNum, slider.blockPicActiveItem),
					slider.setActivePic(slider.currentItemNum, slider.blockPicDisactiveItem)					
				]);

				slider.setActiveInfo(slider.currentItemNum);

				console.log('ready');

			});
			
		};

	}

	for(var i in slider) {
		if(typeof  slider[i] != 'object') continue;
		var s = new Slider(slider[i]);
		s.init();
	}

})();