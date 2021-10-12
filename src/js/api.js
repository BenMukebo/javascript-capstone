import { renderNews, modalContent } from './dom.js';


const url = 'https://inshortsapi.vercel.app/news?category=technology';

// const getResponse = async () => {
//     try {
//       const get = await fetch(url);
//       const response = await get.json();
//       return response.data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };
  
//   export default getResponse;


  export const getResponse = async () => {
    const get = await fetch(url);
    const response = await get.json();
    renderNews(response.data);
    modalContent(response.data);
  };
  