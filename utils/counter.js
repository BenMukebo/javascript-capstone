import { fetch } from '../__mocks__/fetch.js';

export const getCommentsCount = (itemId) => {
  return fetch(itemId).then((response) => {
    return response.data;
  });
};