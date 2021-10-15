import { sampleData } from '../utils/sampleData.js';

export const fetch = (incomingItemId = null) => {
  let response = 0;

  try {
    if (incomingItemId) {
      sampleData.forEach((data) => {
        if (data.item_id === incomingItemId) {
          response = data.comments.length;
        }
      });
    } else {
      response = sampleData.length;
    }
  } catch (error) {
    throw new Error('Item id not found');
  }

  return Promise.resolve({ data: response });
};