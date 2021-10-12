import '../css/styles.css';
import { getResponse } from './api.js';
import { modalTrigger, renderModalContent } from './dom.js';

window.onload = () => {
  getResponse();
  renderModalContent();
  modalTrigger();
};