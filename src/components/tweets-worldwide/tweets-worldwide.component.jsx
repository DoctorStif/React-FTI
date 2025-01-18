import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMostUsedHashtags } from '../../redux/post/post.selectors';

import { getMostUsedHashtags } from '../../redux/post/post.actions';

import './tweets-worldwide.styles.scss';

const TweetsWorldwideCount = ({
  getMostUsedHashtags,
  mostUsedHashtags,
  currentUser,
}) => {
  const [count, setCount] = useState(5);

  let hashtagsContainer = '';

  useEffect(() => {
    // const interval = setInterval(() => {
      getMostUsedHashtags(count);
    // }, 10000);
    // return () => clearInterval(interval);
  }, [getMostUsedHashtags, currentUser, count]);

  if (mostUsedHashtags != null && Object.keys(mostUsedHashtags).length > 0) {
    hashtagsContainer = Object.keys(mostUsedHashtags).map((hashtag) => {
      return (
        <React.Fragment key={hashtag}>
          <Link to={'world?hashtag=' + hashtag.slice(1)}> {hashtag} </Link>
          <span>{mostUsedHashtags[hashtag].counter} Tweet</span>
        </React.Fragment>
      );
    });
  }

  return (
    <div className='tweets-worldwide'>
      <h3>Gündemdekiler</h3>
      {hashtagsContainer}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  mostUsedHashtags: selectMostUsedHashtags,
});

const mapDispatchToProps = (dispatch) => ({
  getMostUsedHashtags: (count) => dispatch(getMostUsedHashtags({ count })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetsWorldwideCount);
