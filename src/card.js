const cardTemplate = document.querySelector('#card-template').content;

export const deleteCard = function (e) {
  const listItem = e.target.closest('.places__item');
  listItem.remove();
}

export const likeCard = function (e) {
  e.target.classList.toggle('card__like-button_is-active');
}

export function createCard(card, deleteFunc, likeFunc, zoomFunc) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const link = card.link;
  const name = card.name;

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunc);
  cardElement.querySelector('.card__image').addEventListener('click', zoomFunc);

  return cardElement;
}