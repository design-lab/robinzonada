$(function() {
	$('.program__calendar').on('click', function() {
		var clicks = $(this).data('clicks');
		if (!clicks) {
			$(this).attr('data-status', 'active');
		} else {
			$(this).attr('data-status', 'isactive');
		}
		$(this).data("clicks", !clicks);
	});

	$('.calendar-dropdown .pc-open').on('click', function(e) {
		e.stopPropagation();

		var data,
			price;
		var itemBlock = $(this).parent();

		data = $(this).find('.pc-data span').text();
		price = $(this).find('.pc-price .price').text();

		itemBlock.parents('.program__calendar').find('.program__calendar__field .data').text(data).parent().find('input').val(data);
		itemBlock.parents('.program__calendar').find('.program__calendar__field .price').text(price).parent().find('input').val(price);
		itemBlock.find('.pc-open').attr('data-status', 'isactive');
		$(this).attr('data-status', 'active');
		itemBlock.parents('.program__calendar').attr('data-status', 'isactive');
	});
});
$(function() {
	$('.drop-menu').on('click', function() {
		if(!$(this).hasClass('drop-menu__open')) {
			$(this).find('.drop-menu-dropdown').slideDown(400);
			$(this).addClass('drop-menu__open');
		} else {
			$(this).find('.drop-menu-dropdown').slideUp(400);
			$(this).removeClass('drop-menu__open');
		}
	});

	$(document).mouseup(function (e){
		var container = $('.drop-menu');

		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$('.drop-menu').find('.drop-menu-dropdown').slideUp(400);
			$('.drop-menu').removeClass('drop-menu__open');
		}
	});
});

$(function() {
	$('.js--infobox').fadeOut(0);

	$('.js--infobox-link').on('click', function() {
		if(!$(this).hasClass('active')) {
			closeInfobox();
			$(this).addClass('active');
			$(this).parents('.js--infobox-parent').find('.js--infobox').fadeIn(500);
		}
	});

	$('.js--infobox-close').on('click', function() {
		closeInfobox();
	});

	$(document).mouseup(function (e) {
		var container = $(".js--infobox");
		if (container.has(e.target).length === 0){
			closeInfobox();
		}
	});

	function closeInfobox() {
		$('.js--infobox-link').removeClass('active');
		$('.js--infobox').fadeOut(500);
	}
});
$(function() {
	var wrapLoad = $('main .container > *, header, body > nav, footer');

	wrapLoad.css('opacity', '0');
	
	svg4everybody();

	$('.js--datepicker').datepicker({
		minDate: new Date(),
		dateFormat : 'dd.mm.yy',
		autoClose : true
	});
	$('.js--datepicker').data('datepicker');



	$('.js--datepicker').mask('00.00.00');

	$('.js--read-more').on('click', function () {
		var clicks = $(this).data('clicks');
		var block = $(this).parents().find('.js--read-block');

		if (!clicks) {
			block.addClass('js--read-it');
			block.find('.bg-grad').animate({'opacity' : '0'}, 500);
			$(this).text('Свернуть отзыв');
		} else {
			block.removeClass('js--read-it');
			$(this).text('Читать отзыв полностью');
			block.find('.bg-grad').animate({'opacity' : '1'}, 500);
		}

		$(this).data("clicks", !clicks);

		return false;
	});

	$('.block-tour__seasons li').on('click', function() {
		$('.block-tour__seasons li').removeClass('active');
		$('.block-tour__seasons li input').attr('checked', false);
		$(this).addClass('active');
		$('.block-tour__seasons li.active input').attr('checked', true);
	});

	$('.mobile-search svg').on('click', function() {
		var clicks = $(this).data('clicks');
		var blockSearch = $(this).parents('.mobile-search');

		if (!clicks) {
			blockSearch.addClass('open');
			//blockSearch.find('input').focus();
		} else {
			blockSearch.removeClass('open');
		}
		$(this).data("clicks", !clicks);
		return false
	});

	$('.js--top-menu li').hover(
		function() {
			$(this).find('.js--submenu').addClass('active');
		}, function() {
			$('.js--top-menu li').removeClass('active');
			$('.js--top-menu .js--submenu').removeClass('active');
	});

	$('.js--submenu li').hover(
		function() {
			$(this).parents('a').addClass('active');
		}, function() {
			$(this).parents('a').removeClass('active');
		}
	);

	$('.top-menu .search-field input').on('focus', function() {
		$(this).parent().addClass('active');
	});

	$('.top-menu .search-field input').on('blur', function() {
		$(this).parent().removeClass('active');
	});

	$(window).on('load', function() {
		var time = 200;

		for (var i = 0; i < wrapLoad.length; i++) {
			wrapLoad.eq(i).animate({'opacity' : '1'}, time = time + 200);
		}
	});

	$(window).on('load resize', function() {
		$('select').select2({
			minimumResultsForSearch: -1
		});
	});
});

