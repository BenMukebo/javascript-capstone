import {
  postComment, getComments, postLikes, getLikes,
} from './api.js';
import involvement from './involement.js';

const popupModal = document.querySelector('.popup-modal');
const btnClosePopupModal = document.querySelector('.btn-close-popup-modal');
const modalContentContainer = document.querySelector('.popup-modal-content-container');
const container = document.querySelector('.lists');
const dateOptions = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
};

export const hideMessageBox = (element) => {
  setTimeout(() => {
    element.innerHTML = '';
    element.style.display = 'none';
  }, 5000);
};

export const showMessage = (message, type) => {
  const form = document.querySelector('form');
  const messageText = form.childNodes[1];
  messageText.innerHTML = message;
  messageText.style.display = 'block';

  if (type === 'success') {
    messageText.classList.remove('error-message');
    messageText.classList.add('success-message');
  } else if (type === 'error') {
    messageText.classList.remove('success-message');
    messageText.classList.add('error-message');
  }
  hideMessageBox(messageText);
};

export const renderComments = (commentsArray) => {
  if (commentsArray && commentsArray.length > 0) {
    const commentsCounterDiv = modalContentContainer.childNodes[9].childNodes[1];
    const commentsSection = modalContentContainer.childNodes[9].childNodes[3];
    commentsSection.innerHTML = '';
    commentsCounterDiv.innerHTML = `Comments (${commentsArray.length})`;

    commentsArray.forEach((object) => {
      commentsSection.innerHTML += `<div class="flex flex-wrap justify-start">
          <div class="flex items-center mb-1">
            <p class="bg-blue-200 text-green-600 py-1 px-2 font-bold flex flex-wrap">${object.creation_date.replaceAll('-', '/')}</p>
            <p class="bg-blue-200 text-blue-500 py-1 px-2 font-bold rounded-tr-full rounded-br-full flex flex-wrap">${object.username}</p>
          </div>
          <p class="py-1 px-4 font-normal text-justify">${object.comment}</p>
        </div>`;
    });
  }
};

const renderCommentForm = () => `
  <div class="my-5 md:my-8 pt-2 border-t-2 border-gray-200">
    <h4 class="mt-5 text-lg md:text-2xl leading-6 font-medium text-gray-500">
      Add a comment
    </h4>
    <form action="#" method="POST" class="flex flex-col px-8 md:px-10 lg:px-48 xl:px-64 md:pt-5">
      <p id="alertMessage" class="message-box"></p>
      <input type="text" id="commenterName" placeholder="Your name" class="p-3 my-3 rounded-md shadow-3xl border border-2 border-gray-300 focus:outline-none" />
      <textarea type="text" id="commenterMessage" placeholder="Your insights" class="p-3 my-3 rounded-md shadow-3xl border border-2 border-gray-300 focus:outline-none"></textarea>
      <button class="bg-transparent focus:outline-none hover:text-white text-gray-500 w-32 h-10 rounded-tr-full rounded-bl-full shadow-3xl my-3 submit-comment" type="submit">Comment</button>
    </form>
  </div>
`;

const resetInputFields = (args) => {
  args.forEach((arg) => {
    arg.value = '';
  });
};

const submitComment = (newsId) => {
  const form = document.querySelector('form');
  const commenterName = form.childNodes[3];
  const commenterMessage = form.childNodes[5];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (commenterName.value && commenterMessage.value !== '') {
      const newComment = {
        item_id: newsId.toString(),
        username: commenterName.value,
        comment: commenterMessage.value,
      };

      await postComment(newComment);
      getComments(newsId.toString());
      resetInputFields([commenterName, commenterMessage]);
    } else {
      showMessage('All input fields are required', 'error');
    }
  });
};

const renderModalContent = (data) => {
  const formattedDate = new Date(data.publishedAt).toLocaleString('en', dateOptions);
  const formattedTime = new Date(data.publishedAt).toLocaleTimeString('en', { timeStyle: 'short' });

  modalContentContainer.innerHTML = `
    <div class="mx-7 mb-8 bg-blue-400 md-h-30 overflow-hidden">
      <img src="${data.imageUrl}" alt="placeholder 2" class="w-full h-full">
    </div>
    <h3 class="text-lg md:text-2xl leading-6 font-medium text-gray-900" id="modal-title">
      ${data.title}
    </h3>
    <div class="mt-5 md:mt-8 pb-2 border-b-2 border-gray-300 md:mx-7">
      <p class="text-sm md:text-lg md:text-left text-gray-500">Author: ${data.newsSite}</p>
      <p class="text-sm md:text-lg md:text-left text-gray-500">
      Date: ${formattedDate} at ${formattedTime}</p>
    </div>
    <div class="my-5 md:my-8">
      <p class="text-sm md:text-lg text-gray-500 text-justify md:mx-7">${data.summary}</p>
    </div>
    <div class="my-5 md:my-8 pt-2 border-t-2 border-gray-200 comment-sections">
      <h4 class="mt-5 text-lg md:text-2xl leading-6 font-medium text-gray-500"></h4>
      <div class="mt-5 md:mt-8 text-left mx-3 md:mx-5 lg:mx-10 text-sm md:text-lg text-gray-500 space-y-4"></div>
    </div>
    ${renderCommentForm()}
  `;
  submitComment(data.id);
  getComments(data.id.toString());
};

const modalTrigger = (element, data) => {
  const btnOpenPopupModal = element.childNodes[5].childNodes[1];

  btnOpenPopupModal.addEventListener('click', () => {
    popupModal.classList.remove('hidden');
    renderModalContent(data);
  });

  btnClosePopupModal.addEventListener('click', () => popupModal.classList.add('hidden'));
};

const counter = document.querySelector('.counter');

const itemsCounter = (number) => {
  counter.innerText = `( ${number} )`;
};

export const renderNews = async (dataNews) => {
  dataNews.forEach(async (data) => {
    const likes = await getLikes().then((response) => involvement.likes(response, data.id));
    const li = document.createElement('li');
    li.classList.add('list-item', 'd-flex');
    li.innerHTML = `
      <div class="image">
        <img src=${data.imageUrl} alt=${data.time}>
      </div>
      <div class="body d-flex">
        <h3>${data.title.slice(0, 60)}...</h3>
        <div class="like-news">
          <button class="love focus:outline-none" id=${data.id}>
            <span class="material-icons">favorite_border</span>
          </button>
          <p><span class="like">${likes}</span> Likes</p>
        </div>
      </div>
      <div class="comntBtn">
      <button class="bg-transparent focus:outline-none hover:text-white text-gray-500 w-32 h-10 rounded-tr-full rounded-bl-full shadow-3xl my-3 submit-comment" type="button">Comments</button>
      </div>`;
    container.append(li);
    modalTrigger(li, data);

    const like = li.querySelector('.love');
    const likeNumbers = li.querySelector('.like');

    like.addEventListener('click', async () => {
      await postLikes(data.id);
      // eslint-disable-next-line max-len
      const updatedLikes = await getLikes().then((response) => involvement.likes(response, data.id));
      likeNumbers.innerText = updatedLikes;
    });
  });
  itemsCounter(dataNews.length);
};
