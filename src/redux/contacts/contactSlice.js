import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  fetchContacts,
  addContact,
  deleteContact,
} from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const customArrThunks = [
  fetchContacts,
  addContact,
  deleteContact,
];

const status = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const fn = status => customArrThunks.map(el => el[status]);

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledGet = (state, { payload }) => {
  state.items = payload;
};

const handleAddContact = (state, { payload }) => {
  state.items.push(payload);
};

const handleDeleteContact = (state, action) => {
          state.items = state.items.filter(contact => contact.id !== action.payload);
        };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    const { pending, fulfilled, rejected } = status;
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleAddContact)
      .addCase(deleteContact.fulfilled, handleDeleteContact)
      .addMatcher(isAnyOf(...fn(pending)), handlePending)
      .addMatcher(isAnyOf(...fn(fulfilled)), handleFulfilled)
      .addMatcher(isAnyOf(...fn(rejected)), handleRejected);
  },
});

export const contactReducer = contactsSlice.reducer;
