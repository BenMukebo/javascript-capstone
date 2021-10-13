import { renderNews } from './dom.js';

const url = 'https://inshortsapi.vercel.app/news?category=technology';

export const getResponse = async () => {
  const get = await fetch(url);
  const response = await get.json();
  renderNews(response.data);
};
