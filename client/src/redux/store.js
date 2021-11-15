import { configureStore, combineReducers } from '@reduxjs/toolkit';
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

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

// const persistedReducer = persistReducer(persistConfig, userReducer)
const rootReducers = combineReducers({
  user: userReducer,
  cart: cartReducer
});
const persistedReducers = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);