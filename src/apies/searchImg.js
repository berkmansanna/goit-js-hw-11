import axios from 'axios';

const URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.q = '';
  }

  async getPicters() {
    try {
      const instance = axios.create({
        baseURL: URL,
        params: {
          key: '27513369-b4299cf044d06764b30420eb5',
          q: this.q,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: 1,
          per_page: 40,
        },
      });
      const data = await instance.get('');
      this.incrementPage();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
