//--------------------//
//---FUNCTION START---//
//--------------------//
$(function() {

/************************自定义功能 START***************************/
	
	
	// carouFredSel
	
	$('.j-carousel').each(function(index, element) {
		_this = $(this);
		function detailCarouFredSel(){
			// 声明大图、缩略图容器
			var $carousel = _this.find('.j-imgBox-list'),
				$pager = _this.find('.j-pageBox-list'),
				$text = _this.find('.j-textBox'),
				pagerNum = 5; // 缩略图数量
			// 大图li列表添加样式 用于定位
			$carousel.find('li').each(function(n) {
				$(this).attr("class", "item"+n);
			});
			
			// 复制大图所有子元素到缩略图容器
			var caseCon = $carousel.children();
			caseCon.clone(true).appendTo($pager);
			
			// 获取大图li列表数量 添加对应数量事件
			var carouselImgLengh = $carousel.find( 'li' ).length;
			if(carouselImgLengh==1){
				$pager.parent('.pageBox').hide()
			}
			
			// 图片说明
			var carouselText = $carousel.find('li:first .text').html();
			$text.html(carouselText);
			
			
			var carouselHeight = 'variable'; // 大图不限高 'variable' ; 大图百分比限高 '75%' ; 大图像素值限高 375(不需要单引号)
			
			if( !isNaN(carouselHeight)){
				$carousel.find('li').css('height','100%')
			}else if(carouselHeight.indexOf('variable')>=0){
				$carousel.find('img').css('max-height','none')
			}else if(carouselHeight.indexOf('%')>=0){
				
			}
			
			// 大图 滚动事件
			$carousel.carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				items: {
					visible: 1,
					height: carouselHeight
				},
				prev: '.j-carousel-prev',
				next: '.j-carousel-next',
				scroll: {
					fx:'directscroll',
					onBefore: function( data ) {
						var itemsClass = data.items.visible.attr( 'class' );
						var itemsLengh = $pager.find('li').length;
						var itemsIndex = $pager.find('li.'+itemsClass).index()+1;
						if(itemsIndex==pagerNum){
							$pager.trigger( 'slideTo', [ 'li[class="'+ itemsClass +'"]' ,-(pagerNum-2) ] );
						}else if(itemsIndex==1){
							$pager.trigger( 'slideTo', [ 'li[class="'+ itemsClass +'"]' ,-1 ] );
						}else if(itemsIndex>pagerNum){
							$pager.trigger( 'slideTo', [ 'li[class="'+ itemsClass +'"]'  ] );
						}
						$pager.find( 'li' ).removeClass( 'selected' );
						$pager.find( 'li.'+itemsClass ).addClass( 'selected' );
						
						var itemsText = data.items.visible.find('.text').html();
						$text.html(itemsText);
						
					}
				},
				onCreate: function( data ) { 
					var itemsClass = data.items.attr( 'class' );
					$pager.find( 'li.'+itemsClass ).addClass( 'selected' );
					var itemsText = data.items.find('.text').html();
					$text.html(itemsText);
					
					$carousel.find('li').each(function(index, element) {
						var _imgCH =$(this).find('img').height(),
							_itemsCH = $(this).height();
						$(this).find('img').css({'margin-top':(_itemsCH/2)-(_imgCH/2)})
					});
					
				}
			});
			
			
			$pager.imagesLoaded(loadPager);
			
			function loadPager(){
				// 缩略图 滚动事件
				$pager.carouFredSel({
					responsive:true, // 需要自定义缩略图大小的注释这行; 根据缩略图显示数调整上面的 pagerNum 值
					auto: false,
					width: '100%',
					align: false,
					items: {
						visible: pagerNum,
						height:'75%'
					},
					onCreate: function( data ) {
					
						$pager.find('li').each(function(index, element) {
							var _imgPH =$(this).find('img').height(),
								_itemsPH = $(this).height()
							$(this).find('img').css({'margin-top':(_itemsPH/2)-(_imgPH/2)})
						});
					}
				});
				
				// 缩略图 点击事件
				$pager.find( 'li' ).click(function() {
					var itemsClass = $(this).attr( 'class' );
					if(!$(this).hasClass('selected')){
						$carousel.trigger( 'slideTo', [ 'li[class="'+ itemsClass +'"]' ] );
					}
					return false;
				});
			
			}
			
			// jquery.fancybox.js
			if($carousel.hasClass('j-fancybox')){
				$carousel.find('a').fancybox();
			}
			
		};
		
		$('.j-imgBox-list').imagesLoaded(detailCarouFredSel); //图片加载完执行
		
	});
	
	
/************************自定义功能 END***************************/

});
//--------------------//
//----FUNCTION END----//
//--------------------//

