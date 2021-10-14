import { renderNews, showMessage } from './dom.js';

const url = 'https://api.spaceflightnewsapi.net/v3/articles';
const involvementApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const commentsUrl = '/apps/EXlTe26DlB9I8ip8IWwa/comments';

export const getResponse = async () => {
  const get = await fetch(url);
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
    .then((response) =>{
      if (response.status === 201) {
        showMessage('Comment posted successfully');
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};
