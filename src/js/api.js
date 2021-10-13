import { renderNews } from './dom.js';

const url = 'https://api.spaceflightnewsapi.net/v3/articles';

export const getResponse = async () => {
  const get = await fetch(url);
  const response = await get.json();
  renderNews(response);
};
