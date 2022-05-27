import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '27513369-b4299cf044d06764b30420eb5';

export default class ApiService {
  constructor() {
    this.params = {
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: 1,
      per_page: 40,
    };
  }

  async getPicters() {
    try {
      const data = await axios.get(URL, {
        params: {
          key: API_KEY,
          ...this.params,
        },
      });
      this.incrementPage();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
  incrementPage() {
    this.params.page += 1;
  }
  resetPage() {
    this.params.page = 1;
  }
  get query() {
    return this.params.q;
  }
  set query(newQuery) {
    this.params.q = newQuery;
  }
}
