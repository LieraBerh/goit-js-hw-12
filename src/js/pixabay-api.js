//#region library import

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

//#endregion

import { currentPage } from '../main';

export async function getPhotos(query, currentPage) {
  const apiKey = '43995024-c8f5c7e28b3078307d7d8500b';
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';

  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  });

  const url = `${BASE_URL}${END_POINT}?${params}`;

  try {
    const response = await axios.get(url);
    const { data } = response;
    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
}
