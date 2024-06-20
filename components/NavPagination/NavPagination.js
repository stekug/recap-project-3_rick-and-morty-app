import NavButton from "../NavButton/NavButton.js";

export default function NavPagination(page, maxPage) {
  const nav = ` <nav class="navigation" data-js="navigation">
  ${NavButton("button button--prev", "button-prev", "previous")}
    <span class="navigation__pagination" data-js="pagination">
      ${page} / ${maxPage}
    </span>
    ${NavButton("button button--next", "button-next", "next")}
  </nav>
  `;
  return nav;
}

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
