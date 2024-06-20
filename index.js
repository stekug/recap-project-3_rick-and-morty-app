import CharacterCard from "./components/CharacterCard/CharacterCard.js";
// import NavPagination from "./components/NavPagination/NavPagination.js";
import { expectedData } from "./src/mochupData.js";
import fetchCharacters from "FetchCharacters.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States -----------------------------------------------
let maxPage = 42;
let page = 1;
let searchQuery = "";

// document.body.append(NavPagination(page, maxPage));

async function fetchCharacters2() {
  try {
    // fetching data
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    const { results: characterData, info: infoData } = await response.json();
    return characterData;
  } catch (error) {
    cardContainer.innerHTML = `<p>Sorry, we couldn't find any data. Try again later!</p>`;
    console.error(error);
  }
}
async function renderCards2() {
  const data = await fetchCharacters2();
  console.log(data);
}
renderCards2();

function renderCards(characterData) {
  characterData.forEach((character) => {
    cardContainer.append(CharacterCard(character));
  });
}

// console.log(fetchCharacters2());
// renderCards(fetchCharacters2());

async function fetchCharacters() {
  try {
    // fetching data
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    const { results: characterData, info: infoData } = await response.json();

    // assining max page
    maxPage = infoData.pages;
    paginationUpdate();

    //empty cardContainer
    cardContainer.innerHTML = "";

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

nextButton.addEventListener("click", () => {
  paginationUpdate(1);
});
prevButton.addEventListener("click", () => {
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
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.query.value;
  page = 1;
  fetchCharacters();
});
