/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import {
  GetCommentsByPost,
  GetLikesByUser,
  LikePost,
  PostComment,
} from "../../api/FireStoreAPI";
import "./index.scss";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import getCurrentTimeStamp from "../../heplers/useMoment";
import { useApp } from "../../heplers/Context/useAppContext";
import userImage from "../../assets/user.png";

export default function LikeButton({ userId, postId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);
  const [takeComment, setTakeComment] = useState("");
  const [postComments, setPostComments] = useState([]);

  const addLike = async () => {
    LikePost(userId, postId, isLiked);
    setIsLiked(!isLiked);
  };

  const { CurrentUser } = useApp();

  const ShowPostComment = (event) => {
    setShowPostComment(event.target.value.length > 0);
    setTakeComment(event.target.value);
  };

  useMemo(() => {
    GetLikesByUser(userId, postId, setLikes, setIsLiked);
    GetCommentsByPost(postId, setPostComments);
  }, [userId, postId]);

  const postComment = () => {
    if (takeComment.trim()) {
      PostComment({
        userId: userId,
        postId: postId,
        timeStamp: getCurrentTimeStamp("LL"),
        comment: takeComment,
        username: CurrentUser.username,
      });
      setTakeComment("");
      setShowPostComment(false);
      setShowComment(false);
    }
  };

  return (
    <div className="like-container">
      <div className="div-container">
        <span>
          {likes} <small>people liked this post</small>
        </span>
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={addLike}>
          {isLiked ? (
            <div className="like">
              <AiFillLike size={25} color="blue" />
            </div>
          ) : (
            <div className="like">
              <AiOutlineLike size={25} />
            </div>
          )}
          <p>{isLiked ? "Liked" : "Like"}</p>
        </div>
        <div
          className="likes-comment-inner"
          onClick={() => setShowComment(!showComment)}
        >
          <FaRegCommentDots size={25} />
          <p className="comment">Comment</p>
        </div>
      </div>
      {showComment && (
        <>
          <div className="cont">
            <img src={CurrentUser?.imageUrl || userImage} alt="imageProfileComment" className="imageProfileComment"/>
            <input
              placeholder="Add a comment..."
              className="comment-input"
              value={takeComment}
              onChange={ShowPostComment}
            />
          </div>
          {showPostComment && (
            <button className="add-comment-btn" onClick={postComment}>
              Post
            </button>
          )}
          {postComments.length > 0 &&
            postComments.map((comment, index) => (
              <div key={index} className="all-comments">
                <p>{comment.username}</p>
                <p className="name">{comment.comment}</p>
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
