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
const blockName = document.querySelector(".new-request__input-block_name");
const inputName = blockName.querySelector('.new-request__input');
const errorText = blockName.querySelector(".new-request__input-error");
const selectArray = document.querySelectorAll('.new-request__select');
const photoBlock = document.querySelector(".new-request__photo-block");
const addMorePhotoBlock = document.querySelector(".new-request__add-photo-block");
const sendFormButton = document.querySelector(".new-request__send-button");

const oldRequestPage = document.querySelector(".old-request");
const sendFormButtonOld = oldRequestPage.querySelector('.old-request__send-button')
const selectArrayOld = document.querySelectorAll('.old-request__select');
const finalPageOld = document.querySelector(".final-page-old");
document.querySelectorAll('.request__item-button').forEach((elem) => {
  elem.addEventListener("click", (e) => {
    oldRequestPage.classList.remove('old-request_disable');
    main.classList.add("main_disable");
  })
})

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
  api.getRequests()
  .then(data => console.log(data))
  .catch(err => console.log(err))
  let app = window.Telegram.WebApp;
  let query = app.initData;
  let user_data_str = parseQuery(query).user;
  let user_data = JSON.parse(user_data_str);
  app.expand();
  app.disableVerticalSwipes();
  app.ready();
  // отмена закрытия по свайпу
  setTimeout(() => {
    console.log(app.isVerticalSwipesEnabled)
  }, 1000)
  userChatId = user_data["id"];
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
});
inputName.addEventListener("input", (evt) => {
  if (evt.target.value.trim() == '') {
    inputName.classList.add('new-request__input_error');
    errorText.classList.add("new-request__input-error_active");
  }
  else {
    inputName.classList.remove('new-request__input_error');
    errorText.classList.remove("new-request__input-error_active");
  }
});
selectArray.forEach((selectElem) => {
  customSelect(selectElem);
  selectElem.addEventListener('change',
    (e) => { 
      if (selectElem.id == 'targetSelect' && (e.target.value == 1 || e.target.value == 2)) {
        photoBlock.classList.remove('new-request__photo-block_disable');
        addMorePhotoBlock.style.display = 'flex';
      }
      else {
        photoBlock.classList.add('new-request__photo-block_disable');
        addMorePhotoBlock.style.display = 'none';
      }
    });
});
selectArrayOld.forEach((selectElem) => {
  customSelect(selectElem);
});
function resetInput(input) {
  input.value = null;
  input.disabled = true;
  input.placeholder = '';
}
function turnInput(input) {
  input.disabled = false;
  input.placeholder = '№ каталога (лат.)';
}
function changePlaceHolderNaim(input) {
  input.placeholder = 'Наименование';
}
function changePlaceHolderOpis(input) {
  input.placeholder = 'Описание';
}
function getFileSelected(e) {
  if (!e.target.files.length) {
    console.log('ничего не загружено');
    const hiddenInput = e.target.closest('.new-request__first-left-row').querySelector('.new-request__first-left-row-input')
    turnInput(hiddenInput);
    e.target.closest('.new-request__first-left-row').querySelector('.new-request__first-close-input').classList.remove("new-request__first-close-input_active");
    return;
  }
  const fileReader = new FileReader();
  fileReader.readAsDataURL(e.target.files[0]);
  fileReader.onload = function() {
    const lastInput = e.target.closest('.new-request__photo-item').querySelector('.new-request__second-row-input')
    const hiddenInput = e.target.closest('.new-request__first-left-row').querySelector('.new-request__first-left-row-input')
    const textEl = e.target.closest('.new-request__first-left-row').querySelector('.new-request__first-close-input-text')
    textEl.textContent = e.target.files[0].name;
    resetInput(hiddenInput);
    changePlaceHolderOpis(lastInput);
    // setFileInput(e.target.files[0]);
    // setSendPhotoText('Отправить');
    // setSendButtonClass('photo-step__send-btn');
    // setFirstStep('first-step first-step_disable');
    // setPhotoStep('photo-step');
  }
}

