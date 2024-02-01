const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
let instance; // Глобальна змінна екземпляру класу бібліотеки basicLightbox
let isShowed = false; // Глобальна змінна що фіксує коли модальне вікно відкрите, або закрите

const galleryEl = document.querySelector(".gallery"); // отримання посилання на ul.gallery

// функція створення розмітки для подальшого відображення елементів на сторінці
function createMarcup({ preview, original, description }) {
  const marcup = `<li class="gallery-item">
                    <a class="gallery-link" href="${original}">
                      <img
                        class="gallery-image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                      />
                    </a>
                  </li>`;
  return marcup;
}
let marcupAll = ""; // Глобальна змінна для збереження повної розмітки

for (let image of images) {
  marcupAll += createMarcup(image); //в циклі створюємо повну розмітку
}
galleryEl.innerHTML = marcupAll; //вставляємо готову розмітку

// функція створення модалбьного вікна з картинкою бібліотеки BasicLightbox
function createBasicLightboxInstance(source) {
  const marcupModal = `<div class="modal">
                          <img src="${source}" width="1112" height="640">
                        </div>`;

  instance = basicLightbox.create(marcupModal, {
    onShow: (instance) => {
      isShowed = true;
    },
    onClose: (instance) => {
      isShowed = false;
    },
    closable: true, //модальне вікно може закриватися при кліку по бекдропу
  });
}

//обробник кліку
galleryEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    // Перевірка чи користувач клікнув між картинками
    return;
  }
  createBasicLightboxInstance(event.target.dataset.source); // виклик функції створення та передача картинки що потрібно створити
  instance.show(); // показ модального вікна
});

//Обробник кліку по клавіші ESCAPE
document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && isShowed === true) {
    instance.close();
  }
});
