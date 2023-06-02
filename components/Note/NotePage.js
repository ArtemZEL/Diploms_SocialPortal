import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Grid, Icon, Modal } from 'semantic-ui-react';
import axios from '../../utils/noteAction';

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', description: '', tags: '', color: '' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNote, setEditNote] = useState({});
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      const { data } = await axios.get('/');
      setNotes(data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewNote = async () => {
    try {
      const noteWithColor = { ...newNote, color: selectedColor };
      const { data } = await axios.post('/', noteWithColor);
      setNotes([...notes, data.note]);
      setNewNote({ title: '', description: '', tags: '', color: '' });
    } catch (error) {
      console.error(error);
    }
  };
  

  const updateNote = async (noteId, updatedNote) => {
    try {
      await axios.put(`/${noteId}`, updatedNote);
      getAllNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`/${noteId}`);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const openEditModal = (note) => {
    setEditModalOpen(true);
    setEditNote({
      _id: note._id,
      title: note.title,
      description: note.description,
      tags: note.tags,
      color: note.color,
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditNote({});
  };

  const saveEditedNote = async () => {
    try {
      await updateNote(editNote._id, editNote);
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleColorChange = async (noteId, color) => {
    try {
      const updatedNotes = notes.map((note) => {
        if (note._id === noteId) {
          return { ...note, color };
        }
        return note;
      });
      setNotes(updatedNotes);
      
      const updatedNote = { ...notes.find((note) => note._id === noteId), color };
      await updateNote(noteId, updatedNote);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Grid centered columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Card.Group>
            {notes.map((note) => (
              <Card
                key={note._id}
                className="note-card"
                style={{ backgroundColor: note.color || 'red', color: 'white' }}
              >
                <Card.Content>
                  <Card.Header>Заголовок: {note.title}</Card.Header>
                  <Card.Meta>Дата: {new Intl.DateTimeFormat('default', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(note.date))}</Card.Meta>
                  <Card.Description>Описание: {note.description}</Card.Description>
                  <Card.Meta>Теги: {note.tags}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    icon
                    color="red"
                    onClick={() => deleteNote(note._id)}
                  >
                    <Icon name="trash" />
                  </Button>
                  <Button
                    icon
                    color="blue"
                    onClick={() => openEditModal(note)}
                  >
                    <Icon name="edit" />
                  </Button>
                  <Modal
                    open={editModalOpen}
                    onClose={closeEditModal}
                    size="tiny"
                    className="edit-modal"
                  >
                    <Modal.Header>Редактировать заметку</Modal.Header>
                    <Modal.Content>
                      <Form>
                        <Form.Input
                          label="Заголовок"
                          name="title"
                          value={editNote.title || ''}
                          onChange={handleEditInputChange}
                        />
                        <Form.Input
                          label="Описание"
                          name="description"
                          value={editNote.description || ''}
                          onChange={handleEditInputChange}
                        />
                        <Form.Input
                          label="Теги"
                          name="tags"
                          value={editNote.tags || ''}
                          onChange={handleEditInputChange}
                        />
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={closeEditModal}>Отмена</Button>
                      <Button
                        color="blue"
                        onClick={saveEditedNote}
                      >
                        Обновить
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Input
              label="Заголовок"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Описание"
              name="description"
              value={newNote.description}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Теги"
              name="tags"
              value={newNote.tags}
              onChange={handleInputChange}
            />
            <Form.Select
              label="Цвет"
              name="color"
              value={selectedColor}
              options={[
                { key: 'blue', value: 'blue', text: 'Синий' },
                { key: 'red', value: 'red', text: 'Красный' },
                { key: 'green', value: 'green', text: 'Зеленый' },
                { key: 'yellow', value: 'yellow', text: 'Желтый' },
              ]}
              onChange={(e, { value }) => setSelectedColor(value)}
            />
            <Button primary onClick={addNewNote} style={{backgroundColor:"green"}}>
              Добавить заметку
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NotePage;
