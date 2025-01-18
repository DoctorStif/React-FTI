import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectPostComments } from '../../redux/post/post.selectors';

import { addComment, getComments } from '../../redux/post/post.actions';

import './comments.styles.scss';

const TweetComments = ({
  currentUser,
  handleClose,
  show,
  postId,
  postByEmail,
  addComment,
  getComments,
  postComments,
}) => {
  const [comment, setComment] = useState('');
  const showHideClassName = show ? 'modal' : 'display-none';

  let commentContainer = '';

  if (postComments != null && Object.keys(postComments).length > 0) {
    commentContainer = Object.keys(postComments).map((comment) => (
      <div className='comment-user--posts' key={comment}>
        <img alt='Profile' src={postComments[comment].profileImage} />
        <div>
          <div>
            <span>{postComments[comment].displayName}&nbsp;</span>
            <p>{postComments[comment].email} Mayis</p>
          </div>
          <div>
            <p>{postComments[comment].commentData}</p>
          </div>
        </div>
      </div>
    ));
  }

  const handleButtonClick = async () => {
    addComment(currentUser, postId, postByEmail, comment);
    setComment('');
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClose);

  return (
    <div className={showHideClassName}>
      <div className='modal-main' ref={wrapperRef}>
        <div className='comment-user'>
          {commentContainer}
          <div className='comment-content'>
            <ul>
              <li className='textarea-comment_li'>
                <textarea
                  className='textarea-comment_textarea'
                  name='content'
                  placeholder='Yorum yap!'
                  onChange={(e) => setComment(e.target.value)}
                />
              </li>
              <li className='textarea-button_li'>
                <button onClick={handleButtonClick}>
                  <ion-icon name='send'></ion-icon>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function useOutsideAlerter(ref, handleClose) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  postComments: selectPostComments,
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (currentUser, postId, postByEmail, commentData) =>
    dispatch(addComment({ currentUser, postId, postByEmail, commentData })),
  getComments: (currentUser, postId, postByEmail) =>
    dispatch(getComments({ currentUser, postId, postByEmail })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TweetComments);
