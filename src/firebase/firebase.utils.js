import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
  /* CAN'T SHARE THEM SO USE YOUR OWN :)*/
  apiKey: "YOUR APIKEY HERE",
  authDomain: "DOMAIN HERE",
  databaseURL: "DATABASE URL HERE",
  projectId: "ID HERE",
  storageBucket: "YOURS HERE",
  messagingSenderId: "YOURS HERE",
  appId: "YOURS HERE",
  measurementId: "YOURS HERE",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  /* YOU SHOULD CHANGE THIS COVER AND PROFILE IMAGE TO YOUR LIKE, I WILL LEAVE THEM AS BOILERPLATES*/
  const coverImage =
    "https://firebasestorage.googleapis.com/v0/b/react-fti.appspot.com/o/default%2FdefaultCoverImage.png?alt=media&token=cbef4f45-f0e4-47e5-b9ea-4deca2f0d598";
  const profileImage =
    "https://firebasestorage.googleapis.com/v0/b/react-fti.appspot.com/o/default%2FdefaultProfileImage.png?alt=media&token=c83aa904-5965-412c-9128-34e8cb5e1bde";

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        coverImage,
        profileImage,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
////////////////////////////////////////////////////////////
export const addUserFollowers = async (currentUser, followerId) => {
  if (!currentUser) return;

  const followerRef = firestore.doc(
    `users/${followerId}/followers/${currentUser.id}`
  );

  const followingRef = firestore.doc(
    `users/${currentUser.id}/followings/${followerId}`
  );

  const followerUserRef = firestore.doc(`users/${followerId}`);

  const followingUserRef = firestore.doc(`users/${currentUser.id}`);

  const notificationsRef = firestore
    .collection(`users/${followerId}/notifications`)
    .doc();

  const followerSnapShot = await followerRef.get();
  const followingSnapShot = await followingRef.get();
  const followerUserSnapShot = await followerUserRef.get();
  const followingUserSnapShot = await followingUserRef.get();
  const notificationsSnapShot = await notificationsRef.get();

  if (
    !followerSnapShot.exists &&
    !followingSnapShot.exists &&
    followerUserSnapShot &&
    followingUserSnapShot &&
    !notificationsSnapShot.exists
  ) {
    try {
      const createdAt = new Date();
      await followerRef.set(
        { id: currentUser.id, data: followingUserSnapShot.data(), createdAt },
        { merge: true }
      );
      await followingRef.set(
        { id: followerId, data: followerUserSnapShot.data(), createdAt },
        { merge: true }
      );
      await notificationsRef.set({
        followedBy: currentUser,
        createdAt,
        type: "follow",
        viewed: false,
      });
    } catch (error) {
      console.log("error creating followers", error.message);
    }
  } else {
    console.log("burada");
  }
};

export const removeUserFollowers = async (currentUser, followerId) => {
  if (!currentUser) return;

  const followerRef = firestore.doc(
    `users/${followerId}/followers/${currentUser.id}`
  );

  const followingRef = firestore.doc(
    `users/${currentUser.id}/followings/${followerId}`
  );
  // const notificationsRef = firestore
  //   .collection(`users/${followerId}/notifications`)
  //   .where('currentUser', '==', currentUser)

  const followerSnapShot = await followerRef.get();
  const followingSnapShot = await followingRef.get();
  // const notificationsSnapShot = await notificationsRef.get();

  if (followerSnapShot.exists && followingSnapShot.exists) {
    try {
      await followerRef.delete();
      await followingRef.delete();
    } catch (error) {
      console.log("error removing followers", error.message);
    }
  }
};

export const getUserFollowers = async (currentUser) => {
  if (!currentUser) return;
  const data = {};
  for (let i = 0; i < 1; i++) {
    const followersSnapShot = await firestore
      .collection(`users/${currentUser.id}/followers`)
      .get();
    followersSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  }
  return data;
};

