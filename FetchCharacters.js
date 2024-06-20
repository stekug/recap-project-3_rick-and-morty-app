async function FetchCharacters(page, searchQuery) {
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
