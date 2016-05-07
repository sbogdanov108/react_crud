import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';

import reducers from './reducers';
import routes from './routes';

// все наши action будут проходить через middleware, прежде чем достигнуть reducer
const createStoreWithMiddleware = applyMiddleware(
  promise
)( createStore );

// подключаем роутер
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>
  , document.querySelector( '.container' )
);
