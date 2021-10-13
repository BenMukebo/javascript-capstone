import placeholerImage from '../assets/images/placeholder2.jpg';

const popupModal = document.querySelector('.popup-modal');
const btnClosePopupModal = document.querySelector('.btn-close-popup-modal');
const modalContentContainer = document.querySelector('.popup-modal-content-container');
const container = document.querySelector('.lists');

const renderComments = () => `
  <div class="my-5 md:my-8 pt-2 border-t-2 border-gray-200">
      <h4 class="mt-5 text-lg md:text-2xl leading-6 font-medium text-gray-500">
        Comments (2)
      </h4>
      <div class="mt-5 md:mt-8 text-left mx-3 md:mx-5 lg:mx-10 text-sm md:text-lg text-gray-500 space-y-4">
        <div class="flex flex-wrap justify-start">
          <div class="flex items-center mb-1">
            <p class="bg-blue-200 text-green-600 py-1 px-2 font-bold">03/11/2021</p>
            <p class="bg-blue-200 text-blue-500 py-1 px-2 font-bold rounded-tr-full rounded-br-full">Ben:</p>
          </div>
          <p class="py-1 px-4 font-normal text-justify">I'd love the news</p>
        </div>
        <div class="flex flex-wrap justify-start">
          <div class="flex items-center mb-1">
            <p class="bg-blue-200 text-green-600 py-1 px-2 font-bold">03/11/2021</p>
            <p class="bg-blue-200 text-blue-500 py-1 px-2 font-bold rounded-tr-full rounded-br-full">Muhammad:</p>
          </div>
          <p class="py-1 px-4 font-normal text-justify">Yeah it's cool</p>
        </div>
      </div>
  </div>`;

const renderCommentForm = () => `
  <div class="my-5 md:my-8 pt-2 border-t-2 border-gray-200">
    <h4 class="mt-5 text-lg md:text-2xl leading-6 font-medium text-gray-500">
      Add a comment
    </h4>
    <form action="#" method="POST" class="flex flex-col bg-gray-200 px-8 md:px-32 lg:px-52 xl:px-64 md:pt-5">
      <input type="text" placeholder="Your name" class="p-3 my-3 rounded-md shadow-3xl border border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400" />
      <textarea type="text" placeholder="Your insights" class="p-3 my-3 rounded-md shadow-3xl border border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"></textarea>
      <button class="bg-transparent focus:outline-none border border-2 border-blue-400 hover:bg-blue-500 hover:text-white text-gray-500 w-32 h-10 rounded-tr-full rounded-bl-full shadow-3xl my-3" type="button">Comment</button>
    </form>
  </div>
`;

const modalTrigger = (element) => {
  const btnOpenPopupModal = element.childNodes[5].childNodes[1];

  btnOpenPopupModal.addEventListener('click', () => popupModal.classList.remove('hidden'));
  btnClosePopupModal.addEventListener('click', () => popupModal.classList.add('hidden'));
};

export const renderModalContent = () => {
  modalContentContainer.innerHTML += `
    <div class="mx-7 mb-8 bg-blue-400 md-h-30 overflow-hidden">
      <img src="${placeholerImage}" alt="placeholder 2" class="w-full h-full">
    </div>
    <h3 class="text-lg md:text-2xl leading-6 font-medium text-gray-900" id="modal-title">
      OnePlus signs Shahid & Mira Kapoor as brand ambassadors for its smart TV
    </h3>
    <div class="mt-5 md:mt-8 pb-2 border-b-2 border-gray-300 md:mx-7">
      <p class="text-sm md:text-lg md:text-left text-gray-500">Author: Jon Barris</p>
      <p class="text-sm md:text-lg md:text-left text-gray-500">Date: 10 Oct 2021, Sunday at 02:37 pm</p>
    </div>
    <div class="my-5 md:my-8">
      <p class="text-sm md:text-lg text-gray-500 text-justify md:mx-7">
        OnePlus announced Shahid Kapoor and Mira Rajput Kapoor as brand ambassadors for its smart TVs category. Alongside, an ad film for OnePlus TV U1S has been released featuring the couple. The film showcases Shahid and Mira engaging in an interaction that seeks to highlight OnePlus TV's hands-free voice control with Speak Now™️ feature and the product in a quirky take.
      </p>
    </div>
    ${renderComments()}
    ${renderCommentForm()}
  `;
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
        <h3>${data.title}</h3>
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
    modalTrigger(li);
  });
};
