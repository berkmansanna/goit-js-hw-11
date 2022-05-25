import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryBox = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.photo-link');

export const renderPhotos = data => {
  const elementHTML = data
    .map(
      ({ previewURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a href='${largeImageURL}' class='photo-link'>
    <div class='photo-card'>
      <div class='img-thumb'>
        <img src='${previewURL}' alt='${tags}' loading='lazy' />
      </div>
      <div class='info'>
        <p class='info-item'>
          <b>Likes: <br />${likes}</b>
        </p>
        <p class='info-item'>
          <b>Views: <br />${views}</b>
        </p>
        <p class='info-item'>
          <b>Comments: <br />${comments}</b>
        </p>
        <p class='info-item'>
          <b>Downloads: <br />${downloads}</b>
        </p>
      </div>
    </div>
  </a>
`,
    )
    .join('');

  galleryBox.insertAdjacentHTML('beforeend', elementHTML);

  lightbox.refresh();
};
