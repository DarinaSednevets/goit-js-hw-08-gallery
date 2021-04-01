import arrOfPictures from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.




function createPicturesList(pictures) {
  return pictures.map((item, index) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
      data-index="${index}"
    />
  </a>
</li>`
  }).join('');
}


const listRef = document.querySelector('.js-gallery');
listRef.insertAdjacentHTML("afterbegin", createPicturesList(arrOfPictures));

const imageRef = document.querySelector('.lightbox__image');
const lightboxRef = document.querySelector('.lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
let imgIndex;
const closeBtnRef = document.querySelector('.lightbox__button');
listRef.addEventListener('click', openModal);
closeBtnRef.addEventListener('click', closeModal);

listRef.addEventListener('click', openModal);
closeBtnRef.addEventListener('click', closeModal);


function openModal(event) {
  overlayRef.addEventListener('click', overlayClick);
  window.addEventListener("keydown", pressKey);
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  imageRef.src = event.target.dataset.source;
  imgIndex = Number(event.target.dataset.index);
  lightboxRef.classList.add('is-open');
}
function closeModal() {
  overlayRef.removeEventListener('click', overlayClick);
  window.removeEventListener("keydown", pressKey);
  lightboxRef.classList.remove('is-open');
  imageRef.src = "";

}
function overlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}


function pressKey(event) {
  event.preventDefault();
  if (event.code === 'Escape') {
    closeModal();
  }
  if (event.code === "ArrowRight") {
    if (imgIndex >= arrOfPictures.length - 1) {
      return;
    }
    else {
      imgIndex += 1;
      imageRef.src = arrOfPictures[imgIndex].original;
    }
  }
  if (event.code === "ArrowLeft") {
    if (imgIndex === 0) {
      return;
    } else {
      imgIndex -= 1;
      imageRef.src = arrOfPictures[imgIndex].original;
    }
  }
}
