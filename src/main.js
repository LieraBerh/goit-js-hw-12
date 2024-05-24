//#region libraries

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

//#endregion

//#region imports

import { getPhotos } from './js/pixabay-api';

import { picturesTemplate } from './js/render-functions';

//#endregion

const refs = {
  formEl: document.querySelector('#searchForm'),
  inputEl: document.querySelector('#searchInput'),
  submitBtn: document.querySelector('#submitButton'),
  searchRes: document.querySelector('#searchResults'),
  loaderEl: document.querySelector('.loader'),
  backdropEl: document.querySelector('.loader-backdrop'),
};

const lightbox = new SimpleLightbox('#searchResults a', {
  overlay: true,
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  captionClass: 'caption',
  close: true,
  showCounter: true,
  enableKeyboard: true,
  docClose: true,
  clasName: 'gallery-item-modal',
});

document.addEventListener('DOMContentLoaded', hideLoader);

function hideLoader() {
  refs.loaderEl.classList.add('visually-hidden');
  refs.backdropEl.classList.add('visually-hidden');
}

function showLoader() {
  refs.loaderEl.classList.remove('visually-hidden');
  refs.backdropEl.classList.remove('visually-hidden');
}

refs.formEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  refs.searchRes.innerHTML = '';
  showLoader();

  if (!refs.inputEl.value) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter search parameters',
    });
    hideLoader();
    return;
  }

  const query = e.target.elements.query.value.trim().toLowerCase();

  getPhotos(query)
    .then(data => {
      if (data.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      const markup = picturesTemplate(data);

      refs.searchRes.innerHTML = markup;

      lightbox.refresh();

      hideLoader();
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message: err,
      });
      hideLoader();
    })
    .finally(() => {
      hideLoader();
    });

  e.target.reset();
}
