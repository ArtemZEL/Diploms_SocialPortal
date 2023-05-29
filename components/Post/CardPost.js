import React, { useState } from "react";
import { Card, Icon, Divider, Segment, Button, Popup, Header, Modal } from "semantic-ui-react";
import Link from "next/link";
import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import { deletePost, likePost } from "../../utils/postActions";
import LikesList from "./LikesList";
import ImageModal from "./ImageModal";
import NoImageModal from "./NoImageModal";
import Avatar from "./Avatar";
import VideoModal from "./VideoModal";

function CardPost({ post, user, setPosts, socket }) {
  const [likes, setLikes] = useState(post.likes);
  const isLiked = likes.some((like) => like.user === user._id);
  const [comments, setComments] = useState(post.comments);
  const [showModal, setShowModal] = useState(false);
  const addPropsToModal = { post, user, setLikes, likes, isLiked, comments, setComments };

  return (
    <>
      {showModal && (
        <Modal open={showModal} closeIcon closeOnDimmerClick onClose={() => setShowModal(false)}>
          <Modal.Content>
            {post.picUrl && !post.videoUrl ? (
              <ImageModal {...addPropsToModal} />
            ) : post.videoUrl && !post.picUrl ? (
              <VideoModal {...addPropsToModal} />
            ) : (
              <NoImageModal {...addPropsToModal} />
            )}
          </Modal.Content>
        </Modal>
      )}

      <Segment basic>
        <Card color="teal" fluid>
          {post.picUrl && !post.videoUrl && (
            <img
              loading="lazy"
              src={post.picUrl}
              style={{ cursor: "pointer" }}
              alt="PostImag"
              onClick={() => setShowModal(true)}
            />
          )}

          {post.videoUrl && !post.picUrl && (
            <video
              style={{ cursor: "default", width: "100%", height: "100%" }}
              onClick={() => setShowModal(true)}
              controls
              autoPlay={false} // Добавленный атрибут
            >
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {post.picUrl && post.videoUrl && (
            <>
              <img
                loading="lazy"
                src={post.picUrl}
                style={{ cursor: "pointer" }}
                alt="PostImage"
                onClick={() => setShowModal(true)}
              />
              <video
                style={{ cursor: "pointer" }}
                onClick={() => setShowModal(true)}
                controls
                autoPlay={false} // Добавленный атрибут
              >
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          )}

          <Card.Content className="relative">
            {(user.role === "root" || post.user._id === user._id) && (
              <div style={{ position: "absolute", right: "10px" }}>
                <Popup
                  on="click"
                  position="top right"
                  trigger={
                    <img
                      alt="deleteIcon"
                      loading="lazy"
                      style={{ cursor: "pointer" }}
                      src="/deleteIcon.svg"
                      height={35}
                      width={35}
                    />
                  }
                >
                  <Header as="h4" content="Вы уверены?" />
                  <p>Потом восстановить невозможно</p>

                  <Button
                    color="red"
                    icon="trash"
                    content="Delete"
                    onClick={() => deletePost(post._id, setPosts)}
                  />
                </Popup>
              </div>
            )}

            <div className="flex" style={{ gap: "1rem" }}>
              <Avatar alt={post.user.name} src={post.user.profilePicUrl} />

              <div>
                <h4 style={{ marginBottom: "2px" }}>
                  <Link href={`/${post.user.username}`}>{post.user.name}</Link>
                </h4>
                <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>

                {post.location && <Card.Meta content={post.location} />}
              </div>
            </div>

            <Card.Description>
              {post.repostUrl && (
                <a href={post.repostUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="retweet" color="teal" />
                  Reposted from: {post.repostUrl}
                </a>
              )}
            </Card.Description>

            <Card.Description className="cardDescription">{post.text}</Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Icon
              name={isLiked ? "heart" : "heart outline"}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (socket.current) {
                  socket.current.emit("likePost", {
                    postId: post._id,
                    userId: user._id,
                    like: isLiked ? false : true,
                  });

                  socket.current.on("postLiked", () => {
                    if (isLiked) {
                      setLikes((prev) => prev.filter((like) => like.user !== user._id));
                    } else {
                      setLikes((prev) => [...prev, { user: user._id }]);
                    }
                  });
                } else {
                  likePost(post._id, user._id, setLikes, isLiked ? false : true);
                }
              }}
            />

            <LikesList
              postId={post._id}
              trigger={
                likes.length > 0 && (
                  <span className="spanLikesList">
                    {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                  </span>
                )
              }
            />

            <Icon name="comment outline" style={{ marginLeft: "7px" }} color="blue" />

            {comments.map((comment, i) => (
              i < 3 && (
                <PostComments
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                  user={user}
                  setComments={setComments}
                />
              )
            ))}

            {comments.length > 3 && (
              <Button
                content="View More"
                color="teal"
                basic
                circular
                onClick={() => setShowModal(true)}
              />
            )}

            <Divider hidden />

            <CommentInputField user={user} postId={post._id} setComments={setComments} />
          </Card.Content>
        </Card>
      </Segment>
      <Divider hidden />
    </>
  );
}

export default CardPost;
