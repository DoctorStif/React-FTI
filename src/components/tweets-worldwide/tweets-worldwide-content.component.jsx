import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import moment from 'moment';

import TweetContent from '../tweet-content/tweet-content.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectPostsByHashtag } from '../../redux/post/post.selectors';

import { addPost, getPostsByHashtag } from '../../redux/post/post.actions';

import './tweets-worldwide-content.styles.scss';

const TweetsWorldwide = ({
  currentUser,
  addPost,
  postsByHashtag,
  getPostsByHashtag,
  searchValue,
}) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  let tweetsContainer = '';

  const handlePostImage = async (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  if (postsByHashtag != null && Object.keys(postsByHashtag).length > 0) {
    let likeCount = 0;
    let isUserLiked = false;
    tweetsContainer = Object.keys(postsByHashtag)
      .filter((post) => postsByHashtag[post] !== undefined)
      .map((post) => {
        const a = moment(postsByHashtag[post].createdAt.toDate()).format();
        const m = moment(a, 'YYYY-MM-DD, h:mm:ss a').fromNow();
        if (
          postsByHashtag[post] !== undefined &&
          postsByHashtag[post].likes &&
          Object.keys(postsByHashtag[post].likes).length > 0
        ) {
          likeCount = Object.keys(postsByHashtag[post].likes).length;
          Object.keys(postsByHashtag[post].likes).forEach((id) => {
            if (id === currentUser.id) {
              isUserLiked = true;
            } else {
              isUserLiked = false;
            }
          });
        } else {
          isUserLiked = false;
        }
        return (
          <TweetContent
            key={post}
            postId={post}
            displayName={postsByHashtag[post].displayName}
            email={postsByHashtag[post].email}
            profileImage={postsByHashtag[post].profileImage}
            postData={postsByHashtag[post].postData}
            retweet={postsByHashtag[post].retweet}
            retweetUserDisplayName={postsByHashtag[post].retweetByDisplayName}
            retweetUserEmail={postsByHashtag[post].retweetByEmail}
            likeCount={likeCount}
            isUserLiked={isUserLiked}
            createdAt={m}
          />
        );
      });
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    getPostsByHashtag(searchValue);
    // }, 2000);
    // return () => clearInterval(interval);
  }, [getPostsByHashtag, searchValue]);

  const handleButtonClick = async () => {
    const mentioned = content.match(/\s([@][\w_-]+)/g);
    const hashtags = content.match(/\s([#][\w_-]+)/g);
    addPost(currentUser, content, mentioned, hashtags, image);
  };

  return (
    <section className='worldwide-content'>
      <div className='worldwide-content-tweet'>
        <img
          className='worldwide-content-tweet--image'
          src={require('../../assets/img/defaultProfileImage.png')}
          alt=''
        />
        <div className='worldwide-content-tweet--content'>
          <textarea
            className='worldwide-content-tweet--text'
            name='content'
            placeholder='Bir şeyler paylaş!'
            cols='30'
            rows='10'
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div>
            <ul>
              <input
                type='file'
                name='file'
                id='file'
                onChange={handlePostImage}
                hidden
              />
              <li>
                <label htmlFor='file'>
                  <i className='im im-folder-add folder-icon-css'></i>
                </label>
              </li>
            </ul>
            <button onClick={handleButtonClick}>Gönder</button>
          </div>
        </div>
      </div>
      {tweetsContainer}
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  postsByHashtag: selectPostsByHashtag,
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (currentUser, postData, mentioned, hashtags, image) =>
    dispatch(addPost({ currentUser, postData, mentioned, hashtags, image })),
  getPostsByHashtag: (hashtag) => dispatch(getPostsByHashtag({ hashtag })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TweetsWorldwide);
