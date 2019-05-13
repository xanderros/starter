$(document).ready(function() {

	/* Show fixed-positioned header and change its view when we scroll page down */
	$(window).on('scroll', isScrolled);

	function isScrolled() {

		var $body = $('body');
		var top = $(this).scrollTop();

		if ( top > 90 ) {
			$body.addClass('page-scrolled');
		} else {
			$body.removeClass('page-scrolled');
		}
	}

	isScrolled();

	// mobile navigation open/close
	$(document).on('click', '.nav-btn', navToggle);

	function navToggle(e) {
		e.preventDefault();

		var $body = $('body');

		if ($body.hasClass('nav-opened')) {
			$body.removeClass('nav-opened');
		}
		else {
			$body.addClass('nav-opened');
		}
	}

	// memories slider
	var $sliderMemories = $('.carousel_memories .carousel__item');

	if ($sliderMemories.length) {
		$sliderMemories.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			arrows: false,
			dots: true,
			speed: 1000,
			fade: true
		})
	}

	// lifetime slider (contain two sync sliders - first for years navigation, second - for photos)
	var $sliderLifetime = $('.carousel_lifetime .carousel__item');
	var $sliderPhotos = $('.carousel_photos .carousel__item');

	if ($sliderLifetime.length) {
		$sliderLifetime.slick({
			slidesToShow: 18,
			slidesToScroll: 5,
			dots: false,
			arrows: false,
			infinite: false,
			speed: 1000,
			asNavFor: $sliderPhotos,
			centerMode: true,
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 12,
						slidesToScroll: 5
					}
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 8,
						slidesToScroll: 5
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 3
					}
				}
			]
		})
	}
	if ($sliderPhotos.length) {
		$sliderPhotos.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			infinite: false,
			centerMode: false,
			asNavFor: $sliderLifetime,
			responsive: [
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 420,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		})
	}

	// Popup
	$(document).on('click', '*[data-popup]', popupShow);
	$(document).on('click', '.popup__close, .popup_show', popupClose);

	// Popup show
	function popupShow(event) {

		event.preventDefault();

		var $popup = $('#' + $(this).data('popup'));

		$popup.addClass('popup_show');

		$('body').addClass('overlayed');

		return false;
	}

	// popup close on click
	function popupCheckCount() {
		if (($('.popup_show').length) < 1) {
			$('body').removeClass('overlayed');
		}
	}

	function popupClose(e) {

		if ($(this).is('.popup__close')) {
			var $popup = $(this).closest('.popup_show');

			$popup.removeClass('popup_show');

			popupCheckCount();

		} else if ($(this).is('.popup_show')) {
			var $popup = $(this),
					$popupBox = $popup.find('.popup__box');

			if ($popupBox.has(e.target).length === 0) {

				$popup.removeClass('popup_show');

				popupCheckCount();
			}
		}
	}

	// SharePay
	$(document).on('mouseover', '.pay .price', sharepay);

	function sharepay() {
		var paySiblings = $(this).closest('.grid__cell').siblings('.grid__cell').find('.price');

		var priceYou = $(this).attr('data-pay-you');
		var priceBrother = $(this).attr('data-pay-brother');
		var priceSister = $(this).attr('data-pay-sister');
		var priceCousin = $(this).attr('data-pay-cousin');

		var thisPrice = $(this).find('.price__value').text();

		$('#pay-you').find('.price__value').text(priceYou);
		$('#pay-brother').find('.price__value').text(priceBrother);
		$('#pay-sister').find('.price__value').text(priceSister);
		$('#pay-cousin').find('.price__value').text(priceCousin);

		$('.total .price__value').text(thisPrice);

		if (!$(this).hasClass('price_active')) {
			$(this).addClass('price_active');
			paySiblings.removeClass('price_active');
		}
	}

});