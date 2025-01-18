import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { addRetweet } from '../../redux/post/post.actions';

import './comments.styles.scss';

const TweetComments = ({
  currentUser,
  handleClose,
  show,
  displayName,
  email,
  postData,
  postId,
  profileImage,
  addRetweet,
}) => {
  const [retweet, setRetweet] = useState('');
  const showHideClassName = show ? 'modal' : 'display-none';

  const handleButtonClick = async () => {
    addRetweet(
      currentUser,
      displayName,
      email,
      postData,
      postId,
      profileImage,
      retweet
    );
    setRetweet('');
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClose);

  return (
    <div className={showHideClassName}>
      <div className='modal-main' ref={wrapperRef}>
        <div className='comment-user'>
          <div className='comment-content'>
            <ul>
              <li className='textarea-comment_li'>
                <textarea
                  className='textarea-comment_textarea'
                  name='content'
                  placeholder='Yorum yap!'
                  onChange={(e) => setRetweet(e.target.value)}
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
});

const mapDispatchToProps = (dispatch) => ({
  addRetweet: (currentUser, displayName, email, postData, postId, retweet) =>
    dispatch(
      addRetweet({ currentUser, displayName, email, postData, postId, retweet })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(TweetComments);
