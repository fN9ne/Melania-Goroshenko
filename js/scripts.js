function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else{
		document.querySelector('body').classList.add('no-webp');
	}
});;
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');
//Слушаем изменение размера экрана
window.addEventListener('resize', move);
//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}
//Вызываем функцию
move();
*/;
$(document).ready(function(){
	/* popup */
	$(".popup__close").click(function() {
		$(".popup").removeClass("_active");
		document.cookie = "add=1;max-age=3600";
	});
	function getCookie(name) {
		name += "=";
		beg = document.cookie.indexOf(name);
		if (beg === -1) return -1;
		else beg += name.length;
		end = document.cookie.indexOf(";", beg);
		if (end === -1) end = document.cookie.length;
		return document.cookie.substrind(start, end);
	}
	if (getCookie("add") !== "0") {
		setTimeout(() => {
			$(".popup").addClass("_active");
		}, 10000);
	}


	const global_form = $("form");
	for (let i = 0; i < global_form.length; i++) {
		let form_class = global_form.eq(i).attr("id");
		let form = $("#"+form_class);
		let form_type = global_form.eq(i).attr('data-type');
		form.on("submit", function() {
			formSend(event, $(this));
		});
		function formSend(event, form) {
			event.preventDefault();
			let error = formValidate(form);
			formData.push({"name": "type", "value": form_type});
			let formData = form.serializeArray();
			/* если всё верно */
			if (error === 0) {
				$(".popup__content").addClass("_sending");
				$.ajax({
					type: "POST",
					url: "/sendmail.php",
					data: formData,
					complete: function() {
						$(".popup__content").removeClass("_sending");
						form[0].reset();
						if (form.find('.select')) {
							let sel = form.find('.select');
							for (let i = 0; i < sel.length; i++) {
								let sel_this = sel.eq(i);
								let curr = sel_this.find('.select__current');
								let list = sel_this.find('.select__list');
								list.append(curr.find('li'));
								curr.html(curr.attr('data-ph'));
							}
						};
					},
					success: function(data) {
						formAlert("success", data);
					},
					error: function(data) {
						formAlert("error", data);
					},
				});
			}
			/* если есть ошибки */
			else {
				formAlert("error", "Дані некоректні");
			}
		};
		function formValidate(form) {
			let error = 0;
			let input_check = form.find("input, textarea");
			for (let i = 0; i < input_check.length; i++) {
				let input = input_check.eq(i);
				input.on("focus", function() { formRemoveError(input) });
				formRemoveError(input);
				if (input.attr("id") == "email") {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else {
					if (input.val() === "") {
						formAddError(input);
						error++;
					};
				};
			};
			return error;
		};
	};
	function formAlert(status, text) {
		if (status == "success") {
			$(".wrapper").append(`<div class="alert alert_success">${text}</div>`);
		}
		if (status == "error") {
			$(".wrapper").append(`<div class="alert alert_error">${text}</div>`);
		}
		setTimeout(() => {
			$(".alert").remove();
		}, 5000);
	};
	function formRemoveError(input) {
		input.closest(".input").removeClass("_error");
		input.removeClass("_error");
	};
	function formAddError(input) {
		input.closest(".input").addClass("_error");
		input.addClass("_error");
	}; 
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val());
	};
	// 
	/* forms */
	// 
	if ($('.header').length > 0) {
		let burger = $('.header__burger');
		$('.menu__item, .header__btn').click(function() {
			$('header').removeClass('_active');
			$('body').removeClass('_lock');
		});
		burger.click(function() {
			$('header').toggleClass('_active');
			$('body').toggleClass('_lock');
		});
		/* change '.welcome' top padding in dependence at header */
		let header_height;
		function calcHeaderHeight() {
			header_height = $('header').css('height');
			header_height = parseInt(header_height) + 60;
			$('.welcome').css('padding-top', header_height + "px");
		}
		function boundHeightBlock() {
			if ($(window).width() <= 992) {
				$('.welcome').css('min-height', 568);
			} else {
				if ($(window).height() <= 720) {
					$('.welcome').css('min-height', '720px');
				}
			}
		}
		$(window).on("resize load", function() {
			calcHeaderHeight();
			boundHeightBlock();
		});
	}
	if ($('.welcome').length > 0) {
		parallax($('.welcome'), $('.welcome-parallax_translate'), $('.welcome-parallax_rotate'));
	}
	if ($('.about').length > 0) {
		parallax($('.about, .consult'), $('.about-parallax_translate'), $('.about-parallax_rotate'));
	}
	if ($('.consult').length > 0) {
		parallax($('.about, .consult'), $('.consult-parallax_translate'), $('.consult-parallax_rotate'));
	}
	function parallax(elem, translate, rotate) {
		let pos = elem.offset(),
		elem_left = pos.left,
		elem_top = pos.top,
		elem_width = elem.width(),
		elem_height = elem.height(),
		x_center,
		y_center;
		if ($(window).width() >= 992) {
			elem.mousemove(function(e) {
				x_center = (elem_width / 2) - (e.pageX - elem_left);
				y_center = (elem_width / 2) - (e.pageY - elem_top);
				translate.each(function() {
					let speed = $(this).attr('data-speed'),
					xPos = Math.round(-x_center / 20 * speed),
					yPos = Math.round(y_center / 20 * speed);
					$(this).css('transform', `translate(${xPos}px, ${yPos}px)`);
				});
				if (rotate.length > 0) {
					rotate.each(function() {
						let speed = $(this).attr('data-speed'),
						xPos = Math.round(-x_center / 40 * speed),
						yPos = Math.round(y_center / 40 * speed);
						$(this).css('transform', `rotate(${xPos+yPos}deg)`);
					});
				}
			});
		}
	};
	/* smooth scroll */
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
	});
	/* courses slider */
	new Swiper('.courses__slider', {
		speed: 1000,
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 50,
				slidesPerGroup: 1,
			},
			992: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			1280: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
		},
		navigation: {
			nextEl: '.courses-next',
			prevEl: '.courses-prev',
		},
		pagination: {
			el: '.courses-pagination',
			clickable: true,
		},
	});
	/* select */
	for (let i = 0; i < $('.select').length; i++) {
		let sel = $('.select').eq(i);
		let curr = sel.find('.select__current');
		let opt = sel.find('.select__option');
		let list = sel.find('.select__list');
		let input = sel.find('input');
		curr.click(function() {
			sel.toggleClass('_active');
		});
		opt.click(function() {
			list.append(curr.find('.select__option'));
			curr.html($(this));
			input.val($(this).html());
			sel.removeClass('_active');
		});
		$(document).click(function(e) {
			if (!e.target.closest('.select')) {
				sel.removeClass('_active');
			}
		});
	}
	if ($('.order').length > 0) {
		parallax($('.order'), $('.order-parallax_translate'), $('.order-parallax_rotate'))
	}
	new Swiper('.reviews__slider', {
		speed: 500,
		navigation: {
			nextEl: '.reviews-next',
			prevEl: '.reviews-prev',
		},
		pagination: {
			el: '.reviews-pagination',
			clickable: true,
		}
	});
	$('#year').html(new Date().getFullYear());
});