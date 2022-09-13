(function($) {

	"use strict";

	window.conferences = undefined

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	function counterDisplay() {
		let countDownDate = new Date('Sep 25, 2022 16:37:52').getTime()

    const myfunc = setInterval(() => {
      let now = new Date().getTime()
      let timeleft = countDownDate - now
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000)
      document.getElementById('days').innerHTML = days
      document.getElementById('hours').innerHTML = hours
      document.getElementById('mins').innerHTML = minutes
      document.getElementById('secs').innerHTML = seconds
    }, 1000)
	}

	function loadSelects() {
		$.ajax('https://jhonatanhzb.github.io/conference-conquilab/assets/json/conference.json', {
			dataType: 'json',
			timeout: 500,
			success: function (data) {
				localStorage.setItem('conferences', JSON.stringify(data))
				window.conferences = data
				for (const days in data) {
					$('#inputDay').append(`<option value="${days}">${days.replaceAll('_', ' ')}</option>`)
				}
			},
			error: function (jqXhr, textStatus, errorMessage) {
				console.log(jqXhr, textStatus, errorMessage)
			}
		});
	}

	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			if (windowpos >= 1) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
		}
	}

	headerStyle();


	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});

		//Disable dropdown parent link
		//$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			//e.preventDefault();
		//});
	}


	//Mobile Nav Hide Show
	if($('.mobile-menu').length){

		var mobileMenuContent = $('.main-header .nav-outer .main-menu .navigation').html();
		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);
		$('.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

	}


	//Search Popup
	if($('#search-popup').length){

		//Show Popup
		$('.search-box-btn').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});
		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
	            $('#search-popup').removeClass('popup-visible');
	        }
	    });
		//Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}


	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-4').length){
		var scene = $('.parallax-scene-4').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-5').length){
		var scene = $('.parallax-scene-5').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-6').length){
		var scene = $('.parallax-scene-6').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-7').length){
		var scene = $('.parallax-scene-7').get(0);
		var parallaxInstance = new Parallax(scene);
	}



	// Main Slider Carousel
	if ($('.slider-carousel').length) {
		var swiper = new Swiper('.slider-carousel', {
			//animateOut: 'slideInDown',
    		//animateIn: 'slideIn',
			pagination: {
			el: '.swiper-pagination',
			//type: 'progressbar',
			},
			navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  },
		});
	}


	//Banner Carousel
	if ($('.gallery-thumbs').length) {
		var galleryThumbs = new Swiper('.gallery-thumbs', {
			spaceBetween: 0,
				slidesPerView: 3,
					loop: true,
					freeMode: true,
					loopedSlides: 5, //looped slides should be the same
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
				});
				var galleryTop = new Swiper('.slider-content', {
					spaceBetween: 10,
					loop:true,
					loopedSlides: 5, //looped slides should be the same
					navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				thumbs: {
				swiper: galleryThumbs,
			},
		});
	}


	// Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: 4000,
			autoHeight: false,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				}
			}
		});
	}


	// Testimonial Carousel
	if ($('.testimonial-carousel').length) {
		$('.testimonial-carousel').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 700,
			autoplay: 4000,
			autoHeight: false,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:3
				}
			}
		});
	}

	// Testimonial Carousel
	if ($('.testimonial-carousel-two').length) {
		$('.testimonial-carousel-two').owlCarousel({
			loop:true,
			items:1,
			margin:40,
			nav:true,
			smartSpeed: 700,
			autoplay: 4000,
			autoHeight: false,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ]
		});
	}


	// Gallery Carousel
	if ($('.gallery-carousel').length) {
		$('.gallery-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: 4000,
			autoHeight: false,
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow-1"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:4
				}
			}
		});
	}



	// Speaker Carousel
	if ($('.speaker-carousel').length) {
		$('.speaker-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 4000,
			autoHeight: false,
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow-1"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:4
				}
			}
		});
	}



	// Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:false,
			smartSpeed: 500,
			autoplay: true,
			navText: [ '<span class="flaticon-back-7"></span>', '<span class="flaticon-right-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				768:{
					items:3
				},
				1024:{
					items:5
				}
			}
		});
	}


	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){

			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);

			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}

		},{accY: 0});
	}



	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}

			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}


	//Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}


	//Progress Bar
	if($('.progress-line').length){
		$('.progress-line').appear(function(){
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width',percent+'%');
		},{accY: 0});
	}


	if($('.ts-image-popup').length){
		$('.ts-image-popup').magnificPopup({
			type: 'inline',
			closeOnContentClick: false,
			midClick: true,
			callbacks: {
			beforeOpen: function () {
				this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			zoom: {
				enabled: true,
				duration: 500, // don't foget to change the duration also in CSS
			},
			mainClass: 'mfp-fade',
		});
	}


	if($('.paroller').length){
		$('.paroller').paroller({
			  factor: 0.2,            // multiplier for scrolling speed and offset, +- values for direction control
			  factorLg: 0.4,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control
			  type: 'foreground',     // background, foreground
			  direction: 'horizontal' // vertical, horizontal
		});
	}



	//Progress Bar
	if($('.progress-line').length){
		$('.progress-line').appear(function(){
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width',percent+'%');
		},{accY: 0});
	}



	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}


	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				phone: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}


	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);

		});
	}


	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

	$(window).on('scroll', function() {
		headerStyle();
	});

