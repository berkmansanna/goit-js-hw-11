import './styles/styles.css';
import 'regenerator-runtime/runtime';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchPhotos } from './apies/searchImg';
import { renderPhotos } from './templates/renderHTML';

const form = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');

const state = {
  query: null,
  totalHits: 0,
  page: 1,
  hits: [],
};

const observer = new IntersectionObserver((entries, observer) => {
  const { hits, totalHits } = state;
  const lastCard = entries[0];
  if (!lastCard.isIntersecting || hits.length === totalHits) return;

  observer.unobserve(lastCard.target);

  state.page++;
  renderGallery();
});

const handleSearch = e => {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  state.query = searchQuery.value.trim();

  if (state.query.length) {
    galleryBox.innerHTML = '';
    state.page = 1;
    renderGallery();
  }
};

const renderGallery = async () => {
  const { query, page } = state;

  await fetchPhotos(query, page)
    .then(res => {
      const { data } = res;

      if (data.hits.length) {
        if (page === 1) {
          state.totalHits = data.totalHits;
          state.hits = [];
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }

        state.hits = state.hits.concat(data.hits);
        renderPhotos(data.hits);

        observer.observe(document.querySelector('.photo-card:last-child'));
      } else
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    })
    .catch(e => console.error(e));
};

form.addEventListener('submit', handleSearch);
