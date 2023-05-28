const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const  PostModel  = require("../models/PostModel");
const RepostModel =require("../models/RepostModel");
// ПРОСМОТР РЕПОСТОВ ПОСТА
router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const reposts = await RepostModel.find({ originalPost: postId }).populate("user");

    return res.status(200).json(reposts);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// РЕПОСТ
router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const existingRepost = await RepostModel.findOne({ originalPost: postId, user: userId });
    if (existingRepost) {
      return res.status(401).send("Post already reposted");
    }

    const newRepost = {
      user: userId,
      originalPost: postId,
    };

    const repost = await new RepostModel(newRepost).save();

    return res.status(200).json(repost);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// УДАЛЕНИЕ РЕПОСТА
router.delete("/:repostId", authMiddleware, async (req, res) => {
  try {
    const { repostId } = req.params;
    const { userId } = req;

    const repost = await RepostModel.findById(repostId);
    if (!repost) {
      return res.status(404).send("Repost not found");
    }

    if (repost.user.toString() !== userId) {
      return res.status(401).send("Unauthorized");
    }

    await repost.remove();

    return res.status(200).send("Repost deleted successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
