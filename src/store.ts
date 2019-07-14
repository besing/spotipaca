import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import combinedReducers from './reducers/index';

export default createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
