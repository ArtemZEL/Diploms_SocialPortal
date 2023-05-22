import axios from 'axios';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import baseUrl from './baseUrl';

const Axios = axios.create({
  baseURL: `${baseUrl}/api/notes`,
  headers: { Authorization: cookie.get('token') }
});

const toastError = (error) => toast.error(error);

export const getAllNotes = async () => {
  try {
    const { data } = await Axios.get('/');
    return data.notes;
  } catch (error) {
    throw error;
  }
};

export const addNote = async (note) => {
  try {
    const { data } = await Axios.post('/', note);
    return data.note;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (noteId, updatedNote) => {
  try {
    const { data } = await Axios.put(`/${noteId}`, updatedNote);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    await Axios.delete(`/${noteId}`);
    toast.info('Заметка успешно удалена');
  } catch (error) {
    toastError(error);
  }
};

export default Axios;
