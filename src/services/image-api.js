const API_KEY = "23088812-5b110276eac3708e5449cfd31";
const BASE_URL = `https://pixabay.com/api`;

const fetchImage = (nextQuery, nextPage) => {
  return fetch(
    `${BASE_URL}/?q=${nextQuery}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    // return Promise.reject(
    //   new Error(`По запросу "${nextQuery}" ничего не найдено`)
    // );
  });
};

const api = { fetchImage };

export default api;
