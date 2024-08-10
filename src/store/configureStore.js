import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createReducerManager } from './reducerManager';
import auth from './auth';
import notifications from './notifications';
import { composeWithDevTools } from '@redux-devtools/extension';

const initialReducers = {
  auth,
  notifications,
};

export default function configureStore(preloadedState) {
  const reducerManager = createReducerManager(initialReducers);

  const store = createStore(
    reducerManager.reduce,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  store.reducerManager = reducerManager;

  return store;
}
