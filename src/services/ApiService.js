const API_KEY = '34891295-3c871ab0268d353f15c88782f';
export const getImages = (input, page) => {
  const images = fetch(
    `https://pixabay.com/api/?q=${input}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    return response.json();
  });

  return images;
};
