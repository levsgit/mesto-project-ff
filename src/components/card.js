import { deleteCardAsync, likeCardAsync, dislikeCardAsync } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export const deleteCard = function (e) {
  const listItem = e.target.closest('.places__item');
  deleteCardAsync(listItem.id).then((_data) => {
    listItem.remove();
  })
    .catch((err) => {
      console.log(err);
    });
}

function isLiked(likeButton) {
  return likeButton.classList.contains('card__like-button_is-active');
}

export const likeCard = function (e) {
  const likeButton = e.target;
  const cardItem = likeButton.closest('.places__item');
  const cardId = cardItem.id;
  const likeCounter = document.getElementById(cardId).querySelector('.card__like-counter');

  const likeMethod = isLiked(likeButton) ? dislikeCardAsync : likeCardAsync;
  likeMethod(cardId)
    .then((data) => {
      likeCounter.textContent = data.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.log(err));
}

export function createCard(cardData, deleteFunc, likeFunc, zoomFunc, currentUserId) {
  const link = cardData.link;
  const name = cardData.name;
  const cardOwnerId = cardData.owner._id;
  const elementId = cardData._id
  const likesCount = cardData.likes.length;

  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');


  cardImage.src = link;
  cardImage.alt = name;
  cardElement.id = elementId;
  cardElement.querySelector('.card__title').textContent = name;
  cardLikeButton.addEventListener('click', likeFunc);
  cardImage.addEventListener('click', zoomFunc);
  if (currentUserId == cardOwnerId) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);
  } else {
    cardElement.querySelector('.card__delete-button').remove();
  }
  const hasLikeFromMe = cardData.likes.some(like => like._id === currentUserId);

  if (hasLikeFromMe) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeCounter.textContent = likesCount;

  return cardElement;
}