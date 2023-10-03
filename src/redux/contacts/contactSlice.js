import { createSlice } from '@reduxjs/toolkit';

  const contactSlice = createSlice({
    name: 'contacts',
    initialState: { items: [] },
    reducers: {
      addContact(state, action) {
        state.items.push(action.payload);
      },
      deleteContact(state, action) {
        state.items = state.items.filter(contact => contact.id !== action.payload);
      },
    
    },
  });
  
  export const { addContact, deleteContact, loadContacts } = contactSlice.actions;
  
  export const contactReducer = contactSlice.reducer;
