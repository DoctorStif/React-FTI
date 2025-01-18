import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'

import HtmlToReact from 'html-to-react'

import Comments from './comments.component'
import Retweets from './retweets.component'
import TweetUpdate from './tweet-update.component'
import TweetDelete from './tweet-delete.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import { getComments, addLike, removeLike } from '../../redux/post/post.actions'

import './tweet-content.styles.scss'

const TweetContent = ({
  currentUser,
  postId,
  displayName,
  email,
  postData,
  retweet,
  retweetByDisplayName,
  retweetByEmail,
  retweetByProfileImage,
  likeCount,
  isUserLiked,
  profileImage,
  image,
  createdAt,
  getComments,
  addLike,
  removeLike,
}) => {
  const [isUserLikedState, setIsUserLikedState] = useState(isUserLiked)
  const [commentsModal, setCommentsModal] = useState(false)
  const [retweetModal, setRetweetModal] = useState(false)
  const [tweetUpdateModal, setTweetUpdateModal] = useState(false)
  const [tweetDeleteModal, setTweetDeleteModal] = useState(false)
  const [likeCountState, setLikeCountState] = useState(likeCount)
  const HtmlToReactParser = HtmlToReact.Parser
  const htmlToReactParser = new HtmlToReactParser()
  //////////////////////////////////////////////////////
  const showCommentsModal = () => {
    getComments(currentUser, postId, email)
    setCommentsModal(true)
  }
  const hideCommentsModal = () => setCommentsModal(false)

  const showRetweetModal = () => {
    setRetweetModal(true)
  }
  const hideRetweetModal = () => setRetweetModal(false)

  const showTweetUpdateModal = () => {
    setTweetUpdateModal(true)
  }
  const hideTweetUpdateModal = () => setTweetUpdateModal(false)

  const showTweetDeleteModal = () => {
    setTweetDeleteModal(true)
  }
  const hideTweetDeleteModal = () => setTweetDeleteModal(false)
  //////////////////////////////////////////////////////////
  const addLikeByClick = () => {
    addLike(currentUser, postId, email)
    setIsUserLikedState(true)
    setLikeCountState(likeCountState + 1)
  }

  const removeLikeByClick = () => {
    removeLike(currentUser, postId, email)
    setIsUserLikedState(false)
    setLikeCountState(likeCountState - 1)
  }

  let likeContainer = ''
  if (isUserLikedState) {
    likeContainer = (
      <span
        onClick={removeLikeByClick}
        style={{ color: 'red', cursor: 'pointer' }}
      >
        <ion-icon name='heart'></ion-icon>{' '}
        <span className='like-count'> {likeCountState}</span>
      </span>
    )
  } else {
    likeContainer = (
      <span
        onClick={addLikeByClick}
        style={{ color: 'red', cursor: 'pointer' }}
      >
        <ion-icon name='heart-outline'></ion-icon>{' '}
        <span className='like-count'> {likeCountState}</span>
      </span>
    )
  }

  const htmlPostDataBefore = postData.replace(
    /\s([@][\w_-]+)/gi,
    " <Link to='profiles/$1'><span class='mentioned-and-hashtags'>$1</span></Link>"
  )

  const htmlPostDataAfter = htmlPostDataBefore.replace(
    /\s([#][\w_-]+)/gi,
    " <Link to='worldwide/$1'><span class='mentioned-and-hashtags'>$1</span></Link>"
  )

  const reactPostData = htmlToReactParser.parse(htmlPostDataAfter)

  let tweetContainer = ''
  if (retweet) {
    tweetContainer = (
      <div className='tweet-user'>
        <div className='retweet-user'>
          <div className='retweet-user-header'>
            <div>
              <img alt='' src={retweetByProfileImage} />
              <Link to={'profile?user=' + retweetByEmail}>
                {retweetByDisplayName}
              </Link>
              <p>&nbsp;{createdAt}</p>
            </div>
            <div className='retweet-user--header-content'>{retweet}</div>
          </div>
          <div className='retweet-content'>
            <div>
              <img alt='Profile' src={profileImage} />
              <div>
                <Link to={'profile?user=' + email}>{displayName}&nbsp;</Link>
                <p>{email}</p>
              </div>
            </div>
            <hr
              style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 0.5,
                width: '100%',
                borderColor: '#000000',
              }}
            />
            <div>
              <p>{reactPostData}</p>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    tweetContainer = (
      <div className='tweet-user'>
        <img alt='Profile' src={profileImage} />
        <div>
          <div className='tweet-user--header'>
            <Link to={'profile?user=' + email}>{displayName}&nbsp;</Link>
            <p>{createdAt}</p>
            {currentUser.email === email ? (
              <div>
                <div className='three-dots--menu'></div>
                <div className='three-dots--content'>
                  <label onClick={showTweetDeleteModal}>Sil</label>
                  <label onClick={showTweetUpdateModal}>Güncelle</label>
                </div>
              </div>
            ) : null}
          </div>
          <div className='post-data-container'>
            <p>{reactPostData}</p>
            <img className='post-image' src={image} alt='' />
          </div>
          <div>
            <ul>
              <li>
                <span
                  onClick={showCommentsModal}
                  style={{ color: 'blue', cursor: 'pointer' }}
                >
                  {/* <ion-icon src={require('./comment.svg')}></ion-icon> */}
                  <ion-icon name='chatbubble-outline'></ion-icon>
                </span>
              </li>
              <li>
                <span
                  onClick={showRetweetModal}
                  style={{ color: 'green', cursor: 'pointer' }}
                >
                  <ion-icon name='repeat-sharp'></ion-icon>{' '}
                </span>
              </li>
              <li>{likeContainer}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Comments
        show={commentsModal}
        handleClose={hideCommentsModal}
        postId={postId}
        postByEmail={email}
      />
      <Retweets
        show={retweetModal}
        handleClose={hideRetweetModal}
        email={email}
        displayName={displayName}
        postData={postData}
        postId={postId}
        profileImage={profileImage}
      />
      <TweetUpdate
        show={tweetUpdateModal}
        handleClose={hideTweetUpdateModal}
        postId={postId}
        postData={postData}
      />
      <TweetDelete
        show={tweetDeleteModal}
        handleClose={hideTweetDeleteModal}
        postId={postId}
      />
      {tweetContainer}
    </React.Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  getComments: (currentUser, postId, postByEmail) =>
    dispatch(getComments({ currentUser, postId, postByEmail })),
  addLike: (currentUser, postId, postByEmail) =>
    dispatch(addLike({ currentUser, postId, postByEmail })),
  removeLike: (currentUser, postId, postByEmail) =>
    dispatch(removeLike({ currentUser, postId, postByEmail })),
})

export default connect(mapStateToProps, mapDispatchToProps)(TweetContent)
