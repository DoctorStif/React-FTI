import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import moment from 'moment'

import TweetContent from '../tweet-content/tweet-content.component'
import ProfileContentInfo from '../profile-content-info/profile-content-info.component'
import FollowerBox from './follower-box.component'

import {
  selectCurrentUser,
  selectUserProfile,
} from '../../redux/user/user.selectors'
import {
  selectFollowings,
  selectFollowers,
} from '../../redux/follower/follower.selectors'
import {
  selectFollowingsPosts,
  selectUserPosts,
} from '../../redux/post/post.selectors'

import {
  addPost,
  getFollowingUserPosts,
  getUserPosts,
} from '../../redux/post/post.actions'
import { getMessagesNotifications } from '../../redux/messages/messages.actions'
import { getNotifications } from '../../redux/notifications/notifications.actions'
import { getUserDataBySearchValue } from '../../redux/user/user.actions'

import './content.styles.scss'

const Content = ({
  currentUser,
  userProfile,
  addPost,
  followingsPosts,
  userPosts,
  ProfilePage = false,
  searchValue,
  followings,
  getFollowingUserPosts,
  getUserPosts,
  getMessagesNotifications,
  getNotifications,
  getUserDataBySearchValue,
}) => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [contentInfo, setContentInfo] = useState('Tweets')

  let tweetsContainer = ''
  let tweetPublishContainer = ''
  let tweetsMediaContainer = ''
  let followersBoxContainer = ''
  let followingsBoxContainer = ''

  let tweetsMediaCounter = 0

  let contentInfoCallback = (data) => {
    setContentInfo(data)
  }

  const handleButtonClick = async () => {
    const mentioned = content.match(/\s([@][\w_-]+)/g)
    const hashtags = content.match(/\s([#][\w_-]+)/g)
    addPost(currentUser, content, mentioned, hashtags, image)
  }

  const handlePostImage = async (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  /* Tweets Container */
  if (
    followingsPosts != null &&
    Object.keys(followingsPosts).length > 0 &&
    ProfilePage !== true
  ) {
    let isUserLiked = false
    tweetsContainer = Object.keys(followingsPosts).map((post) => {
      let likeCount = 0
      const a = moment(followingsPosts[post].createdAt.toDate()).format()
      const m = moment(a, 'YYYY-MM-DD, h:mm:ss a').fromNow()
      if (
        followingsPosts[post].likes &&
        Object.keys(followingsPosts[post].likes).length > 0
      ) {
        console.log(likeCount)
        likeCount = Object.keys(followingsPosts[post].likes).length
        console.log(likeCount)
        Object.keys(followingsPosts[post].likes).forEach((id) => {
          if (id === currentUser.id) {
            isUserLiked = true
          } else {
            isUserLiked = false
          }
        })
      } else {
        isUserLiked = false
      }
      return (
        <TweetContent
          key={post}
          postId={post}
          displayName={followingsPosts[post].displayName}
          email={followingsPosts[post].email}
          postData={followingsPosts[post].postData}
          retweet={followingsPosts[post].retweet}
          retweetByDisplayName={followingsPosts[post].retweetByDisplayName}
          retweetByEmail={followingsPosts[post].retweetByEmail}
          retweetByProfileImage={followingsPosts[post].retweetByProfileImage}
          likeCount={likeCount}
          isUserLiked={isUserLiked}
          profileImage={followingsPosts[post].profileImage}
          image={followingsPosts[post].image}
          createdAt={m}
        />
      )
    })
  } else if (
    userPosts != null &&
    Object.keys(userPosts).length > 0 &&
    ProfilePage === true
  ) {
    let likeCount = 0
    let isUserLiked = false
    tweetsContainer = Object.keys(userPosts).map((post) => {
      const a = moment(userPosts[post].createdAt.toDate()).format()
      const m = moment(a, 'YYYY-MM-DD, h:mm:ss a').fromNow()
      if (
        userPosts[post].likes &&
        Object.keys(userPosts[post].likes).length > 0
      ) {
        likeCount = Object.keys(userPosts[post].likes).length
        Object.keys(userPosts[post].likes).forEach((id) => {
          if (id === currentUser.id) {
            isUserLiked = true
          } else {
            isUserLiked = false
          }
        })
      } else {
        isUserLiked = false
      }
      return (
        <TweetContent
          key={post}
          postId={post}
          displayName={userPosts[post].displayName}
          email={userPosts[post].email}
          postData={userPosts[post].postData}
          retweet={userPosts[post].retweet}
          retweetByDisplayName={userPosts[post].retweetByDisplayName}
          retweetByEmail={userPosts[post].retweetByEmail}
          retweetByProfileImage={userPosts[post].retweetByProfileImage}
          likeCount={likeCount}
          isUserLiked={isUserLiked}
          profileImage={userPosts[post].profileImage}
          image={userPosts[post].image}
          createdAt={m}
        />
      )
    })
  }

  /* Tweets Media Container */
  if (
    userPosts != null &&
    Object.keys(userPosts).length > 0 &&
    ProfilePage === true
  ) {
    let likeCount = 0
    let isUserLiked = false
    tweetsMediaContainer = Object.keys(userPosts).map((post) => {
      const a = moment(userPosts[post].createdAt.toDate()).format()
      const m = moment(a, 'YYYY-MM-DD, h:mm:ss a').fromNow()
      if (userPosts[post].image) {
        if (
          userPosts[post].likes &&
          Object.keys(userPosts[post].likes).length > 0
        ) {
          likeCount = Object.keys(userPosts[post].likes).length
          Object.keys(userPosts[post].likes).forEach((id) => {
            if (id === currentUser.id) {
              isUserLiked = true
            } else {
              isUserLiked = false
            }
          })
        } else {
          isUserLiked = false
        }
        return (
          <TweetContent
            key={post}
            postId={post}
            displayName={userPosts[post].displayName}
            email={userPosts[post].email}
            postData={userPosts[post].postData}
            retweet={userPosts[post].retweet}
            retweetUserDisplayName={userPosts[post].retweetByDisplayName}
            retweetUserEmail={userPosts[post].retweetByEmail}
            retweetByProfileImage={userPosts[post].retweetByProfileImage}
            likeCount={likeCount}
            isUserLiked={isUserLiked}
            profileImage={userPosts[post].profileImage}
            image={userPosts[post].image}
            createdAt={m}
          />
        )
      }
      return null
    })
  }

  if (userPosts != null) {
    Object.keys(userPosts).map((post) => {
      if (userPosts[post].image) {
        tweetsMediaCounter = tweetsMediaCounter + 1
      }
      return undefined
    })
  }

  /* Followings Box  */
  if (
    userProfile.followings != null &&
    followings != null &&
    Object.keys(userProfile.followings).length > 0 &&
    ProfilePage === true
  ) {
    followingsBoxContainer = Object.keys(userProfile.followings).map((user) => {
      return (
        <FollowerBox
          key={user}
          currentUser={currentUser}
          userId={user}
          displayName={userProfile.followings[user].data.displayName}
          email={userProfile.followings[user].data.email}
          coverImage={userProfile.followings[user].data.coverImage}
          profileImage={userProfile.followings[user].data.profileImage}
          following={followings[user] ? true : false}
        />
      )
    })
  }

  /* Followers Box  */
  if (
    userProfile.followers != null &&
    followings != null &&
    Object.keys(userProfile.followers).length > 0 &&
    ProfilePage === true
  ) {
    followersBoxContainer = Object.keys(userProfile.followers).map((user) => {
      return (
        <FollowerBox
          key={user}
          currentUser={currentUser}
          userId={user}
          displayName={userProfile.followers[user].data.displayName}
          email={userProfile.followers[user].data.email}
          coverImage={userProfile.followers[user].data.coverImage}
          profileImage={userProfile.followers[user].data.profileImage}
          following={followings[user] ? true : false}
        />
      )
    })
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    if (ProfilePage === true) {
      getUserPosts(searchValue, currentUser)
    } else if (followings !== null && Object.keys(followings).length > 0) {
      getUserDataBySearchValue(currentUser.email)
      getFollowingUserPosts(currentUser, Object.keys(followings))
      getUserPosts(currentUser.email, currentUser)
      getMessagesNotifications(currentUser)
      getNotifications(currentUser)
    }
    // }, 10000);
    // return () => clearInterval(interval);
  }, [
    getFollowingUserPosts,
    getUserPosts,
    currentUser,
    ProfilePage,
    followings,
    searchValue,
  ])

  if (currentUser.email === userProfile.email) {
    tweetPublishContainer = (
      <div className='content-tweet'>
        <img
          className='content-tweet--image'
          src={currentUser.profileImage}
          alt=''
        />
        <div className='content-tweet--content'>
          <textarea
            name='content'
            placeholder='Bir Seyler Paylasti!'
            cols='30'
            rows='10'
            onChange={(e) => setContent(e.target.value)}
          />
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
    )
  }

  return (
    <section className='content'>
      {ProfilePage && (
        <ProfileContentInfo
          tweetsCount={userPosts != null && Object.keys(userPosts).length}
          followingsCount={
            userProfile.followings != null &&
            Object.keys(userProfile.followings).length
          }
          followersCount={
            userProfile.followers != null &&
            Object.keys(userProfile.followers).length
          }
          mediaCount={tweetsMediaCounter}
          contentInfoCallback={contentInfoCallback}
        />
      )}
      {tweetPublishContainer}
      {contentInfo === 'Tweets' ? tweetsContainer : null}
      {contentInfo === 'Media' ? tweetsMediaContainer : null}

      <div className='follower-box-container'>
        {contentInfo === 'Followers' ? followersBoxContainer : null}
        {contentInfo === 'Followings' ? followingsBoxContainer : null}
      </div>
    </section>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  followingsPosts: selectFollowingsPosts,
  userPosts: selectUserPosts,
  followings: selectFollowings,
  followers: selectFollowers,
  userProfile: selectUserProfile,
})

const mapDispatchToProps = (dispatch) => ({
  addPost: (currentUser, postData, mentioned, hashtags, image) =>
    dispatch(addPost({ currentUser, postData, mentioned, hashtags, image })),
  getFollowingUserPosts: (currentUser, followings) =>
    dispatch(getFollowingUserPosts({ currentUser, followings })),
  getUserPosts: (searchValue, currentUser) =>
    dispatch(getUserPosts({ searchValue, currentUser })),
  getMessagesNotifications: (currentUser) =>
    dispatch(getMessagesNotifications({ currentUser })),
  getNotifications: (currentUser) =>
    dispatch(getNotifications({ currentUser })),
  getUserDataBySearchValue: (searchValue) =>
    dispatch(getUserDataBySearchValue({ searchValue })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)
