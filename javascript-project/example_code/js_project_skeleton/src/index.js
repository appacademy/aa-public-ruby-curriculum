import { createImage } from './js/image_util';

document.addEventListener('DOMContentLoaded', () => {
  const bananaImg = createImage({
    src: './dist/assets/banana.png', // relative path to image from root dir
    alt: 'js oddities',
  });

  document.body.append(bananaImg);
});
