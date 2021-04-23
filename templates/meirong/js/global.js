$(function(){

	$('.nav_ul .nav_li').hover(function(){
		if($(this).find('.subNav a').html()){
			$(this).find('.subNav').stop(true,true).show(0);
		}
	},function(){
		$(this).find('.subNav').stop(true,true).hide(0);
	});

	$('.mLent .a_04').hover(function(){
		$(this).find('img').show(200);
	},function(){
		$(this).find('img').hide(200);
	});

	$(".m-leftmenu li").hover(function(){
		if(!$(this).hasClass("current")){
			$(this).addClass("current").find("ul").stop(true,false).slideToggle(300)
			$(this).siblings("li").find("ul").stop(true,true).slideUp(300);
			$(this).siblings().removeClass("current");
		}
	});
	$('.j-li-hover li').hover(function(){
		$(this).addClass('hover');
		}).mouseleave(function(){
		$(this).removeClass('hover');
	});

	$('.search-content li:last').css({
		border:'0px'
	});


	winwidth();	

	$(window).resize(function(){
		winwidth();
	});
	function winwidth(){
		var winwidht=$(window).width()>1000?$(window).width():1000;
		$(".header,.m-focus-d,.footer").css({"width":winwidht});
	}

	$(".Y_jHover li").hover(function () {
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
});

/*搜索框*/
$(document).ready(function(){
	$("TEXTAREA,input[focucmsg]") .each (function(){
		$(this).val($(this).attr("focucmsg"));
		$(this).val($(this).attr("focucmsg")).css("color","#783d90");
		$(this).focus(function(){
			if($(this).val() == $(this).attr("focucmsg")){
				$(this).val('');
				$(this).val('').css("color","#783d90");
			}
		});
		$(this).blur(function(){
			if(!$(this).val()){
				$(this).val($(this).attr("focucmsg"));
				$(this).val($(this).attr("focucmsg")).css("color","#783d90");
			}
		});
	});
});