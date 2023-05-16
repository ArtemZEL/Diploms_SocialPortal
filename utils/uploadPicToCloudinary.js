import axios from "axios";

const uploadPic = async media => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", "dkk8nrpkj");

    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.secure_url;
  } catch (error) {
    return;
  }
};
const uploadVideo = async video => {
  try {
    const form = new FormData();
    form.append("file", video);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", "dkk8nrpkj");

    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.secure_url;
  } catch (error) {
    return;
  }
};

export { uploadPic, uploadVideo };
