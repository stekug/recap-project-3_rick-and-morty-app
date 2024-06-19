const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = '';

const expectedData = {
    id: 3,
    name: 'Rick Sanchezzzzz',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    type: '',
    episode: ['aojlk', 'opikajmskd', 'oasjnd'],
};

// const { id, name, image, status, type, episode } = expectedData;

function CharacterCard({ id, name, image, status, type, episode }) {
    const liElement = document.createElement('li');
    console.log(image);
    liElement.classList.add('card');
    liElement.innerHTML = `<div class="card__image-container">
  <img
    class="card__image"
    src="${image}"
    alt="${name}"
  />
  <div class="card__image-gradient"></div>
</div>
<div class="card__content">
  <h2 class="card__title">${name}</h2>
  <dl class="card__info">
    <dt class="card__info-title">Status</dt>
    <dd class="card__info-description">${status}</dd>
    <dt class="card__info-title">Type</dt>
    <dd class="card__info-description">${type}</dd>
    <dt class="card__info-title">Occurrences</dt>
    <dd class="card__info-description">${episode.length}</dd>
  </dl>
</div>`;
    return liElement;
}

cardContainer.append(CharacterCard(expectedData));
