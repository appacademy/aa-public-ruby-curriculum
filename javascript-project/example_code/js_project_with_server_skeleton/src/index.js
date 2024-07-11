import { createImage } from './js/image_util';

document.addEventListener('DOMContentLoaded', () => {
  const bananaImg = createImage({
    src: './assets/banana.png', // relative path to image from dist dir
    alt: 'js oddities',
  });

  document.body.append(bananaImg);
});

const demoUrl = 'https://www.metaweather.com/api/location/search/?query=san';
window.corsRequest = (url = demoUrl) => {
  fetch(`/cors?url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
      // debugger
      console.log(data);
    });
}

window.apiRequest = (searchTerm = 'curry') => {
  fetch(`/api?searchTerm=${encodeURIComponent(searchTerm)}`)
    .then(res => res.json())
    .then(data => {
      // debugger
      console.log(data);
    });
}