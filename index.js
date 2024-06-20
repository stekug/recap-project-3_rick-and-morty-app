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
const maxPage = 1;
const page = 1;
const searchQuery = "";

// expectedData.forEach((character) => {
//   cardContainer.append(CharacterCard(character));
// });

async function fetchCharacters() {
  try {
    // fetching data
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const { results: characterData, info: infoData } = await response.json();
    // const data = await response.json();
    // const characterData = data.results;
    // const infoData = data.info;

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