export const getUserFollowings = async (currentUser) => {
  if (!currentUser) return;
  const data = {};
  for (let i = 0; i < 1; i++) {
    const followingsSnapShot = await firestore
      .collection(`users/${currentUser.id}/followings`)
      .get();
    followingsSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  }
  return data;
};

export const getUserFollowSuggestions = async (currentUser) => {
  if (!currentUser) return;
  const data = {};
  for (let i = 0; i < 1; i++) {
    const suggestionsSnapShot = await firestore
      .collection(`users`)
      .orderBy("createdAt", "asc")
      .limit(50)
      .get();
    suggestionsSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  }
  return data;
};

//////////////////////////////////////////////////////////////////////
export const addPost = async (
  currentUser,
  postData,
  mentioned,
  hashtags,
  image
) => {
  if (!currentUser) return;

  const postRef = firestore.collection(`users/${currentUser.id}/posts`).doc();
  try {
    const createdAt = new Date();
    const displayName = currentUser.displayName;
    const email = currentUser.email;
    const profileImage = currentUser.profileImage;
    await postRef.set({
      postData,
      createdAt,
      displayName,
      email,
      hashtags,
      mentioned,
      profileImage,
    });
  } catch (error) {
    console.log("error creating post", error.message);
  }
  /* Post done and image begin */
  if (image != null) {
    const uploadTask = storage
      .ref(`images/${currentUser.email}/postPhoto/${image.name}`)
      .put(image);
    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(currentUser.email)
            .child("postPhoto")
            .child(image.name)
            .getDownloadURL()
            .then(async (url) => {
              await postRef.update({
                image: url,
              });
            });
        }
      );
    } catch (error) {
      console.log("error creating post image", error.message);
    }
  }
  /* Hashtags collection */
  for (let i = 0; i < hashtags.length; i++) {
    const finalHashtag = hashtags[i].slice(1);
    const createdAt = new Date();
    const hashtagsDocRef = firestore.doc(`hashtags/${finalHashtag}`);
    try {
      await hashtagsDocRef.set(
        {
          counter: firebase.firestore.FieldValue.increment(1),
        },
        { merge: true }
      );
    } catch (error) {
      console.log("error creating post dummyField doc", error.message);
    }
    //
    const hashtagsRef = firestore
      .collection(`hashtags/${finalHashtag}/posts`)
      .doc();
    try {
      await hashtagsRef.set({
        createdAt,
        postId: postRef,
      });
    } catch (error) {
      console.log("error creating post", error.message);
    }
  }
};

export const removePost = async (currentUser, postId) => {
  if (!currentUser) return;
  const postRef = firestore.doc(`users/${currentUser.id}/posts/${postId}`);
  const snapShot = await postRef.get();
  if (snapShot.exists) {
    try {
      await postRef.delete();
    } catch (error) {
      console.log("error creating followers", error.message);
    }
  }
  return postRef;
};

export const updatePost = async (currentUser, postId, postData) => {
  if (!currentUser) return;
  const postRef = firestore.doc(`users/${currentUser.id}/posts/${postId}`);
  const snapShot = await postRef.get();
  if (snapShot.exists) {
    try {
      await postRef.update({
        postData,
      });
    } catch (error) {
      console.log("error creating followers", error.message);
    }
  }
  return postRef;
};

export const getUserPosts = async (searchValue, currentUser) => {
  if (!currentUser) return;
  const data = {};
  let userId = await getUserIdByEmail(searchValue);
  for (let i = 0; i < 1; i++) {
    const postsSnapShot = await firestore
      .collection(`users/${userId}/posts`)
      .orderBy("createdAt", "desc")
      .get();
    postsSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  }
  return data;
};

export const getFollowingUserPosts = async (currentUser, followings) => {
  if (!currentUser) return;
  const data = {};
  for (const following of followings) {
    const followingSnapShot = await firestore
      .collection(`users/${following}/posts`)
      .orderBy("createdAt", "desc")
      .get();
    followingSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  }
  return data;
};

