import { deleteCardAsync, likeCardAsync, dislikeCardAsync } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

export const deleteCard = function (e) {
  const listItem = e.target.closest('.places__item');
  deleteCardAsync(listItem.id).then((_data) => {
    listItem.remove();
  });
}

export const likeCard = function (e) {
  const likeButton = e.target;
  const cardItem = likeButton.closest('.places__item');
  const cardId = cardItem.id;
  const likeCounter = document.getElementById(cardId).querySelector('.card__like-counter');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeCardAsync(cardId).then((data) => {
      likeCounter.textContent = data.likes.length;
      likeButton.classList.remove('card__like-button_is-active');
    });
  } else {
    likeCardAsync(cardId).then((data) => {
      likeCounter.textContent = data.likes.length;
      likeButton.classList.add('card__like-button_is-active');
    });
  }
}

export function createCard(cardData, deleteFunc, likeFunc, zoomFunc) {
  const link = cardData.link;
  const name = cardData.name;
  const ownerName = cardData.owner.name;
  const ownerDescription = cardData.owner.about;
  const currentUserName = profileTitleElement.textContent;
  const currentUserDescription = profileDescriptionElement.textContent;
  const elementId = cardData._id
  const likes = cardData.likes.length;

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
  if (currentUserName == ownerName && currentUserDescription == ownerDescription) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);
  } else {
    cardElement.querySelector('.card__delete-button').remove();
  }
  const hasLikeFromMe = cardData.likes.some(like => like.name === currentUserName && like.about === currentUserDescription);

  if (hasLikeFromMe) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeCounter.textContent = likes;

  return cardElement;
}