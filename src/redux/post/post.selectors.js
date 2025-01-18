import { createSelector } from 'reselect';

const selectPost = (state) => state.post;

export const selectUserPosts = createSelector(
  [selectPost],
  (post) => post.userPosts
);

export const selectFollowingsPosts = createSelector(
  [selectPost],
  (post) => post.followingsPosts
);

export const selectPostsByHashtag = createSelector(
  [selectPost],
  (post) => post.postsByHashtag
);

export const selectMostUsedHashtags = createSelector(
  [selectPost],
  (post) => post.mostUsedHashtags
);

export const selectPostComments = createSelector(
  [selectPost],
  (post) => post.postComments
);
