const modalBigPicture = document.querySelector('.big-picture');

const bigPhotoElement = modalBigPicture.querySelector('img');
const likesBigPhoto = modalBigPicture.querySelector('.likes-count');
const commentsCountBigPhoto = modalBigPicture.querySelector('.comments-count');
const descriptionBigPhoto = modalBigPicture.querySelector('.social__caption');

const commentsCountBlock = modalBigPicture.querySelector('.social__comment-count');
const commentsLoadBlock = modalBigPicture.querySelector('.comments-loader');

const commentsList = modalBigPicture.querySelector('.social__comments');

const createComments = (commentsArray) => {
  const commentsPerviousList = commentsList.querySelectorAll('.social__comment');
  commentsPerviousList.forEach((currentComment) => {
    currentComment.remove();
  });

  const similarCommentFragment = document.createDocumentFragment();

  commentsArray.forEach((commentData) => {
    const commentElement = commentsPerviousList[0].cloneNode(true);
    commentElement.querySelector('.social__picture').src = commentData.avatar;
    commentElement.querySelector('.social__picture').alt = commentData.name;
    commentElement.querySelector('.social__text').textContent = commentData.message;

    similarCommentFragment.append(commentElement);
  });

  commentsList.append(similarCommentFragment);
};


const drawBigPhotoData = (clickedElement) => {
  bigPhotoElement.src = clickedElement.url;
  likesBigPhoto.textContent = clickedElement.likes;
  commentsCountBigPhoto.textContent = clickedElement.comments.length;
  descriptionBigPhoto.textContent = clickedElement.description;

  commentsCountBlock.classList.add('hidden');
  commentsLoadBlock.classList.add('hidden');

  createComments(clickedElement.comments);
};

export {drawBigPhotoData};
