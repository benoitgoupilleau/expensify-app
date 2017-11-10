import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE
} from '../../actions/types';


test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: REMOVE_EXPENSE,
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New value' });
  expect(action).toEqual({
    type: EDIT_EXPENSE,
    id: '123abc',
    updates: { note: 'New value' }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense({ description: 'Hello', note: 'Note', amount: 123, createdAt: 123 });
  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: {
      description: 'Hello',
      note: 'Note',
      createdAt: 123,
      amount: 123,
      id: expect.any(String)
    }
  });
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: {
      description: '',
      note: '',
      createdAt: 0,
      amount: 0,
      id: expect.any(String)
    }
  });
});