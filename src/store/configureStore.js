import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS__EXTENSION__COMPOSE__ || compose;

export default () => {
  // Store
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }), composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
