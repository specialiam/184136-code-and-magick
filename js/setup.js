'use strict';

var setupDialog = document.querySelector('.setup');
// setupDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUR_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomIndex = function (min, max) { // функция генерации случайных данных
  return Math.floor(Math.random() * (max - min)) + min;
};

var wizards = []; // масиив для вставки магов
var COUNT_WIZARDS = 4;

var appendWizard = function () {
  for (var j = 0; j < COUNT_WIZARDS; j++) { // цикл для генерации магов и вставки в массив wizards
    wizards.push({
      name: WIZARD_NAMES[getRandomIndex(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SUR_NAME[getRandomIndex(0, WIZARD_SUR_NAME.length - 1)],
      coatColor: WIZARD_COAT_COLOR[getRandomIndex(0, WIZARD_COAT_COLOR.length - 1)],
      eyesColor: WIZARD_EYES_COLOR[getRandomIndex(0, WIZARD_EYES_COLOR.length - 1)]
    });
  }
};

appendWizard();

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) { // функция по созданию ДОМ мага (одного мага)
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment(); // создаем контейнер для хранения ДОМ мага

var appendWizardsInFragment = function () { // функция для генерации 4-х ДОМ магов и вставки в контейнер
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  var similarListElement = setupDialog.querySelector('.setup-similar-list');

  similarListElement.appendChild(fragment); // вставляем из контейнера в разметку 4-х ДОМ магов
};

appendWizardsInFragment(); // запуск фунции по герации 4-х ДОМ магов и вставки в контейнер

setupDialog.querySelector('.setup-similar').classList.remove('hidden'); // Вставка ДОМ магов из контейнера в разметку

// Блок открытия и закрытия настройки персонажа
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupDialog.querySelector('.setup-close');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setupDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Блок валидации ввода имени персонажа
var userNameInput = setupDialog.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () { // eslint выдает ошибку - почему, где ее использовать надо?
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов'); // not wark
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов, либо на англ. раскладке, либо на рус.');
  } else {
    target.setCustomValidity('');
  }
});

// Блок по изменению цвета глаз, фаербола и мантии при нажатии
var COLOR_WIZARD_COAT = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var wizardCoat = setupDialog.querySelector('.setup-wizard .wizard-coat');
var wizardCoatColor = document.forms[0]['coat-color'];

wizardCoat.addEventListener('click', function () { // событие по изменению цвета глаз мага при нажатии
  var colorCoat = COLOR_WIZARD_COAT[getRandomIndex(0, COLOR_WIZARD_COAT.length - 1)];
  wizardCoat.style.fill = colorCoat;
  wizardCoatColor.value = colorCoat;
});

var COLOR_WIZARD_EYES = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var wizardEyes = setupDialog.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesColor = document.forms[0]['eyes-color'];

wizardEyes.addEventListener('click', function () { // событие по изменению цвета глаз мага при нажатии
  var colorEyes = COLOR_WIZARD_EYES[getRandomIndex(0, COLOR_WIZARD_EYES.length - 1)];
  wizardEyes.style.fill = colorEyes;
  wizardEyesColor.value = colorEyes;
});

var COLOR_WIZARD_FIREBALL = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var wizardFireball = setupDialog.querySelector('.setup-fireball-wrap');
var wizardFireballColor = document.forms[0]['fireball-color'];

wizardFireball.addEventListener('click', function () { // событие по изменению цвета фаербола при нажатии
  var colorFireball = COLOR_WIZARD_FIREBALL[getRandomIndex(0, COLOR_WIZARD_FIREBALL.length - 1)];
  wizardFireball.style.background = colorFireball;
  wizardFireballColor.value = colorFireball;
});
