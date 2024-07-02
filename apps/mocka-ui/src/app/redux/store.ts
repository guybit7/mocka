import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './app-slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { listApi } from '../components/list/list-api';

const preloadedState = {};

const rootReducer = combineReducers({
  app: appReducer,
  [listApi.reducerPath]: listApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listApi.middleware),
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export default store;
