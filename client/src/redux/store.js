import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartRedux';
import userReducer from './userRedux';

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
  whitelist: ['currentUser']
}

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);