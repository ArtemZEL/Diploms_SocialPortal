const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel'); // Подключаем модель заметок
const authMiddleware = require('../middleware/authMiddleware'); // Подключаем middleware для проверки авторизации

// Защищаем маршруты с помощью middleware для проверки авторизации
router.use(authMiddleware);

// Получение всех заметок
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }); // Получаем заметки только для авторизованного пользователя
    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавление новой заметки
router.post('/', async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const newNote = new Note({
      user: req.userId,
      title,
      description,
      tags
    });
    const savedNote = await newNote.save();
    res.status(201).json({ note: savedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновление заметки
router.put('/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, description, tags } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        title,
        description,
        tags
      },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удаление заметки
router.delete('/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;
    await Note.findByIdAndRemove(noteId);
    res.status(200).json({ message: 'Заметка успешно удалена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
