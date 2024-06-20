export default function NavButton(className, datajs, innerText) {
  const button = `
    <button class="${className}" data-js="${datajs}">
      ${innerText}
    </button>
  `;
  return button;
}
