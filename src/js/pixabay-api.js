//#region library import

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

//#endregion

export async function getPhotos(query) {
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

  try {
    const response = await axios.get(url);
    const { data } = response;
    if (data && data.hits) {
      return data.hits;
    } else {
      throw new Error('No data received from the server');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
}
