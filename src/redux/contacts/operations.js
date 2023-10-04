import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import * as api from '../apiContacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll', 
  async (_, thunkAPI) => {
    try {
      const { data } = await api.getAllContacts();
      return data;
    } catch ({response}) {
        // console.error('Error fetching contacts:', error);
      return thunkAPI.rejectWithValue(
        `Ooops! Somthing Wrong...`
      );
    }
  }
);


const isDublicate = (contacts, { name, phone }) => {
  const normalizedName = name.toLowerCase().trim();
  const normalizedNumber = phone.trim();

  const dublicate = contacts.some(
    contact =>
      contact.name.toLowerCase().trim() === normalizedName ||
      contact.phone.trim() === normalizedNumber
  );
  return dublicate;
};

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const { data: result } = await api.addContact(data);
      toast.success('Add contact', {
        position: 'bottom-right',
      });
      return result;
    } catch ({ response }) {
      return rejectWithValue(`Ooops! Somthing Wrong...`);
    }
  },
  
  {
    condition: (data, { getState }) => {
      const {
        contacts: { items },
      } = getState();

      if (isDublicate(items, data)) {
        toast.error(`This contact is already in contacts`);
        return false; 
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContact(id);
      toast.success('Contact delete', {
        position: 'bottom-right',
      });
      return id;
    } catch ({ response }) {
      return rejectWithValue(`Ooops! Somthing Wrong...`);
    }
  }
);
