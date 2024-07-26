import './cards.js';
import '../styles/index.css';

import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, handleOverlayClick, toggleLoadingPhrase } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserAsync, getInitialCardsAsync, addCardAsync, editProfileAsync, editProfileImageAsync } from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsList = document.querySelector('.places__list');
const newCardButton = document.querySelector('.profile__add-button');
const profileImageEditButton = document.querySelector('.profile__image-edit-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileImage = document.querySelector('.popup_type_edit_avatar');
const popupEditProfileImageForm = popupEditProfileImage.querySelector(validationConfig.formSelector);
const popupEditProfileForm = popupEditProfile.querySelector(validationConfig.formSelector);
const popupZoomCard = document.querySelector('.popup_type_image');
const popupZoomCardImage = popupZoomCard.querySelector('.popup__image')
const popupZoomCardCaption = popupZoomCard.querySelector('.popup__caption');

const profileImageElement = document.querySelector('.profile__image');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

let currentUserId = '';

// Load data
Promise.all([getUserAsync(), getInitialCardsAsync()])
  .then(([userData, cardsData]) => {
    // Load profile data
    profileImageElement.style.backgroundImage = "url('" + userData.avatar + "')";
    profileTitleElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    currentUserId = userData._id;
    // Load initial cards
    cardsData.forEach(function (item) {
      cardsList.append(createCard(item, deleteCard, likeCard, zoomCard, currentUserId));
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Zoom image from card function
export const zoomCard = function (e) {
  const currentCard = e.target.closest('.places__item');
  const currentCardImage = currentCard.querySelector('.card__image');
  const currentCardCaption = currentCard.querySelector('.card__title');

  popupZoomCardImage.src = currentCardImage.src;
  popupZoomCardImage.alt = currentCardImage.alt;
  popupZoomCardCaption.textContent = currentCardCaption.textContent;

  openModal(popupZoomCard);
}

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
  clearValidation(popupEditProfileForm, validationConfig);
  editProfileFormName.value = profileTitle.textContent;
  editProfileFormDescription.value = profileDescription.textContent;
});

editProfileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  toggleLoadingPhrase(editProfileForm, validationConfig, true);
  editProfileAsync(editProfileForm.elements.name.value, editProfileForm.elements.description.value)
    .then((data) => {
      profileTitleElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => toggleLoadingPhrase(editProfileForm, validationConfig, false));
});

// New card functional
const popupNewCardForm = document.forms['new-place'];
const placeName = popupNewCardForm.elements['place-name'];
const placeImageLink = popupNewCardForm.elements['link'];

newCardButton.addEventListener('click', function () {
  openModal(popupNewCard);
  clearValidation(popupNewCardForm, validationConfig);
});

popupNewCardForm.addEventListener('submit', function (e) {
  e.preventDefault();
  toggleLoadingPhrase(popupNewCardForm, validationConfig, true);
  addCardAsync(placeName.value, placeImageLink.value).then((data) => {
    cardsList.prepend(createCard(data, deleteCard, likeCard, zoomCard, currentUserId));
    closeModal(popupNewCard);
    popupNewCardForm.reset();
  })
    .catch((err) => {
      console.log(err);
    }).finally(() => toggleLoadingPhrase(popupNewCardForm, validationConfig, false));
});

// Edit avatar functional 
profileImageEditButton.addEventListener('click', function (e) {
  openModal(popupEditProfileImage);
  clearValidation(popupEditProfileImageForm, validationConfig);
});

popupEditProfileImageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  toggleLoadingPhrase(popupEditProfileImageForm, validationConfig, true);
  editProfileImageAsync(e.target.elements['avatar-link-input'].value).then((data) => {
    profileImageElement.style.backgroundImage = "url('" + data.avatar + "')";
    closeModal(popupEditProfileImage);
    popupEditProfileImageForm.reset();
  }).catch((err) => {
    console.log(err);
  }).finally(() => toggleLoadingPhrase(popupEditProfileImageForm, validationConfig, false));
});

enableValidation(validationConfig);