export const getPostsByHashtag = async (hashtag) => {
  const data = {};
  const finalData = {};
  const finalHashtag = "#" + hashtag;
  let postsByHashtagSnapShot;
  for (let i = 0; i < 1; i++) {
    const postsSnapShot = await firestore
      .collection(`hashtags/${finalHashtag}/posts`)
      .orderBy("createdAt", "desc")
      .get();
    postsSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    for (const key in data) {
      postsByHashtagSnapShot = await firestore
        .doc(`${data[key].postId.path}`)
        .get();
      finalData[data[key].postId.id] = postsByHashtagSnapShot.data();
    }
  }
  return finalData;
};

export const getMostUsedHashtags = async (count) => {
  const data = {};
  await firestore
    .collection(`hashtags`)
    .orderBy("counter", "desc")
    .limit(count)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        data[doc.id] = doc.data();
      });
    });
  return data;
};
//////////////////////////////////////////////

export const addMessage = async (currentUser, email, messageData) => {
  if (!currentUser) return;
  let messageWithByUserId = await getUserIdByEmail(email);
  if (messageWithByUserId === null) return;

  const newId =
    currentUser.id < messageWithByUserId
      ? currentUser.id + messageWithByUserId
      : messageWithByUserId + currentUser.id;

  const messageRef = firestore.collection(`messages/${newId}/message`).doc();
  const messageFieldRef = firestore.doc(`messages/${newId}`);
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const messageWithUserRef = firestore.doc(`users/${messageWithByUserId}`);

  const snapShot = await messageRef.get();
  if (!snapShot.exists) {
    try {
      const createdAt = new Date();
      let messageWithUserRefData = "";
      await messageWithUserRef.get().then((doc) => {
        messageWithUserRefData = doc.data();
      });
      await userRef.set(
        {
          messageWithIDs: firebase.firestore.FieldValue.arrayUnion(newId),
        },
        { merge: true }
      );
      await messageWithUserRef.set(
        {
          messageWithIDs: firebase.firestore.FieldValue.arrayUnion(newId),
        },
        { merge: true }
      );
      await messageRef.set({
        messageFrom: currentUser,
        messageData,
        createdAt,
      });
      await messageFieldRef.set(
        {
          lastMessageFrom: currentUser,
          lastMessageTo: messageWithUserRefData,
          viewed: false,
          createdAt,
        },
        { merge: true }
      );
    } catch (error) {
      console.log("error creating post", error);
    }
  }
};

export const getMessages = async (currentUser, email) => {
  if (!currentUser) return;
  const data = {};
  let unsubscribe;
  let messageWithByUserId = await getUserIdByEmail(email);
  if (messageWithByUserId === null) {
    return data;
  }

  const newId =
    currentUser.id < messageWithByUserId
      ? currentUser.id + messageWithByUserId
      : messageWithByUserId + currentUser.id;

  for (let i = 0; i < 1; i++) {
    unsubscribe = firestore
      .collection(`messages/${newId}/message`)
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        snap.forEach((doc) => {
          data[doc.id] = doc.data();
        });
      });
  }
  // unsubscribe();
  return data;
};

export const updateMessagesViewed = async (currentUser, email) => {
  if (!currentUser) return;
  let messageWithByUserId = await getUserIdByEmail(email);
  const newId =
    currentUser.id < messageWithByUserId
      ? currentUser.id + messageWithByUserId
      : messageWithByUserId + currentUser.id;
  const messageFieldRef = firestore.doc(`messages/${newId}`);

  const snapShot = await messageFieldRef.get();
  if (snapShot.exists) {
    try {
      console.log("2");
      await messageFieldRef.set(
        {
          viewed: true,
        },
        { merge: true }
      );
    } catch (error) {
      console.log("error creating post", error);
    }
  }
};

