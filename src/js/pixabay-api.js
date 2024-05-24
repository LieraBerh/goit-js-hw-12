//#region library import

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

//#endregion

export function getPhotos(query) {
  const apiKey = '43995024-c8f5c7e28b3078307d7d8500b';
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';

  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}${END_POINT}?${params}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(pictures => {
      return pictures.hits;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error,
      });
    });
}
