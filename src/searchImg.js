import axios from 'axios';

export default async function searchImages(value, page) {
  const url = 'https://pixabay.com/api/';
  const key = '27200028-8fc69fbb3d566c8420050baaa&q';
  const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios.get(`${url}${filter}`).then(response => response.data);
}
