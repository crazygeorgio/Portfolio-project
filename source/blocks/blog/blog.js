document.addEventListener('DOMContentLoaded', function() {
	(function(){

		var blockBlogMenu = document.getElementsByClassName('blog__nav-list')[0];
		
		if(!blockBlogMenu) return;


		var BlogMenu = function(block) {

			this.blogMenu = block;

			this.blogWrap = block.parentNode;

			this.blogContainer = block.parentNode.parentNode;

			this.fixed = function fixed(e) {

				var container = this.blogContainer,
					menu = this.blogMenu,
					wrap = this.blogWrap,
					wrapPos = wrap.getBoundingClientRect(),
					containerHeight,
					menuHeight,
					fixedStart,
					fixedStop,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;

					menuHeight = menu.offsetHeight;
					containerHeight = container.offsetHeight;
					fixedStart = scrollTop + wrapPos.top;
					fixedStop =  fixedStart + containerHeight - (menuHeight + parseFloat(getComputedStyle(container).paddingTop) + parseFloat(getComputedStyle(container).paddingBottom));

				if(scrollTop < fixedStart) {
					menu.classList.remove('blog__nav-list_fixed');
				}

				if(scrollTop >= fixedStart) {
					menu.classList.remove(-wrapPos.top < fixedStop - fixedStart ? 'blog__nav-list_in-bottom' : 'blog__nav-list_fixed');
					menu.classList.add(-wrapPos.top < fixedStop - fixedStart ? 'blog__nav-list_fixed' : 'blog__nav-list_in-bottom');	
				} 

			};

			this.checkActive = function() {

				var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
					menuItemsLinks = this.blogMenu.getElementsByClassName('blog__nav-item-lnk'),
					blogItemId,
					blogItem,
					activeId,
					minTop,
					currentTop,
					i;

				if(menuItemsLinks.length == 0) return;

				for(i in menuItemsLinks) {

					if(typeof menuItemsLinks[i] !== 'object') continue;

					blogItemId = menuItemsLinks[i].getAttribute('href').match(/#(.*)/i)[1];
					blogItem = document.getElementById(blogItemId);
					
					if(!blogItem) continue;

					currentTop = Math.abs(blogItem.getBoundingClientRect().top);

					if(typeof minTop === 'undefined') {
						minTop = currentTop;
						activeId = blogItemId;
						continue;
					} 

					if(currentTop < minTop) {
						minTop = currentTop;
						activeId = blogItemId;
					}

				}	

				if(activeId) {
					var pattern = new RegExp('#' + activeId + '$', 'i');
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

				window.addEventListener('scroll', this.fixed.bind({'blogContainer' : this.blogContainer, 'blogMenu' : this.blogMenu, 'blogWrap' : this.blogWrap}));
				this.checkActive();	
				window.addEventListener('scroll', this.checkActive.bind({'blogMenu' : this.blogMenu}));

			}
			
		};

		var menu = new BlogMenu(blockBlogMenu);
		menu.init()

	})()
});