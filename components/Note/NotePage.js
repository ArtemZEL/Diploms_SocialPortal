import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Grid, Icon, Modal } from 'semantic-ui-react';
import axios from '../../utils/noteAction';

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', description: '', tags: '', color: 'blue' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNote, setEditNote] = useState({});

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
      const { data } = await axios.post('/', newNote);
      setNotes([...notes, data.note]);
      setNewNote({ title: '', description: '', tags: '', color: 'blue' });
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

  const handleColorChange = (noteId, color) => {
    const updatedNote = { ...notes.find((note) => note._id === noteId), color };
    updateNote(noteId, updatedNote);
  };

  return (
    <Grid centered columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Card.Group>
            {notes.map((note) => (
              <Card
                key={note._id}
                color={note.color}
                className="note-card"
              >
                <Card.Content>
                  <Card.Header>{note.title}</Card.Header>
                  <Card.Meta>{note.date}</Card.Meta>
                  <Card.Description>{note.description}</Card.Description>
                  <Card.Meta>{note.tags}</Card.Meta>
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
                    <Modal.Header>Edit Note</Modal.Header>
                    <Modal.Content>
                      <Form>
                        <Form.Input
                          label="Title"
                          name="title"
                          value={editNote.title || ''}
                          onChange={handleEditInputChange}
                        />
                        <Form.Input
                          label="Description"
                          name="description"
                          value={editNote.description || ''}
                          onChange={handleEditInputChange}
                        />
                        <Form.Input
                          label="Tags"
                          name="tags"
                          value={editNote.tags || ''}
                          onChange={handleEditInputChange}
                        />
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={closeEditModal}>Cancel</Button>
                      <Button
                        color="blue"
                        onClick={saveEditedNote}
                      >
                        Save
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
              label="Title"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Description"
              name="description"
              value={newNote.description}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Tags"
              name="tags"
              value={newNote.tags}
              onChange={handleInputChange}
            />
            <Form.Select
              label="Color"
              name="color"
              value={newNote.color}
              options={[
                { key: 'blue', value: 'blue', text: 'Blue' },
                { key: 'red', value: 'red', text: 'Red' },
                { key: 'green', value: 'green', text: 'Green' },
                { key: 'yellow', value: 'yellow', text: 'Yellow' },
              ]}
              onChange={(e, { value }) => setNewNote((prevNote) => ({ ...prevNote, color: value }))}
            />
            <Button primary onClick={addNewNote}>
              Add Note
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NotePage;
