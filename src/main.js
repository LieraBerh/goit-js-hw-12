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

export function hideLoader() {
  refs.loaderEl.classList.add('visually-hidden');
  refs.backdropEl.classList.add('visually-hidden');
}

export function showLoader() {
  refs.loaderEl.classList.remove('visually-hidden');
  refs.backdropEl.classList.remove('visually-hidden');
}

export function showLoadMore() {
  refs.loadMore.classList.remove('visually-hidden');
}

export function hideLoadMore() {
  refs.loadMore.classList.add('visually-hidden');
}

export let currentPage = 1;

let query;

refs.formEl.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
  e.preventDefault();

  currentPage = 1;

  refs.searchRes.innerHTML = '';
  showLoader();

  if (!refs.inputEl.value) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter search parameters',
    });
    hideLoader();
    hideLoadMore();
    return;
  }

  query = e.target.elements.query.value.trim().toLowerCase();

  try {
    const data = await getPhotos(query, currentPage);
    const pictures = data.hits;
    if (pictures.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMore();
    }
    const markup = picturesTemplate(pictures);

    refs.searchRes.innerHTML = markup;

    lightbox.refresh();

    if (data.totalHits > 15) {
      showLoadMore();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error,
    });
  } finally {
    hideLoader();
  }
  e.target.reset();
}

refs.loadMore.addEventListener('click', handleLoadMoreClick);

async function handleLoadMoreClick() {
  currentPage++;
  const data = await getPhotos(query, currentPage);
  const pictures = data.hits;
  const markup = picturesTemplate(pictures);
  const totalPages = Math.ceil(data.totalHits / 15);
  const galleryItemHeight = refs.searchRes
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });

  if (currentPage === totalPages) {
    iziToast.error({
      position: 'topRight',
      message: 'This is the last page',
    });
    hideLoadMore();
  }

  refs.searchRes.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  hideLoader();
}
