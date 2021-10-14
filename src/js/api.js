// eslint-disable-next-line import/no-cycle
import { renderNews } from './dom.js';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v3/articles';
const involvementAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EXlTe26DlB9I8ip8IWwa/likes';

export const getResponse = async () => {
  const get = await fetch(BASE_URL);
  const response = await get.json();
  renderNews(response);
};

export const getLikes = async () => {
  const response = await fetch(involvementAPI);
  if (!response.ok) {
    throw new Error(`API error! status: ${response.status}`);
  } else {
    const data = await response.json();
    localStorage.setItem('likes', JSON.stringify(data));
    return data;
  }
};

export const postLikes = async (id) => {
  try {
    const response = await fetch(involvementAPI, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => json);
    return response;
  } catch (e) {
    throw new Error(`API error! status: ${e.toString()}`);
  }
};
