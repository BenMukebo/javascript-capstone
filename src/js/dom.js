import placeholerImageOne from '../assets/images/placeholder2.jpg';

const popupModal = document.querySelector('.popup-modal');
const btnOpenPopupModal = document.querySelector('.btn-open-popup-modal');
const btnClosePopupModal = document.querySelector('.btn-close-popup-modal');
const modalContentContainer = document.querySelector('.popup-modal-content-container');

export const modalTrigger = () => {
  btnOpenPopupModal.addEventListener('click', () => popupModal.classList.remove('hidden'));
  btnClosePopupModal.addEventListener('click', () => popupModal.classList.add('hidden'));
};

export const modalContent = () => {
  modalContentContainer.innerHTML = `
    <div class="mx-7 mb-8 bg-blue-400 md-h-30 overflow-hidden">
      <img src="${placeholerImageOne}" alt="placeholder 2" class="w-full h-full">
    </div>
    <h3 class="text-lg md:text-2xl leading-6 font-medium text-gray-900" id="modal-title">
      OnePlus signs Shahid & Mira Kapoor as brand ambassadors for its smart TV
    </h3>
    <div class="mt-5 md:mt-8 pb-2 border-b-2 border-gray-300 md:mx-7">
      <p class="text-sm md:text-lg md:text-left text-gray-500">Author: Jon Barris</p>
      <p class="text-sm md:text-lg md:text-left text-gray-500">Date: 10 Oct 2021, Sunday at 02:37 pm</p>
    </div>
    <div class="mt-5 md:mt-8">
      <p class="text-sm md:text-lg text-gray-500 text-justify md:mx-7">
        OnePlus announced Shahid Kapoor and Mira Rajput Kapoor as brand ambassadors for its smart TVs category. Alongside, an ad film for OnePlus TV U1S has been released featuring the couple. The film showcases Shahid and Mira engaging in an interaction that seeks to highlight OnePlus TV's hands-free voice control with Speak Now™️ feature and the product in a quirky take.
      </p>
    </div>
    <div class="pt-2 border-t-2 border-gray-300">
      <h4 class="mt-5 text-lg md:text-2xl leading-6 font-medium text-gray-900">
        Comments (2)
      </h4>
      <ul class="mt-5 md:mt-8 text-left md:mx-48 text-sm md:text-lg text-gray-500 space-y-4">
        <li><span class="bg-green-200 py-1 px-2 rounded-full text-green-600 font-bold">03/11/2021</span> Ben: I'd love the news</li>
        <li><span class="bg-green-200 py-1 px-2 rounded-full text-green-600 font-bold">03/11/2021</span> Muhammd: Yeah, it's nice</li>
      </ul>
    </div>
  `;
};
