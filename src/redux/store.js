import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contacts/contactSlice';

import { filterReducer } from './filter/filterSlice';


export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});