$(function() {
  $(window).on('load', function() {
    var coords = {lat: 57.7343, lng: 33.0924};
    var map = new google.maps.Map(document.getElementById('map-road'), {
      zoom: 4,
      center: coords
    });

    var contentString = '<div>Пансионат "Русь"</div>'

    var infowindow = new google.maps.InfoWindow({
     content: contentString
   });
    var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: 'Пансионат "Русь"'
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    $('.js--tabs').on('click', function() {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(coords);
    });
  });
});

$(function() {
	$('.js--grid').masonry({
		itemSelector: '.js--grid-item',
		columnWidth: 1,
		originLeft: true,
		originTop: true
	});
});
$(function() {

	var mobMenuWrap = $('#modal--mob-menu__wrap');
	var right = 0;

	for (var i = 0; i < $('#modal--mob-menu ul li').length; i++) {
		var item = $('#modal--mob-menu ul li').eq(i);

		if (item.children().length >= 2) {
			var start = item.children('a').html();
			item.children('a').html(start + '<svg><use xlink:href="dist/img/sprite/sprite.svg#rz-icons-subs-arrow"></use></svg>');
		}
	}


	$('#modal--mob-menu a').on('click', function() {

		if ($(this).parent().children().length >= 2) {
			right++;
			$(this).parent().children('ul').addClass('active');
			$('.mobile-back').removeClass('active-close');
			$('.mobile-back').addClass('active');
			
			mobMenuWrap.css('right', right*100 + '%');
			return false;
		}
	})

	$('.js--mmenu-back').on('click', function() {
		right --;
		mobMenuWrap.css('right', right*100 + '%');
		
		setTimeout(function() {
			$('#modal--mob-menu ul:nth-child(' + right+2 + ')').removeClass('active');
		}, 500);
		
		if (right < 1) {
			$('.mobile-back').addClass('active-close');
			$('.mobile-back').removeClass('active');
		}

		return false;
	});

	$('.js--mmenu-close').on('click', function() {
		$('#modal--mob-menu').removeClass('active');
		$('.mobile-back').removeClass('active');
		$('.mobile-back').removeClass('active-close');
		right = 0;
		mobMenuWrap.css('right', right*100 + '%');
		return false;
	});

	$('#modal--mob-menu').on('click', function() {
		$('#modal--mob-menu').removeClass('active');
		$('.mobile-back').removeClass('active');
		$('.mobile-back').removeClass('active-close');
		right = 0;
		mobMenuWrap.css('right', right*100 + '%');
	});

	$('.mob-menu').on('click', function() {
		$('.mobile-back').addClass('active-close');
		$('#modal--mob-menu').addClass('active');
	});

});
$(function() {
	$('.js--modal-link').on('click', function() {
		var modalWindow = $(this).attr('data-modal');
	});
});
$(function() {
	
	var range = document.getElementById('range');

	if (range) {

		noUiSlider.create(range, {
			start: [7], // Handle start position
			step: 1, // Slider moves in increments of '10'
			connect: 'lower', // Display a colored bar between the handles
			orientation: 'horizontal',
			direction: 'ltr', // Put '0' at the bottom of the slider
			behaviour: 'tap-drag', // Move handle on tap, bar is draggable
			range: { // Slider can select '0' to '100'
				'min': 7,
				'max': 17
			},
			pips: { // Show a scale with the slider
				mode: 'steps',
				density: 2
			}
		});

			var hamItem = document.getElementsByClassName('noUi-handle');
			var mc = new Hammer(hamItem[0]);


			var inputRange = document.querySelector('#range input');

			mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

			mc.on("panleft panright tap press", function(ev) {
				var age = range.noUiSlider.get();
				var textField = document.getElementsByClassName('block-tour__range__age');
				inputRange.value = age;
				textField[0].innerHTML = (age - (age%1)) + ' лет';
			});

	}
});





var numberItem = $('.slider__pagination li.active').index();