export const getMessagesNotifications = async (currentUser) => {
  if (!currentUser) return;
  const data = {};
  const tmp = {};
  for (let i = 0; i < 1; i++) {
    await firestore
      .doc(`users/${currentUser.id}`)
      .get()
      .then((doc) => {
        tmp["tmp"] = doc.data();
      });
  }
  for (let i = 0; i < tmp["tmp"].messageWithIDs.length; i++) {
    await firestore
      .doc(`messages/${tmp["tmp"].messageWithIDs[i]}`)
      .get()
      .then((doc) => {
        data[doc.id] = doc.data();
      });
  }
  return data;
};

/////////////////////////////////////////////////
export const addComment = async (
  currentUser,
  postId,
  postByEmail,
  commentData
) => {
  if (!currentUser) return;
  const postByUserId = await getUserIdByEmail(postByEmail);

  const commentRef = firestore
    .collection(`users/${postByUserId}/posts/${postId}/comments`)
    .doc();

  const notificationsRef = firestore
    .collection(`users/${postByUserId}/notifications`)
    .doc();

  try {
    const createdAt = new Date();
    await commentRef.set({
      createdAt,
      displayName: currentUser.displayName,
      email: currentUser.email,
      profileImage: currentUser.profileImage,
      commentData,
    });
    await notificationsRef.set({
      createdAt,
      postId,
      commentedBy: currentUser,
      type: "comment",
      viewed: false,
    });
  } catch (error) {
    console.log("error creating COMMENT", error.message);
  }
};

export const getComments = async (currentUser, postId, postByEmail) => {
  if (!currentUser) return;
  const data = {};
  const postByUserId = await getUserIdByEmail(postByEmail);

  for (let i = 0; i < 1; i++) {
    const commentsSnapShot = await firestore
      .collection(`users/${postByUserId}/posts/${postId}/comments`)
      .orderBy("createdAt", "asc")
      .get();
    commentsSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  }
  return data;
};

////////////////////////////////////////////////////////////////
export const addRetweet = async (
  currentUser,
  displayName,
  email,
  postData,
  postId,
  profileImage,
  retweet
) => {
  if (!currentUser) return;
  const postByUserId = await getUserIdByEmail(email);
  const retweetRef = firestore
    .collection(`users/${currentUser.id}/posts`)
    .doc();

  const notificationsRef = firestore
    .collection(`users/${postByUserId}/notifications`)
    .doc();
  try {
    const createdAt = new Date();
    const retweetByEmail = currentUser.email;
    const retweetByDisplayName = currentUser.displayName;
    const retweetByProfileImage = currentUser.profileImage;
    await retweetRef.set({
      postData,
      createdAt,
      displayName,
      email,
      postId,
      profileImage,
      retweet,
      retweetByEmail,
      retweetByDisplayName,
      retweetByProfileImage,
    });
    await notificationsRef.set({
      createdAt,
      postId,
      retweetId: retweetRef.id,
      retweetedBy: currentUser,
      type: "retweet",
      viewed: false,
    });
  } catch (error) {
    console.log("error creating retweet", error.message);
  }
};
/////////////////////////////////////////////////////////
export const addLike = async (currentUser, postId, postByEmail) => {
  if (!currentUser) return;
  const postByUserId = await getUserIdByEmail(postByEmail);

  const postRef = firestore.doc(`users/${postByUserId}/posts/${postId}`);
  const notificationsRef = firestore
    .collection(`users/${postByUserId}/notifications`)
    .doc();

  try {
    const createdAt = new Date();
    await postRef.update({ likes: { [currentUser.id]: createdAt } });
    await notificationsRef.set({
      likedBy: currentUser,
      postId,
      createdAt,
      type: "like",
      viewed: false,
    });
  } catch (error) {
    console.log("error creating post", error.message);
  }
};

