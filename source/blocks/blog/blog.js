document.addEventListener('DOMContentLoaded', function() {
	(function(){

		var blockBlogMenu = document.getElementsByClassName('blog__nav-list')[0];
		
		if(!blockBlogMenu) return;


		var BlogMenu = function(block) {

			this.blogMenu = block;

			this.blogWrap = block.parentNode;

			this.blogContainer = block.parentNode.parentNode;

			this.items = [];

			this.fixed = function fixed(e) {

				var container = this.blogContainer,
					menu = this.blogMenu,
					wrap = this.blogWrap,
					wrapPos = wrap.getBoundingClientRect(),
					containerHeight,
					menuHeight,
					fixedStart,
					fixedStop,
					fromTop = 10,
					fromBottom = 0,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;

					menuHeight = menu.offsetHeight;
					containerHeight = container.offsetHeight;
					fixedStart = scrollTop + wrapPos.top - fromTop;
					fixedStop =  fixedStart + containerHeight - (fromBottom + menuHeight + parseFloat(getComputedStyle(container).paddingTop) + parseFloat(getComputedStyle(container).paddingBottom));

				if(scrollTop < fixedStart) {
					menu.style.position = '';
					menu.style.width = '';
					menu.style.maxWidth = '';
					menu.style.right = '';
					menu.style.top = '';
				}
				if(scrollTop >= fixedStart) {
					menu.style.position = 'fixed';
					menu.style.width = '100%';
					menu.style.maxWidth = (menu.offsetWidth >= wrap.offsetWidth ? wrap.offsetWidth + 'px' : '');
					menu.style.right = 'calc(100% - ' + parseFloat(wrapPos.right) + 'px)';
					menu.style.top = (-wrapPos.top < fixedStop - fixedStart - fromTop ? fromTop : fromTop + fixedStop - scrollTop) + 'px';
				
				}

			};

			this.fixedOnDesctop = function() {

				window.addEventListener('scroll', this.fixed.bind({'blogContainer' : this.blogContainer, 'blogMenu' : this.blogMenu, 'blogWrap' : this.blogWrap}));
				window.addEventListener('resize', this.fixed.bind({'blogContainer' : this.blogContainer, 'blogMenu' : this.blogMenu, 'blogWrap' : this.blogWrap}));

			};

			this.itemsInit = function() {

				var menuItemsLinks = this.blogMenu.getElementsByClassName('blog__nav-item-lnk'),
					linkHref,
					linkId,
					blogItem,
					scrollTop = (window.pageYOffset || document.documentElement.scrollTop),
					i;

				if(menuItemsLinks.length == 0) return;

				this.items = [];

				for(i in menuItemsLinks) {

					if(typeof menuItemsLinks[i] !== 'object') continue;

					linkHref = menuItemsLinks[i].getAttribute('href');
					linkId = linkHref.match(/#(.*)/i)[1];
					blogItem = document.getElementById(linkId);
					
					if(!blogItem) continue;

					this.items.push({
						'id' : linkId,
						'top' : scrollTop + blogItem.getBoundingClientRect().top,
						'bottom' : scrollTop + blogItem.getBoundingClientRect().bottom,
					});

				}

			};

			this.checkActive = function() {

				var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
					winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
					menuItemsLinks = this.blogMenu.getElementsByClassName('blog__nav-item-lnk'),
					top = scrollTop,
					bottom = scrollTop + winHeight,
					actives = [],
					active,
					items = this.items,
					spaces = [],
					i;

				for(i in items) {
					if( (items[i].top >= top && items[i].top <= bottom) || (items[i].bottom >= top && items[i].bottom <= bottom) || (items[i].top <= top && items[i].bottom >= bottom)) {
						actives.push(items[i]);
					}
				}

				if(!actives.length) return;

				if(actives.length > 2) {
					var activesNew = [];
					console.log(actives.length);
					for(i in actives) {
						if(actives[i].bottom > bottom || actives[i].top < top) continue;
						activesNew.push(actives[i]);
					}
					actives = activesNew;

					if(actives.length > 2) {
						activesNew = [];
						for(i in actives) {
							spaces[i] = actives[i].top;
						}
						for(i in actives) {
							if(actives[i].top !== Math.min.apply(null, spaces)) continue;
							activesNew.push(actives[i]);
						}
					}

					actives = activesNew;
					console.log(actives.length);

				}

				if(actives.length == 2) {
					spaces[0] = Math.min(actives[0].bottom, bottom) - Math.max(actives[0].top, top);
					spaces[1] = Math.min(actives[1].bottom, bottom) - Math.max(actives[1].top, top);
					active = (spaces[0] > spaces[1]) ? actives[0] : (spaces[0] == spaces[1] && actives[0].top > actives[1].top) ? actives[0] : actives[1];
					active = (active === actives[0]) && (actives[0].bottom >= top && actives[1].bottom <= bottom) && (actives[1].top >= top && actives[1].top <= bottom) ? actives[1] : active;
					active = (active === actives[1]) && (actives[0].bottom >= top && actives[0].bottom <= bottom) && (actives[0].top >= top && actives[0].top <= bottom) ? actives[0] : active;
				}

				if(actives.length == 1) {
					active = actives[0];
				}

console.log(active.id);

				if(active) {
					var pattern = new RegExp('#' + active.id + '$', 'i');
					for(i in menuItemsLinks) {
						if(typeof menuItemsLinks[i] !== 'object') continue;
						menuItemsLinks[i].classList.remove('blog__nav-item-lnk_active');

						if(menuItemsLinks[i].getAttribute('href').match(pattern)) {
							menuItemsLinks[i].classList.add('blog__nav-item-lnk_active');
						}
					}
				}
			};

			this.init = function() {

				this.fixedOnDesctop();
				this.itemsInit();
				this.checkActive();	
				window.addEventListener('resize', this.itemsInit.bind(this));
				window.addEventListener('scroll', this.checkActive.bind(this));

			}
			
		};

		var menu = new BlogMenu(blockBlogMenu);
		setTimeout(menu.init(),50);
		//menu.init();

	})()
});