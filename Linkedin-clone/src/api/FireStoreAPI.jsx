/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  query,
  where,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

let postRef = collection(firestore, "Posts");
let userRef = collection(firestore, "Users");
let LikeRef = collection(firestore, "Likes");
let CommentRef = collection(firestore, "Comments");
let ConnectionRef = collection(firestore, "Connections");
let MessagingRef = collection(firestore, "Messages");

let currentEmail = localStorage.getItem("userEmail");

export const Post = async (object) => {
  addDoc(postRef, object)
    .then((result) => {
      toast.success("Post has been added successfully");
    })
    .catch((error) => {
      toast.error(error);
    });
};
export const GetPosts = (setAllPosts) => {
  onSnapshot(postRef, (res) => {
    setAllPosts(
      res.docs.map((post) => {
        return { ...post.data(), postId: post.id };
      })
    );
  });
};

export const AddUserInfo = async (object) => {
  try {
    let user = await addDoc(userRef, object);
    await setDoc(doc(userRef, user.id), { userId: user.id }, { merge: true });
  } catch (error) {
    toast.error("cannot add user");
  }
};

export const GetCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (res) => {
    setCurrentUser(
      res.docs
        .map((user) => {
          return { ...user.data(), userId: user.id };
        })
        .filter((user) => {
          return user.email === currentEmail;
        })[0]
    );
  });
};

export const EditProfile = (userId, payload) => {
  let user = doc(userRef, userId);
  updateDoc(user, payload)
    .then((result) => {
      toast.success("Profile has been updated successfully");
    })
    .catch((error) => {
      toast.error(error);
    });
};

export const GetUserById = (setUser, userId) => {
  onSnapshot(userRef, (res) => {
    setUser(
      res.docs
        .map((user) => {
          return { ...user.data() };
        })
        .filter((user) => {
          return user.userId === userId;
        })[0]
    );
  });
};

export const GetUsers = (setUsers) => {
  onSnapshot(userRef, (res) => {
    setUsers(
      res.docs.map((user) => {
        return { ...user.data() };
      })
    );
  });
};

export const LikePost = (userId, postId, isLiked) => {
  try {
    let docToLike = doc(LikeRef, `${userId}_${postId}`);
    if (isLiked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (error) {
    toast.error(error);
  }
};

export const GetLikesByUser = (userId, postId, setLikes, setisLiked) => {
  let LikesByUser = query(LikeRef, where("postId", "==", postId));
  onSnapshot(LikesByUser, (responce) => {
    let Likes = responce.docs.map((like) => {
      return like.data();
    });
    const isLiked = Likes.some((like) => like.userId === userId);
    setLikes(Likes.length);
    setisLiked(isLiked);
  });
};

export const PostComment = (object) => {
  try {
    addDoc(CommentRef, object);
  } catch (error) {
    console.log(error);
  }
};

export const GetCommentsByPost = (postId, setPostComments) => {
  let postcommnets = query(CommentRef, where("postId", "==", postId));
  onSnapshot(postcommnets, (responce) => {
    setPostComments(
      responce.docs.map((comment) => {
        return { ...comment.data(), commentId: comment.id };
      })
    );
  });
};

export const EditPost = (postId, status) => {
  let updatePost = doc(postRef, postId);
  updateDoc(updatePost, status)
    .then((result) => {
      toast.success("Post has been updated successfully");
    })
    .catch((error) => {
      toast.error(error);
    });
};

export const DeletePost = (postId) => {
  let deletePost = doc(postRef, postId);
  deleteDoc(deletePost)
    .then((result) => {
      toast.success("Post has been deleted successfully");
    })
    .catch((error) => {
      toast.error(error);
    });
};

export const AddConnection = (userId, targetId) => {
  try {
    let connectuser = doc(ConnectionRef, `${userId}_${targetId}`);

    setDoc(connectuser, { userId, targetId });
    toast.success("connection added");
  } catch (error) {
    console.log(error);

    toast.error("faild to connect");
  }
};

export const GetConnections = (setConnections) => {
  onSnapshot(ConnectionRef, (responce) => {
    setConnections(
      responce.docs.map((connection) => {
        return { ...connection.data(), connectionId: connection.id };
      })
    );
  });
};
