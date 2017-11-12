import moment from 'moment';
import expensesReducer from '../../reducers/expenses';

import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES
} from '../../actions/types';

import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: REMOVE_EXPENSE,
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: REMOVE_EXPENSE,
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const newExpense = {
    id: '4',
    description: 'New expense',
    note: '',
    createdAt: moment(0).add(5, 'days').valueOf(),
    amount: 37000
  };
  const action = {
    type: ADD_EXPENSE,
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
  const action = {
    type: EDIT_EXPENSE,
    id: expenses[2].id,
    updates: { note: 'New note description' }
  };
  const state = expensesReducer(expenses, action);
  expect(state[2].note).toBe('New note description');
});

test('should not edit an expense if id not found', () => {
  const action = {
    type: EDIT_EXPENSE,
    id: '-12',
    updates: { note: 'New note description' }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: SET_EXPENSES,
    expenses
  };
  const initialExpense = [{
    id: '14',
    description: 'Initial',
    note: '',
    amount: 12,
    createdAt: 0
  }];
  const state = expensesReducer(initialExpense, action);
  expect(state).toEqual(expenses);
});
