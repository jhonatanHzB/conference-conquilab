(function($) {

	"use strict";

	window.conferences = undefined

	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	function loadSpeakers() {
		$.ajax('https://lurianae-congresos.com/Congresoconquilabnoviembre2022/assets/json/conference.json', {
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

	$(window).on('load', function() {
		handlePreloader()
		loadSpeakers()
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

function generateCoursesOptions(events) {
	const courses_content = $('#courses')
	events.forEach((element, index) => {
		const { hour_center, hour_tijuana, participants, pill, place, theme } = element
		courses_content.append(`<div class="event-block">
			<div class="inner-box">
				<div class="row clearfix">
					<div class="image-column col-lg-5 col-sm-12 col-md-12">
						<div class="inner-column">
							<div class="image">
							${
								participants.length > 1
									? generateCarousel(participants, pill)
									: generateNormalImage(participants[0], theme, pill)
								}
							</div>
							${
								participants.length === 1 ? `${
									theme.search('CEREMONIA') === -1 && theme.search('EXPO') === -1 && isMobile
									? `<img class="image-flag-mobile" src="assets/img/nationalities/${getFlag(participants[0].nationality)}" alt="" />`
									: ''
								}`: ''
							}
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
							${participants.map(participant => `<div class="name">${participant.name}</div>`).join('')}
							<h2><a href="javascript:void(0)">${theme}</a></h2>
							<div class="text"><span class="font-weight-bold">CURSO ${index + 1}</span> - ${place}</div>
						</div>
					</div>
				</div>
			</div>
		</div>`)
	})
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
							${theme.search('CEREMONIA') === -1 && theme.search('EXPO') === -1 && !isMobile ? `<div class="overlay-box">
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

function generateNormalImage(participant, theme, pill) {
	const { photo, nationality } = participant
	return `<img class="speaker-image" src="${photo !== '' ? `assets/img/speakers/${photo}` : 'assets/img/resources/inventor-1.jpg'}" alt="" />
	${pill !== '' ? `<div class="pill-congress p-1 text-center">${pill}</div>` : ''}
	${theme.search('CEREMONIA') === -1 && theme.search('EXPO') === -1 && !isMobile ? `<div class="overlay-box">
		<div class="overlay-inner">
			<div class="content">
				<img src="assets/img/nationalities/${getFlag(nationality)}" />
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