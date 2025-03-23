/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	if (document.querySelector('.rs-slider-block__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider-block');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-slider-block__slider');

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-slider-block__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-slider-block__button-next');
				const pagination = sliderBlock.querySelector('.rs-slider-block__pagination');

				const swiperMain = new Swiper(slider, {
					// // Автопрокрутка
					// autoplay: {
					// 	// Пауза между прокруткой
					// 	delay: 10000,
					// 	// Закончить на последнем слайде
					// 	stopOnLastSlide: false,
					// 	// Отключить после ручного переключения
					// 	disableOnInteraction: false,
					// },

					// Обновить свайпер
					// при изменении элементов слайдера
					observer: true,
					// при изменении родительских элементов слайдера
					observeParents: true,
					// при изменении дочерних элементов слайдера
					observeSlideChildren: true,

					// Скорость смены слайдов
					speed: 800,

					// Включение/отключение
					// перетаскивание на ПК
					simulateTouch: true,
					allowTouchMove: true,
					// Чувствительность свайпа
					touchRadio: 1,
					// Угол срабатывания свайпа/перетаскивания
					touchAngle: 45,
					touchStartPreventDefault: false,

					// Цикличность слайдера
					// loop: true,

					// Анимация переключения
					// effect: 'fade',

					// Курсор перетаскивания
					grabCursor: true,

					// Стрелки
					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					// Пагинация
					pagination: {
						el: pagination,
						clickable: true,
					},

					breakpoints: {
						320: {
							slidesPerView: 1.1,
							spaceBetween: 20,
						},
						539.98: {
							slidesPerView: 1.5,
							spaceBetween: 20,
						},
						767.98: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						991.98: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
						1439.98: {
							slidesPerView: 2.393,
							spaceBetween: 30,
						}
					}
				});
			});

		});
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	if (document.querySelector('.swiper')) {
		initSliders();
	}
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});