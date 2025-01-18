import { createSelector } from 'reselect';

const selectFollower = state => state.follower;

export const selectFollowers = createSelector(
  [selectFollower],
  follower => follower.followers
);

export const selectFollowings = createSelector(
  [selectFollower],
  follower => follower.followings
);

export const selectFollowSuggestions = createSelector(
  [selectFollower, selectFollowings],
  (follower, followings) => {
    const data = {};
    if (
      follower.followSuggestions != null &&
      Object.keys(follower.followSuggestions).length > 0
    ) {
      let followingArr = [];
      if (followings != null && Object.keys(followings).length > 0) {
        followingArr = Object.keys(followings);
      }

      Object.keys(follower.followSuggestions).forEach(followSuggestion => {
        if (!followingArr.includes(followSuggestion)) {
          data[followSuggestion] = follower.followSuggestions[followSuggestion];
        }
      });
    }
    return data;
  }
);

export const selectFollowersCount = createSelector(
  [selectFollowers],
  followers => followers.reduce((acc, follower) => acc + follower.quantity, 0)
);

export const selectFollowingsCount = createSelector(
  [selectFollowings],
  followings =>
    followings.reduce((acc, following) => acc + following.quantity, 0)
);
