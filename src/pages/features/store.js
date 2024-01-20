import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from './apiSlice';
import { thunk } from 'redux-thunk';


const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware, thunk),
});

export default store;
