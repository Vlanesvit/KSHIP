/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	if (document.querySelector('.rs-slider-block__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider-block');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-slider-block__slider');
			const isServicesBlock = sliderBlock.classList.contains('rs-services');

			const textSvgGroups = isServicesBlock
				? Array.from(sliderBlock.querySelectorAll('.rs-slider-block__text svg g'))
				: [];

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-slider-block__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-slider-block__button-next');
				const pagination = sliderBlock.querySelector('.rs-slider-block__pagination');

				const swiperMain = new Swiper(slider, {
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					speed: 800,
					simulateTouch: true,
					allowTouchMove: true,
					touchRadio: 1,
					touchAngle: 45,
					touchStartPreventDefault: false,
					grabCursor: true,

					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					pagination: {
						el: pagination,
						clickable: true,
					},

					breakpoints: {
						320: {
							slidesPerView: 1.1,
							spaceBetween: 20,
							...(isServicesBlock && { slidesPerGroup: 1 }),
						},
						539.98: {
							slidesPerView: 1.5,
							spaceBetween: 20,
							...(isServicesBlock && { slidesPerGroup: 1 }),
						},
						767.98: {
							slidesPerView: 2,
							spaceBetween: 20,
							...(isServicesBlock && { slidesPerGroup: 2 }),
						},
						991.98: {
							slidesPerView: 2,
							spaceBetween: 30,
							...(isServicesBlock && { slidesPerGroup: 2 }),
						},
						1439.98: {
							slidesPerView: 2.393,
							spaceBetween: 30,
							...(isServicesBlock && { slidesPerGroup: 2 }),
						}
					}
				});

				if (isServicesBlock && textSvgGroups.length) {
					// Даем класс первому элементу
					textSvgGroups[0].classList.add('_active');

					swiperMain.on('slideChange', () => {
						let activeElements = [...textSvgGroups].filter(el => el.classList.contains('_active')); // Найти все активные элементы
						let lastActive = activeElements[activeElements.length - 1]; // Последний активный элемент

						if (swiperMain.activeIndex > swiperMain.previousIndex) {
							// Прокрутка вперед: добавляем класс следующему элементу после последнего активного
							let nextElement = lastActive?.nextElementSibling;
							if (nextElement) {
								nextElement.classList.add('_active');
							}
						} else {
							// Прокрутка назад: убираем класс у последнего активного элемента (кроме первого)
							if (activeElements.length > 1) {
								lastActive.classList.remove('_active');
							}
						}
					});
				}
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