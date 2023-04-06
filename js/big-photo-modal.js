const PART_OF_COMMENTS_TO_SHOW = 5;

const modalBigPicture = document.querySelector('.big-picture');

const bigPhotoElement = modalBigPicture.querySelector('img');
const likesBigPhoto = modalBigPicture.querySelector('.likes-count');
const descriptionBigPhoto = modalBigPicture.querySelector('.social__caption');

const commentsCountBlock = modalBigPicture.querySelector('.social__comment-count');

const commentsList = modalBigPicture.querySelector('.social__comments');

const commentLodaerButton = modalBigPicture.querySelector('.comments-loader');


const clearAllPerviousCommentsOnPage = () => {
  const commentsPerviousList = commentsList.querySelectorAll('.social__comment');
  for (let i = 0; i < commentsPerviousList.length; i++) {
    commentsPerviousList[i].remove();
  }
};

const returnCommentTemplate = () => {
  const commentsPerviousList = commentsList.querySelectorAll('.social__comment');
  return commentsPerviousList[0];
};
const baseCommentTemplate = returnCommentTemplate(); //Базовый шаблон для коммента


const editCommentsCounter = (photoCommentsData) => {
  const liveCollectionOnPage = commentsList.children;
  commentsCountBlock.textContent = `${liveCollectionOnPage.length} из ${photoCommentsData.length} комментариев`;
};


const drawAnyComments = (photoCommentsData, numberOfComments) => {
  const commentsOnPage = Number(commentsList.children.length);
  const similarCommentFragment = document.createDocumentFragment();
  for (let i = commentsOnPage; i < numberOfComments + commentsOnPage; i++) {
    const commentElement = baseCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = photoCommentsData[i].avatar;
    commentElement.querySelector('.social__picture').alt = photoCommentsData[i].name;
    commentElement.querySelector('.social__text').textContent = photoCommentsData[i].message;

    similarCommentFragment.append(commentElement);
  }
  commentsList.append(similarCommentFragment);

  editCommentsCounter(photoCommentsData);
};


const checkLastComments = (photoCommentsData) => { //Вернет длину сколько комментов осталось отрисовать
  const liveCollection = commentsList.children;
  return photoCommentsData.length - liveCollection.length;
};


const hideLoadMoreCommentsButton = () => {
  commentLodaerButton.classList.add('hidden');
};


const workButtonLoadMore = (photoCommentsData) => function () {
  const lastComments = checkLastComments(photoCommentsData);
  if (lastComments > PART_OF_COMMENTS_TO_SHOW) {
    drawAnyComments(photoCommentsData, PART_OF_COMMENTS_TO_SHOW);

  } else {
    drawAnyComments(photoCommentsData, lastComments);
    hideLoadMoreCommentsButton();
  }
};


const drawBigPhotoData = (clickedElementData) => {
  bigPhotoElement.src = clickedElementData.url;
  likesBigPhoto.textContent = clickedElementData.likes;
  descriptionBigPhoto.textContent = clickedElementData.description;

  clearAllPerviousCommentsOnPage();

  let howMuchDrawFirstComments = PART_OF_COMMENTS_TO_SHOW;
  if (checkLastComments(clickedElementData.comments) < PART_OF_COMMENTS_TO_SHOW) {
    howMuchDrawFirstComments = checkLastComments(clickedElementData.comments);
    hideLoadMoreCommentsButton();
  }

  drawAnyComments(clickedElementData.comments, howMuchDrawFirstComments);
};


export {workButtonLoadMore};
export {drawBigPhotoData};
