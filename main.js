(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); } })();

class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _getFetch(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
      });
  }

  getRequests(id = 1031422377) {
    const url = this._baseUrl + 'get_user_requests/?tguser_id=' + `${id}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }
    return this._getFetch(url, options);
  }

  // getProducts() {
  //   const url = this._secondUrl;
  //   const options = {
  //     method: 'GET',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //   }
  //   return this._getFetch(url, options);
  // }

  // postProduct(data) {
  //   const url = this._thirdUrl;
  //   const options = {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //     body: JSON.stringify(data),
  //   }
  //   return this._getFetch(url, options);
  // }
}

const api = new Api({
  baseUrl: 'https://biessemailapi.despdev.ru/'
});

let productId;

const main = document.querySelector('.main');
const finalPage = document.querySelector(".final-page");
const finalPageRequestButton = finalPage.querySelector(".final-page__button_request");
const finalPageExitButton = finalPage.querySelector(".final-page__button_exit");
const loader = document.querySelector(".loader");
const loadingPage = document.querySelector(".loading-page");

const headerButton = document.querySelector(".header__button");
const newRequestPage = document.querySelector(".new-request");
const newRequestBack = newRequestPage.querySelector('.new-request__back')
const blockName = document.querySelector(".new-request__input-block_name");
const inputName = blockName.querySelector('.new-request__input');
const errorText = blockName.querySelector(".new-request__input-error");
const selectArray = document.querySelectorAll('.new-request__select');
const photoBlock = document.querySelector(".new-request__photo-block");
const addMorePhotoBlock = document.querySelector(".new-request__add-photo-block");
const sendFormButton = document.querySelector(".new-request__send-button");
const snackbarRate = document.querySelector(".snackbar-rate");
const snackbarRateClose = snackbarRate.querySelector('.snackbar-rate__close');
const snackbarStars = snackbarRate.querySelectorAll(".snackbar-rate__star");
const snackbarRateTextarea = snackbarRate.querySelector('.snackbar-rate__input-wrapper');
const snackbarRateButton = snackbarRate.querySelector(".snackbar-rate__button");
const snackbarSuccess = document.querySelector('.snackbar-success');

const oldRequestPage = document.querySelector(".old-request");
const oldRequestCommentBtn = document.querySelector(".old-request__comment-button");
const oldRequestBack = oldRequestPage.querySelector(".old-request__back")
const selectArrayOld = document.querySelectorAll('.old-request__select');
const finalPageOld = document.querySelector(".final-page-old");
const snackbarComment = document.querySelector(".snackbar-comment");
const snackbarCommentSuccess = document.querySelector(".snackbar-comment-success");
const snackbarDelete = document.querySelector(".snackbar-delete");

const editRequestPage = document.querySelector(".edit-request");
const editRequestBack = editRequestPage.querySelector(".edit-request__back");

var im = new Inputmask("+7 999 999 99 99");
im.mask(document.querySelector('.new-request__input-block_number .new-request__input'))

var im2 = new Inputmask("+7 999 999 99 99");
im2.mask(document.querySelector('.edit-request__input-block_number .edit-request__input'))
const requestsObject = {
  '0': {
    "request_id": "4",
    "request_1c_id": "", 
    "name": "Компания",
    "request_status": "Not sent",
    "created": "2024-07-10 08:10:25.313682+00:00",
    "changed": "2024-07-10 09:05:25.313682+00:00",
    "model": "ROVER AS",
    "fio": "Иванов Иван Иванович",
    "number": "+7 999 999 99 99",
    "city": "Москва",
    "adress": "Пушкина, 21",
    "serial_num": "4222222222222222",
    "state": "Рабочая",
    "comments": {
      "date": "25.10.2022, 13:00",
      "description": "Lorem ipsum dolor sit amet consectetur. Phasellus diam eget sem orci. Vulputate elit augue lacus suspendisse pharetra pharetra."
    },
    "media": "namefile.png"

  },
  '1': {
    "request_id": "5",
    "request_1c_id": "№ 11-247", 
    "created": "2024-08-11 15:10:25.313682+00:00",
    "accepted": "2024-08-12 11:30:25.313682+00:00",
    "changed": "2024-08-11 16:00:25.313682+00:00",
    "name": "Рога и Копыта",
    "request_status": "Sent",
    "model": "GROOVER ASS",
    "fio": "Олегов Олег Олегович",
    "number": "+7 000 000 99 99",
    "city": "Челябинск",
    "adress": "Пушкина, 21",
    "serial_num": "411111111111",
    "state": "Ограниченная",
    "comments": {
      "date": "11.09.1918, 13:00",
      "description": "Lorem ipsum dolor sit amet consectetur. Phasellus diam eget sem orci. Vulputate elit augue lacus suspendisse pharetra pharetra."
    },
    "media": "capture.png"
  },
  '2': {
    "request_id": "6",
    "request_1c_id": "№ 12-228", 
    "created": "2024-01-10 04:20:25.313682+00:00",
    "accepted": "2024-01-10 08:55:25.313682+00:00",
    "changed": "2024-01-10 09:15:25.313682+00:00",
    "name": "ООО бнал",
    "request_status": "Sent",
    "model": "QWERTY 12345 54321",
    "fio": "Станов Стан Станович",
    "number": "+7 111 222 33 33",
    "city": "Петрозаводск",
    "adress": "Пушкина, 21",
    "serial_num": "411111111111",
    "state": "Не рабочая",
    "comments": {
      "date": "01.08.2000, 13:00",
      "description": "Lorem ipsum dolor sit amet consectetur. Phasellus diam eget sem orci. Vulputate elit augue lacus suspendisse pharetra pharetra."
    },
    "media": "capture.png"
  },
  '3': {
    "request_id": "7",
    "request_1c_id": "", 
    "created": "2024-07-10 08:00:25.313682+00:00",
    "accepted": "2024-07-10 10:00:25.313682+00:00",
    "name": "Темки",
    "request_status": "Not sent",
    "model": "ROYALTY 123",
    "fio": "Парнов Олег Витальевич",
    "number": "+7 111 222 33 33",
    "city": "Магнитогорск",
    "adress": "Пушкина, 21",
    "serial_num": "434123121321",
    "state": "Ограниченная",
    "comments": {
      "date": "01.01.2001, 01:01",
      "description": "Lorem ipsum dolor sit amet consectetur. Phasellus diam eget sem orci. Vulputate elit augue lacus suspendisse pharetra pharetra."
    },
    "media": "capture.png"
  }
}

function formatDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

const requestItems = document.querySelector('.request__items');
const requestsArray = Object.keys(requestsObject).map(key => requestsObject[key]);

if (requestsArray.length == 0) {
  document.querySelector('.request__no-content').style.display = 'block';
  document.querySelector('.request__content').style.display = 'none';
}
let eventHandlerAdded = false;
requestsArray.forEach((elem) => {
  const templateRequest = document.getElementById('request-template').content.querySelector('.request__item');
  const requestElement = templateRequest.cloneNode(true);
  requestElement.dataset.requestId = elem.request_id;
  if (elem.request_1c_id == '') {
    requestElement.querySelector('.request__item-number').textContent = 'Новая заявка';
  }
  else {
    requestElement.querySelector('.request__item-number').textContent = elem.request_1c_id;
  }
  if (formatDate(elem.accepted) == 'Invalid Date') {
    requestElement.querySelector('.request__item-date_accepted').style.display = 'none';
  }
  if (formatDate(elem.changed) == 'Invalid Date') {
    requestElement.querySelector('.request__item-date_changed').style.display = 'none';
  }
  if (formatDate(elem.created) == 'Invalid Date') {
    requestElement.querySelector('.request__item-date_created').style.display = 'none';
  }
  if (elem.request_status == 'Not sent') {
    requestElement.querySelector('.request__status_ok').style.display = 'none';
  }
  else if (elem.request_status == "Sent") {
    requestElement.querySelector('.request__status_wait').style.display = 'none';
  }
  requestElement.querySelector('.request__item-only-date_created').textContent = formatDate(elem.created);
  requestElement.querySelector('.request__item-only-date_changed').textContent = formatDate(elem.changed)
  requestElement.querySelector('.request__item-only-date_accepted').textContent = formatDate(elem.accepted);
  requestElement.querySelector('.request__item-only-model').textContent = elem.model;
  requestElement.querySelector('.request__item-button_view').addEventListener("click", (e) => {
    fileCount = 0;
    oldRequestPage.classList.remove('old-request_disable');
    oldRequestPage.dataset.reqId = elem.request_id;
    main.classList.add("main_disable");
    // передача инфы в old-request-page
    if (elem.request_1c_id == '') {
      oldRequestPage.querySelector('.old-request__title').textContent = 'Новая заявка';
      document.querySelector('.snackbar-comment__number').textContent = '';
    }
    else {
      oldRequestPage.querySelector('.old-request__title').textContent = elem.request_1c_id;
      document.querySelector('.snackbar-comment__number').textContent = elem.request_1c_id;
    }
    oldRequestPage.querySelector('.old-request__block_fio .old-request__value').textContent = elem.fio;
    oldRequestPage.querySelector('.old-request__block_number .old-request__value').textContent = elem.number;
    oldRequestPage.querySelector('.old-request__block_name .old-request__value').textContent = elem.name;
    oldRequestPage.querySelector('.old-request__block_city .old-request__value').textContent = elem.city;
    oldRequestPage.querySelector('.old-request__block_adress .old-request__value').textContent = elem.adress;
    oldRequestPage.querySelector('.old-request__block_model .old-request__value').textContent = elem.model;
    oldRequestPage.querySelector('.old-request__block_serial-num .old-request__value').textContent = elem.serial_num;
    oldRequestPage.querySelector('.old-request__block_state .old-request__value').textContent = elem.state;
    oldRequestPage.querySelector('.old-request__block_comments .old-request__label').textContent = `Описание проблемы (${elem.comments.date})`;
    oldRequestPage.querySelector('.old-request__block_comments .old-request__value').textContent = elem.comments.description;
    oldRequestPage.querySelector('.old-request__block_media .old-request__media-block').textContent = elem.media;

    oldRequestCommentBtn.addEventListener('click', () => {
        snackbarComment.classList.add('snackbar-comment_active');
        console.log('oldRequestCommentBtn.addEventListener');
    });
    
    document.querySelector('.old-request__copy-button').addEventListener('click', () => {
      oldRequestPage.classList.add('old-request_disable');
      newRequestPage.classList.remove('new-request_disable');

      newRequestPage.querySelectorAll('.media-input-wrapper').forEach(elem => elem.remove());
      // копирование данных
      newRequestPage.querySelector('.new-request__input-block_fio .new-request__input').value = elem.fio;
      newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value = elem.number;
      newRequestPage.querySelector('.new-request__input-block_name .new-request__input').value = elem.name;
      newRequestPage.querySelector('.new-request__input-block_city .new-request__input').value = elem.city;
      newRequestPage.querySelector('.new-request__input-block_adress .new-request__input').value = elem.adress;
      newRequestPage.querySelector('.new-request__input-block_model .new-request__input').value = elem.model;
      newRequestPage.querySelector('.new-request__input-block_serial-num .new-request__input').value = elem.serial_num;
      newRequestPage.querySelector('.new-request__input-block_comments .new-request__input').value = elem.comments.description;
      if ((newRequestPage.querySelector('.new-request__input-block_fio .new-request__input').value.trim() == '') || (newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.includes('_') || newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.trim() == '') || (newRequestPage.querySelector('.new-request__input-block_name .new-request__input').value.trim() == '') || (newRequestPage.querySelector('.new-request__input-block_city .new-request__input').value.trim() == ''))
        {
          sendFormButton.classList.remove('new-request__send-button_active');
        }
        else {
          sendFormButton.classList.add('new-request__send-button_active');
        }
      const cstSel =  document.querySelector('.new-request .customSelect').customSelect;
      if (elem.state == 'Рабочая') {
        cstSel.value = 1;
      }
      else if (elem.state == 'Ограниченная') {
        cstSel.value = 2;
      } else if (elem.state == 'Не рабочая') {
        cstSel.value = 3;
      }
    });
  });
  requestItems.appendChild(requestElement);
});
snackbarComment.querySelector('.snackbar-comment__close').addEventListener('click', () => {
  snackbarComment.classList.remove('snackbar-comment_active');
  clearSnackbarComment();
});
snackbarComment.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    snackbarComment.classList.remove('snackbar-comment_active');
    clearSnackbarComment();
  }
});
snackbarComment.querySelector('.snackbar-comment__input').addEventListener('input', (evt) => {
  if (evt.target.value.trim() != '') {
    snackbarComment.querySelector('.snackbar-comment__button').classList.add('snackbar-comment__button_active')
  }
  else {
    snackbarComment.querySelector('.snackbar-comment__button').classList.remove('snackbar-comment__button_active')
  }
});
document.querySelector('.snackbar-comment__button').addEventListener("click", (evt) => {
  clearSnackbarComment();
  snackbarComment.classList.remove('snackbar-comment_active')
  snackbarCommentSuccess.classList.add("snackbar-comment-success_active");
  setTimeout((() => {
    snackbarCommentSuccess.classList.remove("snackbar-comment-success_active");
  }), 3500)
});
document.querySelector('.old-request__edit-button').addEventListener('click', (evt) => {
  fileCountEdit = 0;
  oldRequestPage.classList.add('old-request_disable');
  document.querySelector('.edit-request').classList.remove('edit-request_disable');

  const reqId = evt.target.closest('.old-request').dataset.reqId;
  const targetRequest = requestsArray.find((item) => item.request_id == reqId);
  console.log(targetRequest)
  editRequestPage.querySelectorAll('.media-input-wrapper').forEach(elem => elem.remove());
      // копирование данных
  editRequestPage.querySelector('.edit-request__input-block_fio .edit-request__input').value = targetRequest.fio;
  editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value = targetRequest.number;
  editRequestPage.querySelector('.edit-request__input-block_name .edit-request__input').value = targetRequest.name;
  editRequestPage.querySelector('.edit-request__input-block_city .edit-request__input').value = targetRequest.city;
  editRequestPage.querySelector('.edit-request__input-block_adress .edit-request__input').value = targetRequest.adress;
  editRequestPage.querySelector('.edit-request__input-block_model .edit-request__input').value = targetRequest.model;
  editRequestPage.querySelector('.edit-request__input-block_serial-num .edit-request__input').value = targetRequest.serial_num;
  editRequestPage.querySelector('.edit-request__input-block_comments .edit-request__input').value = null;
  const cstSel =  document.querySelector('.edit-request .customSelect').customSelect;
      if (targetRequest.state == 'Рабочая') {
        cstSel.value = 1;
      }
      else if (targetRequest.state == 'Ограниченная') {
        cstSel.value = 2;
      } else if (targetRequest.state == 'Не рабочая') {
        cstSel.value = 3;
      }

  if ((editRequestPage.querySelector('.edit-request__input-block_fio .edit-request__input').value.trim() == '') || (editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.includes('_') || editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.trim() == '') || (editRequestPage.querySelector('.edit-request__input-block_name .edit-request__input').value.trim() == '') || (editRequestPage.querySelector('.edit-request__input-block_city .edit-request__input').value.trim() == ''))
    {
      document.querySelector('.edit-request__send-button').classList.remove('edit-request__send-button_active');
    }
    else {
      document.querySelector('.edit-request__send-button').classList.add('edit-request__send-button_active');
    }
})
editRequestPage.querySelector('.edit-request__reject-button').addEventListener('click', () => {
  editRequestPage.classList.add('edit-request_disable');
  main.classList.remove('main_disable');
});
editRequestPage.querySelector('.edit-request__send-button').addEventListener('click', () => {
  editRequestPage.classList.add('edit-request_disable');
  finalPage.classList.add('final-page_active');
  finalPage.querySelector('.final-page__title').textContent = 'Ваша заявка была отредактирована';
});



document.querySelector('.old-request__delete-button').addEventListener('click', () => {
  snackbarDelete.classList.add('snackbar-delete_active');
});
document.querySelector('.snackbar-delete__close').addEventListener('click', () => {
  snackbarDelete.classList.remove('snackbar-delete_active');
});
document.querySelector('.snackbar-delete__button_reject').addEventListener('click', () => {
  snackbarDelete.classList.remove('snackbar-delete_active');
});
document.querySelector('.snackbar-delete__button_delete').addEventListener('click', () => {
  snackbarDelete.classList.remove('snackbar-delete_active');
  oldRequestPage.classList.add('old-request_disable');
  main.classList.remove('main_disable');
});
snackbarDelete.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    snackbarDelete.classList.remove('snackbar-delete_active');
  }
});
function clearSnackbarComment() {
  snackbarComment.querySelector('.snackbar-comment__input').value = null;
}
function clearSnackbarRate() {
  snackbarStars.forEach((star) => {
    star.classList.remove('snackbar-rate__star_active');
  });
  setTimeout(() => {
    snackbarRateTextarea.style.display = 'none';
  }, 200)
  snackbarRateButton.classList.remove('snackbar-rate__button_active');
  snackbarRateTextarea.querySelector('.snackbar-rate__input').value = null;
}

snackbarRateClose.addEventListener('click', () => {
  snackbarRate.classList.remove('snackbar-rate_active');
  clearSnackbarRate();
});
snackbarRate.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    snackbarRate.classList.remove('snackbar-rate_active');
    clearSnackbarRate();
  }
});
snackbarStars.forEach((star, index) => {
  star.addEventListener("click", (e) => {
    snackbarRateButton.classList.add('snackbar-rate__button_active');
    snackbarStars.forEach((s, i) => {
      s.classList.toggle("snackbar-rate__star_active", i <= index);
    });
    // Выводим рейтинг в консоль
    console.log(`Рейтинг: ${index + 1} из 5`);
    if (index + 1 <= 2)  {
      snackbarRateTextarea.style.display = 'block';
    }
    else {
      snackbarRateTextarea.style.display = 'none';
    }
  })
});
snackbarRateButton.addEventListener('click', () => {
  snackbarRate.classList.add('snackbar-rate_disable');
  main.classList.remove('main_disable');
  snackbarSuccess.classList.add('snackbar-success_active');
  setTimeout(() => {
    snackbarSuccess.classList.remove('snackbar-success_active');
  }, 3500);
  clearSnackbarRate();
});

newRequestBack.addEventListener('click', () => {
  newRequestPage.classList.add('new-request_disable');
  main.classList.remove('main_disable');
});

const addMediaBtn = document.querySelector('.new-request-media__add-file');
const mediaContainer = document.querySelector('.new-request__input-block_media');
let fileCount = 0;

addMediaBtn.addEventListener('click', (e) => {
  if (fileCount >= 5) {
    return
  }
  const fileWrapper = document.createElement('div');
  fileWrapper.classList.add("media-input-wrapper");
  const fileName = document.createElement('p');
  const fileClose = document.createElement('img');
  const fileLoading = document.createElement('img');
  fileLoading.classList.add("file-loading");
  fileClose.classList.add("file-close");
  fileLoading.src = './assets/images/tabler_loader.svg';
  fileClose.src = './assets/images/close-media.svg';
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.classList.add('media-input');
  fileWrapper.dataset.numberInput = fileCount;
  fileWrapper.appendChild(fileInput);
  fileWrapper.appendChild(fileName);
  fileWrapper.appendChild(fileClose);
  fileWrapper.prepend(fileLoading);
  fileInput.click();

  fileClose.addEventListener('click', () => {
    fileWrapper.remove();
    fileCount--;
  });

  fileInput.addEventListener('change', () => {
    fileName.textContent = 'Загрузка...';
    fileClose.style.opacity = "0";
    if (fileInput.files[0].size > 200 * 1024 * 1024) {
      alert(`Максимальный размер файла: 200 МБ`);
      return;
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      // Здесь можно обработать загруженный файл
      console.log('загрузка окончена');
      fileClose.style.opacity = "1";
      fileName.textContent = fileInput.files[0].name;
      fileLoading.style.display = 'none';
    };
    reader.readAsDataURL(fileInput.files[0])
    mediaContainer.appendChild(fileWrapper);
    fileCount++;
  });
});



function getClass(bool) {
  if (bool) {
    return 'card__button';
  }
  else {
    return 'card__button card__button_disable';
  }
}

function parseQuery(queryString) {
  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

let userChatId;
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loadingPage.classList.add('loading-page_disable');
    main.classList.remove('main_disable');
  }, 2500)
  // api.getRequests()
  // .then(data => console.log(data))
  // .catch(err => console.log(err))
  // let app = window.Telegram.WebApp;
  // let query = app.initData;
  // let user_data_str = parseQuery(query).user;
  // let user_data = JSON.parse(user_data_str);
  // app.expand();
  // app.disableVerticalSwipes();
  // app.ready();
  // // отмена закрытия по свайпу
  // setTimeout(() => {
  //   console.log(app.isVerticalSwipesEnabled)
  // }, 1000)
  // userChatId = user_data["id"];
});

function vibro() {
  let detect = new MobileDetect(window.navigator.userAgent);
  if (detect.os() === 'iOS') {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
  }
  else {
    if ("vibrate" in navigator) {
      // Вибрируем устройство в течение 1000 миллисекунд (1 секунда)
      navigator.vibrate(10);
    } else {
      // Ваш браузер не поддерживает API вибрации
      console.log("Ваш браузер не поддерживает API вибрации.");
    }
  }
}


headerButton.addEventListener('click', () => {
  main.classList.add("main_disable");
  newRequestPage.classList.remove("new-request_disable");
  newRequestPage.querySelectorAll('input').forEach((input) => {
    input.value = null;
  });
  newRequestPage.querySelector('textarea').value = null;
  newRequestPage.querySelectorAll('.media-input-wrapper').forEach(elem => elem.remove());
  fileCount = 0;
  sendFormButton.classList.remove('new-request__send-button_active');
});

newRequestPage.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', (evt) => {
    if (newRequestPage.querySelector('.new-request__input-block_fio .new-request__input').value.trim() == '') {
      newRequestPage.querySelector('.new-request__input-block_fio .new-request__input-error').classList.add('new-request__input-error_active')
    }
    if (newRequestPage.querySelector('.new-request__input-block_fio .new-request__input').value.trim() != '') {
      newRequestPage.querySelector('.new-request__input-block_fio .new-request__input-error').classList.remove('new-request__input-error_active')
    }
    if (newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.includes('_') || newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.trim() == '') {
      newRequestPage.querySelector('.new-request__input-block_number .new-request__input-error').classList.add('new-request__input-error_active')
    }
    if (!newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.includes('_') && newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.trim() != '') {
      newRequestPage.querySelector('.new-request__input-block_number .new-request__input-error').classList.remove('new-request__input-error_active')
    }
    if (newRequestPage.querySelector('.new-request__input-block_name .new-request__input').value.trim() == '') {
      newRequestPage.querySelector('.new-request__input-block_name .new-request__input-error').classList.add('new-request__input-error_active')
    }
    if (newRequestPage.querySelector('.new-request__input-block_name .new-request__input').value.trim() != '') {
      newRequestPage.querySelector('.new-request__input-block_name .new-request__input-error').classList.remove('new-request__input-error_active')
    }
    if (newRequestPage.querySelector('.new-request__input-block_city .new-request__input').value.trim() == '') {
      newRequestPage.querySelector('.new-request__input-block_city .new-request__input-error').classList.add('new-request__input-error_active')
    }
    if (newRequestPage.querySelector('.new-request__input-block_city .new-request__input').value.trim() != '') {
      newRequestPage.querySelector('.new-request__input-block_city .new-request__input-error').classList.remove('new-request__input-error_active')
    }
    if ((newRequestPage.querySelector('.new-request__input-block_fio .new-request__input').value.trim() == '') || (newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.includes('_') || newRequestPage.querySelector('.new-request__input-block_number .new-request__input').value.trim() == '') || (newRequestPage.querySelector('.new-request__input-block_name .new-request__input').value.trim() == '') || (newRequestPage.querySelector('.new-request__input-block_city .new-request__input').value.trim() == ''))
    {
      sendFormButton.classList.remove('new-request__send-button_active');
    }
    else {
      sendFormButton.classList.add('new-request__send-button_active');
    }
  })
})
const selectArrayEdit = document.querySelector('.edit-request__select');
customSelect(selectArrayEdit)
selectArray.forEach((selectElem) => {
  customSelect(selectElem);
})
selectArrayOld.forEach((selectElem) => {
  customSelect(selectElem);
});
const newRequestInputObject = {
  'fio': '',
  'number': '',
  'name': '',
  'city': '',
  "adress": '',
  'model': '',
  'serial-num': '',
  'state': '',
  'comments': '',
}
sendFormButton.addEventListener("click", (evt) => {
  newRequestPage.classList.add('new-request_disable');
  finalPage.classList.add("final-page_active");
  finalPage.querySelector('.final-page__title').textContent = 'Спасибо, Ваша заявка зарегистрирована';
})
document.getElementById('example').addEventListener("click", (evt) => {
  main.classList.add("main_disable");
  snackbarRate.classList.remove('snackbar-rate_disable');
});
document.querySelector('.snackbar-rate__close').addEventListener("click", (evt) => {
  main.classList.remove("main_disable");
  snackbarRate.classList.add('snackbar-rate_disable');
});
finalPageRequestButton.addEventListener("click", () => {
  finalPage.classList.remove("final-page_active");
  main.classList.remove('main_disable');
});
finalPageExitButton.addEventListener("click", () => {
  finalPage.classList.remove("final-page_active");
  main.classList.remove('main_disable');
});


oldRequestBack.addEventListener('click', () => {
  main.classList.remove('main_disable');
  oldRequestPage.classList.add("old-request_disable");
});



editRequestBack.addEventListener('click', () => {
  main.classList.remove('main_disable');
  editRequestPage.classList.add("edit-request_disable");
});
const addMediaBtnEdit = document.querySelector('.edit-request-media__add-file');
const mediaContainerEdit = document.querySelector('.edit-request__input-block_media');
let fileCountEdit = 0;

addMediaBtnEdit.addEventListener('click', (e) => {
  if (fileCountEdit >= 5) {
    return
  }
  const fileWrapper = document.createElement('div');
  fileWrapper.classList.add("media-input-wrapper");
  const fileName = document.createElement('p');
  const fileClose = document.createElement('img');
  const fileLoading = document.createElement('img');
  fileLoading.classList.add("file-loading");
  fileClose.classList.add("file-close");
  fileLoading.src = './assets/images/tabler_loader.svg';
  fileClose.src = './assets/images/close-media.svg';
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.classList.add('media-input');
  fileWrapper.dataset.numberInput = fileCountEdit;
  fileWrapper.appendChild(fileInput);
  fileWrapper.appendChild(fileName);
  fileWrapper.appendChild(fileClose);
  fileWrapper.prepend(fileLoading);
  fileInput.click();

  fileClose.addEventListener('click', () => {
    fileWrapper.remove();
    fileCountEdit--;
  });

  fileInput.addEventListener('change', () => {
    fileName.textContent = 'Загрузка...';
    fileClose.style.opacity = "0";
    if (fileInput.files[0].size > 200 * 1024 * 1024) {
      alert(`Максимальный размер файла: 200 МБ`);
      return;
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      // Здесь можно обработать загруженный файл
      console.log('загрузка окончена');
      fileClose.style.opacity = "1";
      fileName.textContent = fileInput.files[0].name;
      fileLoading.style.display = 'none';
    };
    reader.readAsDataURL(fileInput.files[0])
    mediaContainerEdit.appendChild(fileWrapper);
    fileCountEdit++;
  });
});

editRequestPage.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', (evt) => {
    if (editRequestPage.querySelector('.edit-request__input-block_fio .edit-request__input').value.trim() == '') {
      editRequestPage.querySelector('.edit-request__input-block_fio .edit-request__input-error').classList.add('edit-request__input-error_active')
    }
    if (editRequestPage.querySelector('.edit-request__input-block_fio .edit-request__input').value.trim() != '') {
      editRequestPage.querySelector('.edit-request__input-block_fio .edit-request__input-error').classList.remove('edit-request__input-error_active')
    }
    if (editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.includes('_') || editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.trim() == '') {
      editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input-error').classList.add('edit-request__input-error_active')
    }
    if (!editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.includes('_') && editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.trim() != '') {
      editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input-error').classList.remove('edit-request__input-error_active')
    }
    if (editRequestPage.querySelector('.edit-request__input-block_name .edit-request__input').value.trim() == '') {
      editRequestPage.querySelector('.edit-request__input-block_name .edit-request__input-error').classList.add('edit-request__input-error_active')
    }
    if (editRequestPage.querySelector('.edit-request__input-block_name .edit-request__input').value.trim() != '') {
      editRequestPage.querySelector('.edit-request__input-block_name .edit-request__input-error').classList.remove('edit-request__input-error_active')
    }
    if (editRequestPage.querySelector('.edit-request__input-block_city .edit-request__input').value.trim() == '') {
      editRequestPage.querySelector('.edit-request__input-block_city .edit-request__input-error').classList.add('edit-request__input-error_active')
    }
    if (editRequestPage.querySelector('.edit-request__input-block_city .edit-request__input').value.trim() != '') {
      editRequestPage.querySelector('.edit-request__input-block_city .edit-request__input-error').classList.remove('edit-request__input-error_active')
    }
    if ((editRequestPage.querySelector('.edit-request__input-block_fio .edit-request__input').value.trim() == '') || (editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.includes('_') || editRequestPage.querySelector('.edit-request__input-block_number .edit-request__input').value.trim() == '') || (editRequestPage.querySelector('.edit-request__input-block_name .edit-request__input').value.trim() == '') || (editRequestPage.querySelector('.edit-request__input-block_city .edit-request__input').value.trim() == ''))
    {
      document.querySelector('.edit-request__send-button').classList.remove('edit-request__send-button_active');
    }
    else {
      document.querySelector('.edit-request__send-button').classList.add('edit-request__send-button_active');
    }
  })
});






// document.querySelectorAll('.final-page-old__button').forEach((element) => {
//   element.addEventListener("click", (evt) => {
//     finalPageOld.classList.remove("final-page-old_active");
//     main.classList.remove('main_disable');
//   })
// })