import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { removePost } from '../../redux/post/post.actions';

const TweetUpdate = ({
  currentUser,
  handleClose,
  show,
  postId,
  removePost,
}) => {
  const showHideClassName = show ? 'modal' : 'display-none';

  const handleButtonClick = async () => {
    removePost(currentUser, postId);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClose);

  return (
    <div className={showHideClassName}>
      <div className='modal-main' ref={wrapperRef}>
        <div className='comment-user'>
          <div className='comment-content'>
            <ul>
              <li className='textarea-button_li'>
                <button onClick={handleButtonClick}>
                Emin Misiniz?
                  <ion-icon name='trash'></ion-icon>
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
  removePost: (currentUser, postId) =>
    dispatch(removePost({ currentUser, postId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TweetUpdate);
