import '../css/styles.css';
import { modalTrigger } from './dom.js';
import { getResponse } from './api.js';

window.onload = () => {
  modalTrigger();
  // modalContent();
  getResponse();
};