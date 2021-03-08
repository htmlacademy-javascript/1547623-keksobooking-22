const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMAGE = 'img/muffin-grey.svg';

const avatarChooserElement = document.querySelector('.ad-form-header__input');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const housingChooserElement = document.querySelector('.ad-form__input');
const housingPreviewElement = document.querySelector('.ad-form__photo img');
const photoPreviewElements = document.querySelectorAll('.photo-preview');
const fileChooserElements = document.querySelectorAll('.file-chooser');

setChangeEventPhoto(housingChooserElement, housingPreviewElement);
setChangeEventPhoto(avatarChooserElement, avatarPreviewElement);

function setChangeEventPhoto(input, preview) {
  input.addEventListener('change', () => {
    setPhoto(input, preview);
  });
}

function setPhoto(input, preview) {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

function resetPhoto() {
  setDefaultValues(fileChooserElements, 'value', '');
  setDefaultValues(photoPreviewElements, 'src', DEFAULT_IMAGE);
}

function setDefaultValues(element, attribute, value) {
  if (element.length) {
    element.forEach((item) => (item[attribute] = value));
  } else {
    element[attribute] = value;
  }
}

export { resetPhoto };
