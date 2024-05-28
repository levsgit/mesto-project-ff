let deleteCard = function (e) {
  const listItem = e.target.closest('.places__item');
  listItem.remove();
}

function addCard(card, deleteFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);
  return cardElement;
}

initialCards.forEach(item => {
  document.querySelector('.places__list').append(addCard(item, deleteCard));
});