$(function() {

	var hamItem = document.getElementsByClassName('slider');

	if (hamItem[0]) {
		var mc = new Hammer(hamItem[0]);
	}


	$('.slider__img').each( function() {
		var urlImg = $(this).find('img').attr('src');
		$(this).css({'background-image' : 'url(' + urlImg + ')'});
		$(this).find('img').addClass('hidden');
	});

	$('.slider').slick({
		arrows : false,
		dots : true
	});

	$('.slider-programm__img').slick({
		arrows : true,
		dots : true,
		customPaging : function(slider, i) {
			var thumb = $(slider.$slides[i])[0].src;
			return '<a><img src="'+thumb+'"></a>';
		}
	});

	var offsetPageInfo = $('.page-info').css('margin-top');

	$(document).on('click', '.js--slider-more', function() {
		var slider = $(this).parents('.slider-programm');
		slider.find('.slider-loader').removeClass('hidden');
		slider.find('.slider-programm__wrap').addClass('slider-zoomed').animate({'margin-right': '-' + $('.page-info').outerWidth()}, 500);
		$(this).removeClass('js--slider-more').addClass('js--slider-less');
		slider.find('.slider-programm__navigation').addClass('hidden');
		$('.page-info').animate({'margin-top': slider.outerHeight(true) + 50}, 200);
		setTimeout(function() {
			slider.find('.slider-programm__img').slick('slickRemove');
			slider.find('.slider-loader').addClass('hidden');
			$('.page-info').animate({'margin-top': slider.outerHeight(true) + 50}, 200);
			setButtons(slider);
		}, 500);
	});

	$(document).on('click', '.js--slider-less', function() {
		var slider = $(this).parents('.slider-programm');
		slider.find('.slider-loader').removeClass('hidden');
		slider.find('.slider-programm__wrap').removeClass('slider-zoomed').animate({'margin-right': 0}, 200);
		$('.page-info').animate({'margin-top': offsetPageInfo}, 500);
		$(this).removeClass('js--slider-less').addClass('js--slider-more');
		slider.find('.slider-programm__navigation').removeClass('hidden');
		$('.js--slider-navigation_less').removeClass('js--slider-navigation_less slider-programm__navigation_back').addClass('js--slider-navigation');
		$('.js--slider-navigation_less').find('.slider-programm__navigation__tx').text('ещё');
		setTimeout(function() {
			slider.find('.slider-programm__img').slick('slickRemove');
			slider.find('.slider-loader').addClass('hidden');
			setButtons(slider);
		}, 500);
	});

	$(document).on('click', '.js--slider-navigation', function() {
		var heightWrap = $('.slick-dots li').outerHeight(true) * Math.ceil($('.slick-dots li').length/7);
		$('.slider-programm  .slick-dots').animate({height : heightWrap + 'px'}, 500);
		$(this).removeClass('js--slider-navigation').addClass('js--slider-navigation_less slider-programm__navigation_back');
		$(this).find('.slider-programm__navigation__tx').text('скрыть');
	});

	$(document).on('click', '.js--slider-navigation_less', function() {
		$('.slider-programm  .slick-dots').animate({height : '124px'}, 500);
		$(this).removeClass('js--slider-navigation_less slider-programm__navigation_back').addClass('js--slider-navigation');
		$(this).find('.slider-programm__navigation__tx').text('ещё');
	});
});

function setButtons(slider) {
	var sliderHeight = slider.find('.slick-list').outerHeight(),
		arrowHeight = slider.find('.slick-arrow').outerHeight();

	slider.find('.slick-prev').css('top', sliderHeight/2 + arrowHeight);
	slider.find('.slick-next').css('top', sliderHeight/2 - arrowHeight);
	slider.find('.slider-programm__zoom').css('top', sliderHeight - arrowHeight - 20);
}

$(function() {
	$('.js--tabs').on('click', function() {
		var id = $(this).attr('href');
		var offsetPageInfo = $('.page-info').css('margin-top');

		$('.js--tabs').parent().removeClass('active');
		$(this).parent().addClass('active');
		$('.js--tab-content').removeClass('active').addClass('hidden');
		$(id).addClass('active').removeClass('hidden');
		$('.slider-programm__img').slick('slickRemove');
		var slider = $(id).find('.slider-programm');
		setButtons(slider);

		if ($(id).find('.slider-programm__wrap').hasClass('slider-zoomed')) {
			$('.page-info').animate({'margin-top': slider.outerHeight(true) + 50}, 200);
		} else {
			$('.page-info').animate({'margin-top':offsetPageInfo + 'px'}, 50);
		}
		return false;
	});

	$(window).on('load', function() {
		var id ='#' + window.location.href.split("#")[1];
		if(window.location.href.split("#")[1] === undefined) {
			id = $('.js--tabs').eq(0).attr('href')
		}

		$('.js--tabs').parent().removeClass('active');
		$('.js--tabs[href="'+ id + '"]').parent().addClass('active');
		$('.js--tab-content').removeClass('active').addClass('hidden');
		$(id).addClass('active').removeClass('hidden');
		$('.slider-programm__img').slick('slickRemove');
	});
});

$(function() {

	$('.tour').on('click', function() {
		if(!$(this).hasClass('inactive')) {
			$('.tour').removeClass('active');
			$('.tour .tour__period__date input').prop('checked', false);
			$(this).addClass('active');
			$(this).find('.tour__period__date input').prop('checked', true);
		}
	});

	$('.tour__other input').on('click', function() {
		var costDiv = $(this).parents('.tour').find('.tour__services__price__cost');
		var cost = costDiv.text();
		cost = parseInt(cost.replace(/\s/g, ''));

		var price = $(this).parent().find('.tour-tx').text();;
		price = parseInt(price.replace(/\s/g, ''));


		if ($(this)[0].checked) {
			cost = cost + price;
		} else {
			cost = cost - price;
		}

		cost = cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		costDiv.text(cost);
	});
});