// eslint-disable-next-line import/no-cycle
import { renderNews } from './dom.js';

const url = 'https://api.spaceflightnewsapi.net/v3/articles';
const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EXlTe26DlB9I8ip8IWwa/likes';

export const getResponse = async () => {
  const get = await fetch(url);
  const response = await get.json();
  renderNews(response);
};

export const postLikes = async (id, numbers) => {
  const post = await fetch(api, {
    method: 'POST',
    body: JSON.stringify({ item_id: id }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const response = await post.text();
  // console.log(response);
  getLikes(id, numbers);
  return response;
};

// postLikes(4);

export const getLikes = async (idLike, numberLikes) => {
  const put = await fetch(api);
  const response = await put.json();
  // console.log(idLike, numberLikes);

  response.forEach((element) => {
    if (element.item_id === idLike.toString()) {
      // console.log(element);
      numberLikes.innerHTML = element.likes;
    }
  });
};