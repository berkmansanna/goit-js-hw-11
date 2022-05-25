import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ApiService from './apies/searchImg.js';

import pictureCard from './templates/renderHTML.hbs';
import './styles/styles.css';

const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
});
lightbox.refresh();

const apiService = new ApiService();

function onSearch(e) {
  e.preventDefault();
  outputClear();
  apiService.resetPage();
  apiService.query = e.currentTarget.elements.searchQuery.value;
  if (apiService.query.trim() === '') {
    Notiflix.Notify.failure('Please fill in the field');
    return;
  }

  apiService.getPicters().then(({ data }) => {
    appendPicters(data.hits);
    lightbox.refresh();
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again',
      );
      return;
    }
    if (data.totalHits !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images!`);
    }
  });
}

function appendPicters(card) {
  refs.galleryEl.insertAdjacentHTML('beforeend', pictureCard(card));
}

function outputClear() {
  refs.galleryEl.innerHTML = '';
}

refs.formEl.addEventListener('submit', onSearch);

window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 150) {
    apiService.getPicters().then(({ data }) => {
      appendPicters(data.hits);
      lightbox.refresh();
    });
  }
});
