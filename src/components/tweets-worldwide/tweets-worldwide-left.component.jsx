import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import TweetsWorldWideComponent from './tweets-worldwide.component';

import { selectPostsByHashtag } from '../../redux/post/post.selectors';

import './tweets-worldwide-left.styles.scss';

const TweetsWorldwideLeft = ({ postsByHashtag, searchValue }) => {
  const [count, setCount] = useState(0);
  const [inputSearchValue, setInputSearchValue] = useState();

  let history = useHistory();

  useEffect(() => {
    // const interval = setInterval(() => {
    if (postsByHashtag != null && Object.keys(postsByHashtag).length > 0) {
      setCount(
        Object.keys(postsByHashtag).filter(
          (post) => postsByHashtag[post] !== undefined
        ).length
      );
    }
    // }, 500);
    // return () => clearInterval(interval);
  }, [postsByHashtag, searchValue]);

  const handleSearchInput = async (e) => {
    if (e.key === 'Enter') {
      history.push('/world?hashtag=' + inputSearchValue);
    }
  };

  return (
    <section className='worldwide-sidebar-left'>
      <div className='worldwide-user-information'>
        <ul>
          <li className='worldwide-left-li'>
            <input
              type='search'
              className='search-input'
              placeholder='Ara...'
              onChange={(e) => setInputSearchValue(e.target.value)}
              onKeyPress={handleSearchInput}
            />
          </li>
          <li>{count > 0 ? '# ' + searchValue : ''}</li>
          <li>
            <p> {count > 0 ? 'Toplam ' + count + ' Sonuç' : ''} </p>
          </li>
        </ul>
      </div>
      <TweetsWorldWideComponent />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  postsByHashtag: selectPostsByHashtag,
});

// const mapDispatchToProps = (dispatch) => ({
//   addPost: (currentUser, postData, mentioned, hashtags, image) =>
//     dispatch(addPost({ currentUser, postData, mentioned, hashtags, image })),
//   getPostsByHashtag: (hashtag) => dispatch(getPostsByHashtag({ hashtag })),
// });

export default connect(mapStateToProps)(TweetsWorldwideLeft);
