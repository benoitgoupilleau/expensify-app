import { startAddExpense, addExpense, removeExpense, startRemoveExpense, editExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES
} from '../../actions/types';

import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

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
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const exepenseData = {
    description: 'Mouse',
    amount: 4000,
    note: 'best',
    createdAt: 1000
  };
  store.dispatch(startAddExpense(exepenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ADD_EXPENSE,
      expense: {
        id: expect.any(String),
        ...exepenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(exepenseData);
    done();
  });
});

test('should add expense to database and store with default value', (done) => {
  const store = createMockStore({});
  const exepenseData = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ADD_EXPENSE,
      expense: {
        id: expect.any(String),
        ...exepenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(exepenseData);
    done();
  });
});

test('should setup setExpenses action with criteria', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: SET_EXPENSES,
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: SET_EXPENSES,
      expenses
    });
    done();
  });
});

test('should remove expenses from firebase', (done) =>{
  const store = createMockStore({});
  const { id } = expenses[1];
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_EXPENSE,
      id
    });
    database.ref(`expenses/${id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toBe(null);
      done();
    });
  });
});
