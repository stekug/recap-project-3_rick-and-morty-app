import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import { expectedData } from "./src/mochupData.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 41;
// pagination.textContent = `${page} / ${maxPage}`;
const searchQuery = "";

// expectedData.forEach((character) => {
//   cardContainer.append(CharacterCard(character));
// });

async function fetchCharacters() {
  try {
    // fetching data
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    // console.log(response);
    const { results: characterData, info: infoData } = await response.json();
    // const data = await response.json();
    // const characterData = data.results;
    // const infoData = data.info;

    // console.log(infoData);

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

// Alternative way to write the pagination

function paginationUpdate(n) {
  if (n === 1 && page !== maxPage) {
    page++;
  } else if (n === -1 && page !== 1) {
    page--;
  }
  pagination.textContent = `${page} / ${maxPage}`;
  fetchCharacters();
}

paginationUpdate();

nextButton.addEventListener("click", () => {
  paginationUpdate(1);
});
prevButton.addEventListener("click", () => {
  paginationUpdate(-1);
});

// Simple way to write pagination

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
