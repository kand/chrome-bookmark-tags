import {
  applyMiddleware,
  createStore
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import RootReducer from 'app/reducers';

export let store = createStore(
  RootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

