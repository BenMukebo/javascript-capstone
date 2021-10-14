// import _ from 'lodash';
import { postComment, getComments } from './api.js';

const popupModal = document.querySelector('.popup-modal');
const btnClosePopupModal = document.querySelector('.btn-close-popup-modal');
const modalContentContainer = document.querySelector('.popup-modal-content-container');
const container = document.querySelector('.lists');

export const showMessage = (message) => {
  const form = document.querySelector('form');
  const messageText = form.childNodes[1];
  messageText.innerHTML = message;
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
    <form action="#" method="POST" class="flex flex-col bg-gray-200 px-8 md:px-32 lg:px-52 xl:px-64 md:pt-5">
      <p id="alertMessage">Message: </p>
      <input type="text" id="commenterName" placeholder="Your name" class="p-3 my-3 rounded-md shadow-3xl border border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400" />
      <textarea type="text" id="commenterMessage" placeholder="Your insights" class="p-3 my-3 rounded-md shadow-3xl border border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"></textarea>
      <button class="bg-transparent focus:outline-none border border-2 border-blue-400 hover:bg-blue-500 hover:text-white text-gray-500 w-32 h-10 rounded-tr-full rounded-bl-full shadow-3xl my-3 submit-comment" type="button">Comment</button>
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
  const formButton = form.childNodes[7];

  formButton.addEventListener('click', async (e) => {
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
      showMessage('All input fields are required');
    }
  });
};

const renderModalContent = (data) => {
  modalContentContainer.innerHTML = `
    <div class="mx-7 mb-8 bg-blue-400 md-h-30 overflow-hidden">
      <img src="${data.imageUrl}" alt="placeholder 2" class="w-full h-full">
    </div>
    <h3 class="text-lg md:text-2xl leading-6 font-medium text-gray-900" id="modal-title">
      ${data.title}
    </h3>
    <div class="mt-5 md:mt-8 pb-2 border-b-2 border-gray-300 md:mx-7">
      <p class="text-sm md:text-lg md:text-left text-gray-500">Author: ${data.author}</p>
      <p class="text-sm md:text-lg md:text-left text-gray-500">Date: ${data.date} at ${data.time}</p>
    </div>
    <div class="my-5 md:my-8">
      <p class="text-sm md:text-lg text-gray-500 text-justify md:mx-7">${data.content}</p>
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

export const renderNews = (dataNews) => {
  dataNews.forEach((data) => {
    const li = document.createElement('li');
    li.classList.add('list-item', 'd-flex');
    li.innerHTML = `
      <div class="image">
        <img src=${data.imageUrl} alt=${data.time}>
      </div>
      <div class="body d-flex">
        <h3>${data.title.slice(0, 60)}...</h3>
        <div class="like-news">
          <button>
            <span class="material-icons">favorite_border</span>
          </button>
          <p><span data-id="likes"></span> Likes</p>
        </div>
      </div>
      <div class="comntBtn">
        <button class="item-comment-button">Comment</button>
      </div>`;
    container.append(li);
    modalTrigger(li, data);
  });
};
