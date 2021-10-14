import { renderNews, renderComments, showMessage } from './dom.js';

const involvementApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const commentsUrl = '/apps/EXlTe26DlB9I8ip8IWwa/comments';
const likesUrl = '/apps/EXlTe26DlB9I8ip8IWwa/likes';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v3/articles';

export const getResponse = async () => {
  const get = await fetch(BASE_URL);
  const response = await get.json();
  renderNews(response);
};

export const postComment = async (data) => {
  await fetch(`${involvementApi}${commentsUrl}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        showMessage('Comment posted successfully');
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const getComments = async (incomingItemId) => {
  await fetch(`${involvementApi}${commentsUrl}?item_id=${incomingItemId}`)
    .then((response) => response.json())
    .then((data) => {
      const commentsArray = data;
      renderComments(commentsArray);
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const getLikes = async () => {
  const response = await fetch(`${involvementApi}${likesUrl}`);
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
    const response = await fetch(`${involvementApi}${likesUrl}`, {
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
