'use strict';

document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>');

let slider = document.querySelector('.slider');

//Иконка загрузки
let loadIcon = document.createElement('i');
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", loadIcon);

//Левая стрелка
let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

//Правая стрелка
let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

//Ждем загрузку контента
window.addEventListener('load', function () {

    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    });

    //Инициализация слайдера
    images.init();

    //Скрываем иконку загрузки
    loadIcon.style.display = "none";
});

let images = {
    /*{int} Номер текущего изображения */
    currentIdx: 0,

    /*{HTMLDivElement[]} slides элементы слайдов*/
    slides: [],

    /** Получаем все слайды и показываем первый слайд*/
    init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx();
        this.slides[this.currentIdx].classList.add('animAppear');
    },

    /** Берем слайд с текущим индексом и убираем .hidden-slide стиль
     *(показываем слайд)
     */
    showImageWithCurrentIdx() {
        this.slides[this.currentIdx].classList.remove('hidden-slide');
    },

    /*Всем слайдам добавляем класс hidden-slide*/
    hideVisibleImage() {
        document.querySelector('.slider-item:not(.hidden-slide)').classList.add('hidden-slide');
        this.slides[this.currentIdx].classList.remove('swipeLeftDisappear');
        this.slides[this.currentIdx].classList.remove('swipeLeft');
        this.slides[this.currentIdx].classList.remove('swipeRightDisappear');
        this.slides[this.currentIdx].classList.remove('swipeRight');
        /*this.slides.forEach(function (slide) {
            slide.classList.add('hidden-slide');
        });*/
    },

    /*hideVisibleImageLeft() {
        //this.slides[this.currentIdx].classList.add('swipeLeftDisappear');
        document.querySelector('.slider-item:not(.hidden-slide-left)').classList.add('hidden-slide-left');
    },*/

    /*Пролистывание влево*/
    setNextLeftImage() {
        this.hideVisibleImage();
        if (this.currentIdx == 0) {
            this.slides[this.currentIdx].classList.add('swipeLeftDisappear');
            this.currentIdx = this.slides.length - 1;
        } else {
            this.slides[this.currentIdx].classList.add('swipeLeftDisappear');
            this.currentIdx--;
        }
        this.showImageWithCurrentIdx();
        this.slides[this.currentIdx].classList.add('swipeLeft');
    },

    /*Пролистывание вправо*/
    setNextRightImage() {
        this.hideVisibleImage();
        if (this.currentIdx == this.slides.length - 1) {
            this.slides[this.currentIdx].classList.add('swipeRightDisappear');
            this.currentIdx = 0;
        } else {
            this.slides[this.currentIdx].classList.add('swipeRightDisappear');
            this.currentIdx++;
        }
        this.showImageWithCurrentIdx();
        this.slides[this.currentIdx].classList.add('swipeRight');
    },

    /**Функция берет у элемента слайдера его data аттрибуты размеров,
    *и если они определены, то самому слайдеру меняет размеры.
    *@param {HTMLDivElement} slider
    */
    setSizes(slider) {
        let width = slider.getAttribute('data-width');
        let height = slider.getAttribute('data-height');
        if (width != null && width != "") {
            slider.style.width = width;
        }
        if (height != null && height != "") {
            slider.style.height = height;
        }
    }
};

images.setSizes(slider);