/* ==========================================================================
   When document is loading, do
   ========================================================================== */

	$(window).on('load', function() {
		handlePreloader()
		counterDisplay()
		loadSelects()
		//sortableMasonry();
	});

})(window.jQuery);

var isMobile = false
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobile = true
}

function tabs() {
		if($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				$('#default-content').hide()
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
}

function changeDay(day) {
	const events = window.conferences[day.value]
	$('#tabs-content').html('')
	$('#default-content').hide()
	$('#courses').hide()
	const [dayString, dayNumber, , monthString] = day.value.split('_')
	$('#tabs-rooms').html('')
	for (const room in events) {
		if (room !== 'default' && room !== 'courses') {
			$('#tabs-rooms').append(`<li data-tab="#${room}" class="tab-btn">${room.replace('_', ' ')} <span>${dayString} - ${monthString} ${dayNumber}, 2022</span></li>`)
			generateContentTabs(events, room)
		} else if (room === 'default') {
			$('#default-content').show()
			generateDefaultsOptions(events.default)
		} else if (room === 'courses') {
			$('#courses').show()
			generateCoursesOptions(events.courses)
		}
	}
	tabs()
}

function generateContentTabs(events, room) {
	const tabs_content = $('#tabs-content')
	tabs_content.append(`<div class="tab" id="${room}"></div>`)
	events[room].forEach(element => {
		$(`#${room}`).append(`${templateContent(element)}`)
	})
}

function generateDefaultsOptions(events) {
	const tabs_content = $('#default-content')
	tabs_content.html('')
	events.forEach(element => {
		tabs_content.append(templateContent(element))
	})
}

function generateCoursesOptions(events) {
	const courses_content = $('#courses')
	events.forEach((element, index) => {
		const { hour_center, hour_tijuana, participants, photo, pill, place, theme } = element
		courses_content.append(`<div class="event-block">
			<div class="inner-box">
				<div class="row clearfix">
					<div class="image-column col-lg-5 col-sm-12 col-md-12">
						<div class="inner-column">
							<div class="image">
							${
								participants.length > 1
									? generateCarousel(participants, pill)
									: generateNormalImage(photo, pill)
								}
							</div>
							<div class="event-time">
								<small class="text-muted">Hora Local Tijuana</small><br> ${hour_tijuana} <br>
								${ hour_center !== ''
									? `<small class="text-muted">Hora Local Centro</small><br> ${hour_center}`
									: ''
								}
							</div>
						</div>
					</div>
					<div class="info-column col-lg-7 col-sm-12 col-md-12 px-md-5">
						<div class="inner-column">
							${participants.map(participant => {
								return `<div class="name">
									${participant.name}
									${participant.nationality !== '' ? `<i class="${participant.nationality} flag ml-2"></i>` : ''}
								</div>`
							}).join('')}
							<h2><a href="javascript:void(0)">${theme}</a></h2>
							<div class="text"><span class="font-weight-bold">CURSO ${index + 1}</span> - ${place}</div>
						</div>
					</div>
				</div>
			</div>
		</div>`)
	})
}

function getFlag(nationality) {
	const flags = {
		ca: 'canada.png',
		us: 'estados-unidos.png',
		cn: 'china.png',
		es: 'espana.png',
		br: 'brasil.png',
		ar: 'argentina.png'
	}
	return flags[nationality] ?? 'mexico.png'
}

function templateContent(event) {
	const { grade, hour_center, hour_tijuana, name, nationality, photo, pill, simposium, theme } = event
	return `${simposium !== '' ? `<p class="text-center h3 my-2 text-warning" style="background: blanchedalmond">${simposium}</p>` : ''}
	<div class="event-block">
		<div class="inner-box">
			<div class="row clearfix">
				<div class="image-column col-lg-5 col-sm-12 col-md-12">
					<div class="inner-column">
						<div class="image">
							<img class="speaker-image" src="${photo !== '' ? `assets/img/speakers/${photo}` : 'assets/img/resources/inventor-1.jpg'}" alt="" />
							${pill !== '' ? `<div class="pill-congress p-1 text-center">${pill}</div>` : ''}
							${!isMobile ? `<div class="overlay-box">
								<div class="overlay-inner">
									<div class="content">
										<img src="assets/img/nationalities/${getFlag(nationality)}" />
									</div>
								</div>
							</div>` : ''}
						</div>
						${
							theme.search('CEREMONIA') === -1 && theme.search('EXPO') === -1 && isMobile
							? `<img class="image-flag-mobile" src="assets/img/nationalities/${getFlag(nationality)}" alt="" />`
							: ''
						}
						<div class="event-time">
							<small class="text-muted">HORA LOCAL DE TIJUANA</small><br> ${hour_tijuana} <br>
							<small class="text-muted">HORA CENTRO DE MÉXICO</small><br> ${hour_center}
						</div>
					</div>
				</div>
				<div class="info-column col-lg-7 col-sm-12 col-md-12 px-md-5">
					<div class="inner-column">
						<div class="name">${name}</div>
						<h2><a href="javascript:void(0)">${theme}</a></h2>
						<div class="text">${grade}</div>
					</div>
				</div>
			</div>
		</div>
	</div>`
}

function generateNormalImage(photo, pill) {
	return `<img class="speaker-image" src="${photo !== '' ? `assets/img/speakers/${photo}` : 'assets/img/resources/inventor-1.jpg'}" alt="" />
	${pill !== '' ? `<div class="pill-congress p-1 text-center">${pill}</div>` : ''}
	${!isMobile ? `<div class="overlay-box">
		<div class="overlay-inner">
			<div class="content">
				<img src="assets/img/nationalities/${getFlag('')}" />
			</div>
		</div>
	</div>` : ''}`
}

function generateCarousel(speakers, pill) {
	const randomId = Math.floor(Math.random() * (1000 + 1))
	return `<div id="${`carousel${randomId}`}" class="carousel slide" data-ride="carousel">
		<div class="carousel-inner">
			${speakers.map((speaker, index) => {
				return `<div class="carousel-item ${ index === 0 ? 'active' : ''}">
				<img class="d-block w-100 image-carousel" src="assets/img/speakers/${speaker.photo}" alt="${speaker.name}">
				${pill !== '' ? `<div class="pill-congress p-1 text-center">${pill}</div>` : ''}
			</div>`
			}).join('')}
		</div>
		<a class="carousel-control-prev" href="#${`carousel${randomId}`}" role="button" data-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="carousel-control-next" href="#${`carousel${randomId}`}" role="button" data-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>`
}