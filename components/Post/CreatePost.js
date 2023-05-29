import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Form, Button, Divider, Icon, Embed } from "semantic-ui-react";
import { uploadPic, uploadVideo } from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";
import CropImageModal from "./CropImageModal";
import Avatar from "./Avatar";

function CreatePost({ user, setPosts }) {
  const [newPost, setNewPost] = useState({ text: "", location: "", repost: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const inputVideo = useRef();

  const [highlighted, setHighlighted] = useState(false);

  const [media, setMedia] = useState(null);
  const [video, setVideo] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image")) {
          setMedia(file);
          return setMediaPreview(URL.createObjectURL(file));
        }
      }
    }
    if (name === "video") {
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("video")) {
          setVideo(file);
          return setVideoPreview(URL.createObjectURL(file));
        }
      }
    }
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addStyles = () => ({
    textAlign: "center",
    height: "250px",
    width: "150px",
    border: "dotted",
    paddingTop: (media === null && "40px") || (video === null && "40px"),
    cursor: "pointer",
    borderColor: highlighted ? "green" : "black",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;
    let videoUrl;
    if (media) {
      picUrl = await uploadPic(media);
      if (!picUrl) {
        setLoading(false);
        return toast.error("Ошибка загрузки изображения");
      }
    }
    if (video) {
      videoUrl = await uploadVideo(video);
      if (!videoUrl) {
        setLoading(false);
        return toast.error("Ошибка загрузки видео");
      }
    }
    try {
      const { data } = await submitNewPost(newPost, picUrl, videoUrl, newPost.repost); // Pass the repost URL here

      const createdPost = {
        ...data,
        user,
        likes: [],
        comments: [],
      };

      setPosts((prev) => [createdPost, ...prev]);

      setNewPost({ text: "", location: "", repost: "" });

      if (media) {
        setMedia(null);
        setMediaPreview(null);
        URL.revokeObjectURL(mediaPreview);
      }
      if (video) {
        setVideo(null);
        setVideoPreview(null);
        URL.revokeObjectURL(videoPreview);
      }
    } catch (error) {
      toast.error(error);
    }

    setLoading(false);
  };

  const dragEvent = (e, valueToSet) => {
    e.preventDefault();
    setHighlighted(valueToSet);
  };

  return (
    <>
      {showModal && (
        <CropImageModal
          mediaPreview={mediaPreview}
          setMedia={setMedia}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Avatar
            alt={user.name}
            src={user.profilePicUrl}
            styles={{ display: "inline-block" }}
          />
          <Form.TextArea
            placeholder="Напишите ваш новый пост"
            name="text"
            value={newPost.text}
            onChange={handleChange}
            rows={4}
            width={14}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            value={newPost.location}
            name="location"
            onChange={handleChange}
            label="Добавить локацию"
            icon="map marker alternate"
            placeholder="Где это вы находитесь?"
          />

          <Form.Input
            value={newPost.repost}
            name="repost"
            onChange={handleChange}
            label="Ссылка на оригинальный пост"
            icon="share alternate"
            placeholder="Вставьте ссылку на пост"
          />

          <input
            ref={inputRef}
            onChange={handleChange}
            name="media"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          />
          <input
            ref={inputVideo}
            onChange={handleChange}
            name="video"
            style={{ display: "none" }}
            type="file"
            accept="video/*"
          />
        </Form.Group>
        <div
          onClick={() => inputRef.current.click()}
          style={addStyles()}
          onDragOver={(e) => dragEvent(e, true)}
          onDragLeave={(e) => dragEvent(e, false)}
          onDrop={(e) => {
            dragEvent(e, true);

            const droppedFile = Array.from(e.dataTransfer.files);

            if (droppedFile?.length > 0) {
              setMedia(droppedFile[0]);
              setMediaPreview(URL.createObjectURL(droppedFile[0]));
            }
          }}
        >
          {media === null ? (
            <Icon name="image" size="big" />
          ) : (
            <img
              style={{ height: "100px", width: "100px" }}
              src={mediaPreview}
              alt="PostImage"
            />
          )}
        </div>
        <Divider hidden />
        <div
          onClick={() => inputVideo.current.click()}
          style={addStyles()}
          onDragOver={(e) => dragEvent(e, true)}
          onDragLeave={(e) => dragEvent(e, false)}
          onDrop={(e) => {
            dragEvent(e, true);

            const droppedFile = Array.from(e.dataTransfer.files);

            if (droppedFile?.length > 0) {
              setVideo(droppedFile[0]);
              setVideoPreview(URL.createObjectURL(droppedFile[0]));
            }
          }}
        >
          {video === null ? (
            <Icon name="video" size="big" />
          ) : (
            <video
              style={{ height: "100px", width: "100px" }}
              src={videoPreview}
              alt="PostVideo"
              controls
              type="video/mp4"
            />
          )}
        </div>

        {mediaPreview !== null && (
          <>
            <Divider hidden />

            <Button
              content="Обрезать изображение"
              type="button"
              primary
              circular
              onClick={() => setShowModal(true)}
            />
          </>
        )}

        {newPost.repost !== "" && (
          <>
            <Divider hidden />
            <Embed url={newPost.repost} placeholder={mediaPreview} />
          </>
        )}

        <Divider hidden />

        <Button
          circular
          disabled={newPost.text === "" || loading}
          content={<strong>Запостить</strong>}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          icon="send"
          loading={loading}
        />
      </Form>
      <Divider />
    </>
  );
}

export default CreatePost;
