$(document).ready(function(){
			var stickyNavTop=$('.nav-menu').offset().top;
			var stickyNav=function(){
				var scrollTop=$(window).scrollTop();
				if(scrollTop>stickyNavTop){
					$('.nav-menu').addClass('sticky')
				} else {$('.nav-menu').removeClass('sticky')}
			};
			stickyNav();
			$(window).scroll(function(){
				stickyNav()
			})
		});
