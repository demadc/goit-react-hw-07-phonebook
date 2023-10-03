import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contacts/contactSlice';

import{persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { filterReducer } from './filter/filterSlice';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';  

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['items']
}

const persistedContactReducer = persistReducer(persistConfig, contactReducer)

export const store = configureStore({
  reducer: {
    contacts: persistedContactReducer,
    filter: filterReducer,
  },
  middleware(getDefaultMiddleware){
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor= persistStore(store)
