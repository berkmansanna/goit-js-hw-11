import axios from 'axios';

const API_KEY = '27513369-b4299cf044d06764b30420eb5';
const API_URL = 'https://pixabay.com/api/';

const options = {
  per_page: 20,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const fetchPhotos = (value, page = 1) =>
  axios
    .get(API_URL, {
      params: {
        key: API_KEY,
        q: value,
        page: page,
        ...options,
      },
    })
    .catch(e => console.error(e));
