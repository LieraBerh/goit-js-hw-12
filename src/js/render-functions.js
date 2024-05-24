function pictureTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
<li class="gallery-item">
<a class="gallery-link" href="${largeImageURL}">
<img src="${webformatURL}" alt='${tags}'class="gallery-image"/>
</a>
<div class="caption-wrapper">
<p><span>Likes: </span>${likes}</p>
<p><span>Views: </span>${views}</p>
<p><span>Comments: </span>${comments}</p>
<p><span>Downloads: </span>${downloads}</p>
</div>
</li>`;
}

export function picturesTemplate(arr) {
  return arr.map(pictureTemplate).join('');
}
