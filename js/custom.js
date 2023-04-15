"use strict"
//==================================================================================================================================================
//Бэграунд картинок - "Начало"
//==================================================================================================================================================
let imageWebp = document.querySelector('.loading-screen-ditector');
let imageWebpOk = false;
if (imageWebp) {

	if (imageWebp.width + imageWebp.height == 0) {
		imageWebpOk = false;
	} else {
		imageWebpOk = true;
	}
}

function ibg(){
	let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('._webp') && ibg[i].querySelector('._jpg')) {
			if(ibg[i].querySelector('._webp') && imageWebpOk == true){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('._webp').getAttribute('src')+')';
				ibg[i].classList.add('_loaded');
			} else if(ibg[i].querySelector('._jpg') && imageWebpOk == false){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('._jpg').getAttribute('src')+')';
				ibg[i].classList.add('_loaded');
			}
		} else {
			if(ibg[i].querySelector('img')){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
			}
		}
	}
}
ibg();
//==================================================================================================================================================
//Бэграунд картинок - "Конец"
//==================================================================================================================================================

//Бургер ========================================================

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

//===============================================================

//Страница Home кнопка формы ========================================================

const homeButton = document.querySelector('._home-button');
const homeWrapper = document.querySelector('._home-wrapper');
if (homeButton && homeWrapper) {
	homeButton.addEventListener("click", function (e) {
		homeButton.classList.toggle('_active');
		homeWrapper.classList.toggle('_active');
	});
}

//===============================================================

const mySwiper = document.querySelector('.mySwiper');
const mySwiper2 = document.querySelector('.mySwiper2');

if (mySwiper && mySwiper2) {
	var swiper = new Swiper(".mySwiper", {
	  spaceBetween: 10,
	  slidesPerView: 4,
	  freeMode: true,
	  watchSlidesProgress: true,
	});
	var swiper2 = new Swiper(".mySwiper2", {
	  spaceBetween: 10,
	  thumbs: {
	    swiper: swiper,
	  },
	});
}


//Выподающие списки ===================================================================================


const selectSingles = document.querySelectorAll('._select');

if (selectSingles.length > 0) {
	for (let i = 0; i < selectSingles.length; i++) {
		let selectSingle = selectSingles[i];
		let selectSingle_title = selectSingle.querySelector('._select__title');
		let selectSingle_labels = selectSingle.querySelectorAll('._select__label');
		let selectSingle_input =  selectSingle.querySelector('._select__title-input');
		let selectTitleText =  selectSingle.querySelector('._select__title-text');

		if (selectTitleText) {

			selectSingle_title.addEventListener('click', () => {
			  if ('active' === selectSingle.getAttribute('data-state')) {
			    selectSingle.setAttribute('data-state', '');
			  } else {
			    selectSingle.setAttribute('data-state', 'active');
			  }
			});

			for (let i = 0; i < selectSingle_labels.length; i++) {
			  selectSingle_labels[i].addEventListener('click', (evt) => {
			    selectSingle_input.value = evt.target.textContent;
			    selectSingle.setAttribute('data-state', '');
			  });
			}
			document.addEventListener( 'click', (e) => {
				let withinBoundaries = e.composedPath().includes(selectSingle_title);
				let withinBoundaries2 = e.composedPath().includes(selectSingle_input);
			 
				if ( ! withinBoundaries && ! withinBoundaries2) {
					selectSingle.setAttribute('data-state', '');
				}
			})

		} else {
			if (selectSingle_title) {
				selectSingle_title.addEventListener('click', () => {
					if ('active' === selectSingle.getAttribute('data-state')) {
						selectSingle.setAttribute('data-state', '');
					} else {
						selectSingle.setAttribute('data-state', 'active');
					}
				});
			}

			for (let i = 0; i < selectSingle_labels.length; i++) {
				selectSingle_labels[i].addEventListener('click', (evt) => {
					selectSingle_input.value = evt.target.textContent;
					selectSingle.setAttribute('data-state', '');
				});
			}

			document.addEventListener( 'click', (e) => {
				let withinBoundaries = e.composedPath().includes(selectSingle_title);
				let withinBoundaries2 = e.composedPath().includes(selectSingle_input);
			 
				if ( ! withinBoundaries && ! withinBoundaries2) {
					selectSingle.setAttribute('data-state', '');
				}
			});
		}
	}
}

//=====================================================================================================



//==================================================================================================================================================
//Линивая загрусска - "Начало"
//==================================================================================================================================================
const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const loadMapBlock = document.querySelector('._load-map');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		if (img.dataset.src || img.dataset.srcset) {
			lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
			ibg();
		}
	});
}

window.addEventListener("scroll", lazuScroll);
function lazuScroll() {
	if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
		lazyScrollCheck();
		ibg();
	}
}

function lazyScrollCheck() {
	let imgIndex = lazyImagesPositions.findIndex(
		item => pageYOffset > item - windowHeight
	);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute('data-src');
		} else if (lazyImages[imgIndex].dataset.srcset) {
			lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
			lazyImages[imgIndex].removeAttribute('data-srcset');
		}
		delete lazyImagesPositions[imgIndex];
	}
}
//==================================================================================================================================================
//Линивая загрусска - "Начало"
//==================================================================================================================================================