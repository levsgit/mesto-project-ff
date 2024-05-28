const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const deleteCard = function (e) {
  const listItem = e.target.closest('.places__item');
  listItem.remove();
}

function createCard(card, deleteFunc) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const link = card.link;
  const name = card.name;

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);

  return cardElement;
}

initialCards.forEach(item => {
  cardsList.append(createCard(item, deleteCard));
});