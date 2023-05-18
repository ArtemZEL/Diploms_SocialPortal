const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const baseUrl = require("../utils/baseUrl");
const isEmail = require("validator/lib/isEmail");

const transporter = nodemailer.createTransport({
  service: "Yandex",
  auth: {
    user: process.env.yandex_email,
    pass: process.env.yandex_password
  }
});

// ПРОВЕРКА СУЩЕСТВОВАНИЯ ПОЛЬЗОВАТЕЛЯ И ОТПРАВКА ПИСЬМА ДЛЯ СБРОСА ПАРОЛЯ
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) {
      return res.status(401).send("Invalid Email");
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    await user.save();

    const href = `${baseUrl}/reset/${token}`;

    const mailOptions = {
      to: user.email,
      from: process.env.yandex_email,
      subject: "Привет! Запрос на сброс пароля",
      html: `<p>Привет, ${user.name.split(" ")[0]}! Поступил запрос на сброс пароля. <a href=${href}>Щелкните по этой ссылке для сброса пароля</a></p>
      <p>Этот токен действителен только в течение 1 часа.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email sent successfully");
      }
    });

    return res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// ПРОВЕРКА ТОКЕНА И СБРОС ПАРОЛЯ В БД
router.post("/token", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    if (password.length < 6) {
      return res.status(401).send("Password must be at least 6 characters");
    }

    const user = await UserModel.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (Date.now() > user.expireToken) {
      return res.status(401).send("Token expired. Generate a new one");
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = "";
    user.expireToken = undefined;

    await user.save();

    return res.status(200).send("Password updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