let clickerCount = 2;
const template = document.getElementById('photoItemTemplate').content;
addMorePhotoBlock.addEventListener("click", () => {
  let detailsCounterOther = 1;
  const newItem = template.cloneNode(true);
  const catalogInput = newItem.querySelector(".new-request__first-left-row-input");
  const countElement = newItem.querySelector('.new-request__first-right-row-count');
  const photoInput = newItem.querySelector(".new-request__first-left-row-file");
  const closeInputEl = newItem.querySelector(".new-request__first-close-input");
  const closeInputText = newItem.querySelector('.new-request__first-close-input-text');
  const hiddenInput = newItem.querySelector('.new-request__first-left-row-file');
  const lastInput = newItem.querySelector(".new-request__second-row-input");
  photoInput.addEventListener("click", (evt) => {
    evt.target.value = null;
  })
  photoInput.addEventListener("change", (evt) => {
    getFileSelected(evt);
    evt.target.closest('.new-request__first-left-row').querySelector('.new-request__first-close-input').classList.add("new-request__first-close-input_active");
  });
  newItem.querySelector('.new-request-photo-label-count').textContent = clickerCount;
  newItem.querySelector(".new-request__first-right-row-decrease").addEventListener("click", () => {
    if (detailsCounterOther > 1) {
      detailsCounterOther--;
    }
    countElement.textContent = detailsCounterOther;
  });
  newItem.querySelector(".new-request__first-right-row-increase").addEventListener("click", () => {
    detailsCounterOther++;
    countElement.textContent = detailsCounterOther;
  });
  newItem.querySelector('.new-request__first-close-input-img').addEventListener('click', (evt) => {
    closeInputEl.classList.remove("new-request__first-close-input_active");
    closeInputText.textContent = '';
    hiddenInput.value = null;
    turnInput(catalogInput);
    changePlaceHolderNaim(lastInput)
  })
  photoBlock.appendChild(newItem);
  clickerCount++;
});

let detailsCounterFirst = 1;
document.querySelector(".new-request__first-right-row-decrease").addEventListener("click", () => {
  if (detailsCounterFirst > 1) {
    detailsCounterFirst--;
  }
  document.querySelector('.new-request__first-right-row-count').textContent = detailsCounterFirst;
});
document.querySelector(".new-request__first-right-row-increase").addEventListener("click", () => {
  detailsCounterFirst++;
  document.querySelector('.new-request__first-right-row-count').textContent = detailsCounterFirst;
});
document.querySelector(".new-request__first-left-row-file").addEventListener("click", (evt) => {
  evt.target.value = null;
});
document.querySelector(".new-request__first-left-row-file").addEventListener("change", (evt) => {
  getFileSelected(evt);
  const closeInputText = document.querySelector(".new-request__first-close-input");
  closeInputText.classList.add("new-request__first-close-input_active");
});
document.querySelector('.new-request__first-close-input-img').addEventListener('click', (evt) => {
  document.querySelector(".new-request__first-close-input").classList.remove("new-request__first-close-input_active");
  document.querySelector('.new-request__first-close-input-text').textContent = '';
  document.querySelector('.new-request__first-left-row-file').value = null;
  turnInput(document.querySelector('.new-request__first-left-row-input'));
  changePlaceHolderNaim(document.querySelector('.new-request__second-row-input'));
})

sendFormButton.addEventListener("click", (evt) => {
  newRequestPage.classList.add('new-request_disable');
  finalPage.classList.add("final-page_active");
})

finalPageRequestButton.addEventListener("click", () => {
  finalPage.classList.remove("final-page_active");
  main.classList.remove('main_disable');
});
finalPageExitButton.addEventListener("click", () => {
  finalPage.classList.remove("final-page_active");
  main.classList.remove('main_disable');
});

sendFormButtonOld.addEventListener('click', (event) => {
  finalPageOld.classList.add("final-page-old_active");
  oldRequestPage.classList.add("old-request_disable");
});

document.querySelectorAll('.final-page-old__button').forEach((element) => {
  element.addEventListener("click", (evt) => {
    finalPageOld.classList.remove("final-page-old_active");
    main.classList.remove('main_disable');
  })
})