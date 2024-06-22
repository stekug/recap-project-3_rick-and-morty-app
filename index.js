import CharacterCard from './components/CharacterCard/CharacterCard.js';
import { expectedData } from './src/mochupData.js';
import NavPagination from './components/NavPagination/NavPagination.js';
import NavButton from './components/NavButton/NavButton.js';
import SearchBar from './components/SearchBar/SearchBar.js';

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
// const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
// const prevButton = document.querySelector('[data-js="button-prev"]');
// const nextButton = document.querySelector('[data-js="button-next"]');
// const pagination = document.querySelector('[data-js="pagination"]');

// States -----------------------------------------------
let maxPage = 42;
let page = 1;
let searchQuery = '';

async function fetchCharacters() {
    try {
        // fetching data
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`);
        const { results: characterData, info: infoData } = await response.json();

        // assining max page
        maxPage = infoData.pages;
        paginationUpdate();

        //empty cardContainer
        cardContainer.innerHTML = '';

        //build cards
        characterData.forEach((character) => {
            cardContainer.append(CharacterCard(character));
        });
    } catch (error) {
        cardContainer.innerHTML = `<p>Sorry, we couldn't find any data. Try again later!</p>`;
        console.error(error);
    }
}

fetchCharacters();

// Alternative way to write the pagination-----------------
const pagination = NavPagination();

function paginationUpdate(n) {
    if (n === 1 && page !== maxPage) {
        page++;
        fetchCharacters();
    } else if (n === -1 && page !== 1) {
        page--;
        fetchCharacters();
    }
    pagination.textContent = `${page} / ${maxPage}`;
}

paginationUpdate();

const nextButton = NavButton("next", () => {
    paginationUpdate(1);
});
const prevButton = NavButton('prev', () => {
    paginationUpdate(-1);
});

// Simple way to write pagination------------------------------

/* nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }

  pagination.textContent = `${page} / ${maxPage}`;
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }

  pagination.textContent = `${page} / ${maxPage}`;
});
 */

// Submit Event Listener------------------------------------------
const searchBar = SearchBar((event) => {
    event.preventDefault();
    searchQuery = searchBar.query.value;
    page = 1;
    fetchCharacters();
});

navigation.append(prevButton, pagination, nextButton);
searchBarContainer.append(searchBar);