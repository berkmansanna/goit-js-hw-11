import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

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
  apiService.q = e.currentTarget.elements.searchQuery.value;
  if (apiService.q.trim() === '') {
    Notiflix.Notify.failure('Please fill in the field');
    return;
  }

  apiService.getPicters().then(data => {
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

function infiniteScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 100) {
    apiService
      .getPicters()
      .then(({ hits }) => {
        if (hits.length === 0) {
          Notiflix.Notify.failure('End');
          return;
        }
        appendPicters(hits);
        lightbox.refresh();
      })
      .catch(error => {
        console.log(error);
        return;
      });
  }
}

refs.formEl.addEventListener('submit', onSearch);
window.addEventListener('scroll', throttle(infiniteScroll, 300));
