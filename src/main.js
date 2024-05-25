//#region libraries

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

//#endregion

//#region imports

import { getPhotos } from './js/pixabay-api';

import { picturesTemplate } from './js/render-functions';

import { currentPage } from './js/pixabay-api';

//#endregion

const refs = {
  formEl: document.querySelector('#searchForm'),
  inputEl: document.querySelector('#searchInput'),
  submitBtn: document.querySelector('#submitButton'),
  searchRes: document.querySelector('#searchResults'),
  loaderEl: document.querySelector('.loader'),
  backdropEl: document.querySelector('.loader-backdrop'),
  loadMore: document.querySelector('.js-btn-load'),
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

function showLoadMore() {
  refs.loadMore.classList.remove('visually-hidden');
}

function hideLoadMore() {
  refs.loadMore.classList.add('visually-hidden');
}

refs.formEl.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
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

  try {
    const data = await getPhotos(query);
    if (data.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    const markup = picturesTemplate(data);

    refs.searchRes.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    hideLoader();

    showLoadMore();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error,
    });
    hideLoader();
  }
  e.target.reset();
}

refs.loadMore.addEventListener('click', handleLoadMoreClick);

async function handleLoadMoreClick(e) {
  currentPage++;
  const query = refs.inputEl.value.trim().toLowerCase();
  const data = await getPhotos(query);
  const markup = picturesTemplate(data);

  refs.searchRes.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  hideLoader();

  showLoadMore();
}