export const removeLike = async (currentUser, postId, postByEmail) => {
  if (!currentUser) return;
  const postByUserId = await getUserIdByEmail(postByEmail);
  const postRef = firestore.doc(`users/${postByUserId}/posts/${postId}`);
  try {
    await postRef.set(
      { likes: { [currentUser.id]: firebase.firestore.FieldValue.delete() } },
      { merge: true }
    );
  } catch (error) {
    console.log("error creating post", error.message);
  }
};
/*************************************** */
export const getNotifications = async (currentUser) => {
  if (!currentUser) return;
  const data = {};
  for (let i = 0; i < 1; i++) {
    const notificationsSnapShot = await firestore
      .collection(`users/${currentUser.id}/notifications`)
      .orderBy("createdAt", "desc")
      .get();
    notificationsSnapShot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  }
  return data;
};

export const updateNotifications = async (currentUser) => {
  if (!currentUser) return;
  for (let i = 0; i < 1; i++) {
    await firestore
      .collection(`users/${currentUser.id}/notifications`)
      .where("viewed", "==", false)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          const notificationRef = firestore.doc(
            `users/${currentUser.id}/notifications/${doc.id}`
          );
          try {
            notificationRef.set({ viewed: true }, { merge: true });
          } catch (error) {
            console.log("error creating post", error.message);
          }
        });
      });
  }
};

/////////////////////////////////////////////////////
export const changePassword = async (currentUser) => {
  if (!currentUser) return;
  const email = currentUser.email;
  try {
    auth.sendPasswordResetEmail(email);
  } catch (error) {
    console.log("error creating post", error.message);
  }
};

export const changeCoverPhoto = async (currentUser, image) => {
  if (!currentUser) return;
  const uploadTask = storage
    .ref(`images/${currentUser.email}/coverPhoto/${image.name}`)
    .put(image);
  const userRef = firestore.doc(`users/${currentUser.id}`);
  try {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(currentUser.email)
          .child("coverPhoto")
          .child(image.name)
          .getDownloadURL()
          .then(async (url) => {
            await userRef.update({
              coverImage: url,
            });
          });
      }
    );
  } catch (error) {
    console.log("error creating cover photo", error.message);
  }
};

export const changeProfilePhoto = async (currentUser, image) => {
  if (!currentUser) return;
  const uploadTask = storage
    .ref(`images/${currentUser.email}/profilePhoto/${image.name}`)
    .put(image);
  const userRef = firestore.doc(`users/${currentUser.id}`);
  try {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(currentUser.email)
          .child("profilePhoto")
          .child(image.name)
          .getDownloadURL()
          .then(async (url) => {
            await userRef.update({
              profileImage: url,
            });
          });
      }
    );
  } catch (error) {
    console.log("error creating profile photo", error.message);
  }
};

//////////////////////////////////////////////////
export const getUserIdByEmail = async (email) => {
  let userIdByEmail = "";

  for (let i = 0; i < 1; i++) {
    const userSnapShot = await firestore
      .collection(`users`)
      .where("email", "==", email)
      .get();
    userIdByEmail =
      userSnapShot.empty === true ? null : userSnapShot.docs[0].id;
  }
  return userIdByEmail;
};

export const getUserDataBySearchValue = async (searchValue) => {
  let userBySearchValue = {};
  let tmp = {};
  let followers, followings;
  for (let i = 0; i < 1; i++) {
    const postBySnapShot = await firestore
      .collection(`users`)
      .where("email", "==", searchValue)
      .get();
    tmp = postBySnapShot.docs[0];
    userBySearchValue["id"] = tmp.id;
    followers = await getUserFollowers(userBySearchValue);
    followings = await getUserFollowings(userBySearchValue);
    userBySearchValue["followers"] = followers;
    userBySearchValue["followings"] = followings;
  }

  Object.keys(tmp.data()).map((key) => {
    userBySearchValue[key] = tmp.data()[key];
  });
  return userBySearchValue;
};
////////////////////////////////////////////////////////////////////

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
