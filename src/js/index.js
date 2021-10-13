import '../css/styles.css';
import { getResponse } from './api.js';
import { renderModalContent } from './dom.js';

window.onload = () => {
  renderModalContent();
  getResponse();
};