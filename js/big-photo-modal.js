const modalBigPicture = document.querySelector('.big-picture');

const bigPhotoElement = modalBigPicture.querySelector('img');
const likesBigPhoto = modalBigPicture.querySelector('.likes-count');
const descriptionBigPhoto = modalBigPicture.querySelector('.social__caption');

const commentsCountBlock = modalBigPicture.querySelector('.social__comment-count');
const commentsTotalCount = commentsCountBlock.querySelector('.comments-count');
const commentsLoadBlock = modalBigPicture.querySelector('.comments-loader');

const commentsList = modalBigPicture.querySelector('.social__comments');

const commentLodaerButton = modalBigPicture.querySelector('.comments-loader');




const simpleClickCounter = () => {
  let i = 2;
  return () => i++;
};

const commentsLoadButtonCounter = simpleClickCounter();

// const getNumberComments = (commentsArray) => {
//   let commentsCountName = 'комментариев';

//   switch (String(commentsArray.length).at(-1)) {
//     case '1':
//       commentsCountName = 'комментарий';
//       break;
//     case '2':
//     case '3':
//     case '4':
//       commentsCountName = 'комментария';
//       break;
//     default:
//       commentsCountName = 'комментариев';
//       break;
//   }

//   if (commentsArray.length < 6) {
//     commentsCountBlock.textContent = `${commentsArray.length} ${commentsCountName}`;
//     commentsLoadBlock.classList.add('hidden');
//   } else {
//     commentsCountBlock.textContent = `5 из ${commentsArray.length} ${commentsCountName}`;
//     commentsLoadBlock.classList.remove('hidden');
//   }
// };



const addComments = (elem) => {
  console.log(elem);
  console.log(commentsList.children);
  console.log(commentsList);


}

const createComments = (commentsArray) => {
  const commentsPerviousList = commentsList.querySelectorAll('.social__comment');
  commentsPerviousList.forEach((currentComment) => {
    currentComment.remove();
  });

  const similarCommentFragment = document.createDocumentFragment();

  for (let i = 0; i < 5; i++) {
    const commentElement = commentsPerviousList[0].cloneNode(true);
    commentElement.querySelector('.social__picture').src = commentsArray[i].avatar;
    commentElement.querySelector('.social__picture').alt = commentsArray[i].name;
    commentElement.querySelector('.social__text').textContent = commentsArray[i].message;

    similarCommentFragment.append(commentElement);

    if (i + 1 === commentsArray.length) {
      break;
    }
  }

  commentsList.append(similarCommentFragment);

  // getNumberComments(commentsArray);
};

/*--------------------------------------------------------------*/



// const workButtonLoadMore = (photoData) => {
//   return function () {
//     console.log(photoData.comments);
//   }
// }



const drawBigPhotoData = (clickedElementData) => {
  bigPhotoElement.src = clickedElementData.url;
  likesBigPhoto.textContent = clickedElementData.likes;
  descriptionBigPhoto.textContent = clickedElementData.description;

  createComments(clickedElementData.comments);

};

// export {workButtonLoadMore};

export {drawBigPhotoData};
