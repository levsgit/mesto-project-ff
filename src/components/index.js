import './cards.js';
import '../styles/index.css';

import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, handleOverlayClick } from './modal.js';

const cardsList = document.querySelector('.places__list');
const newCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupZoomCard = document.querySelector('.popup_type_image');
const popupZoomCardImage = popupZoomCard.querySelector('.popup__image')
const popupZoomCardCaption = popupZoomCard.querySelector('.popup__caption');

// Zoom image from card function
const zoomCard = function (e) {
  const currentCard = e.target.closest('.places__item');
  const currentCardImage = currentCard.querySelector('.card__image');
  const currentCardCaption = currentCard.querySelector('.card__title');

  popupZoomCardImage.src = currentCardImage.src;
  popupZoomCardImage.alt = currentCardImage.alt;
  popupZoomCardCaption.textContent = currentCardCaption.textContent;

  openModal(popupZoomCard);
}

// Base cards
initialCards.forEach(item => {
  cardsList.append(createCard(item, deleteCard, likeCard, zoomCard));
});

// Handle overlay clicks in modals
document.querySelectorAll('.popup').forEach(item => item.addEventListener('click', handleOverlayClick));

// Profile edit functional
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormDescription = editProfileForm.elements.description;

profileEditButton.addEventListener('click', function (e) {
  openModal(popupEditProfile);
  editProfileFormName.value = profileTitle.textContent;
  editProfileFormDescription.value = profileDescription.textContent;
});

editProfileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  closeModal(popupEditProfile);
});

// New card functional
const newCardForm = document.forms['new-place'];
const placeName = newCardForm.elements['place-name'];
const placeImageLink = newCardForm.elements['link'];

newCardButton.addEventListener('click', function () {
  openModal(popupNewCard);
});

newCardForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const cardObj = {
    name: placeName.value,
    link: placeImageLink.value,
  };
  const cardElem = createCard(cardObj, deleteCard, likeCard, zoomCard);
  cardsList.prepend(cardElem);

  closeModal(popupNewCard);
  newCardForm.reset();
});