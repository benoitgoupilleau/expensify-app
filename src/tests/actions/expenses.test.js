import {
  startAddExpense,
  addExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
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

const uid = '123abc';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: REMOVE_EXPENSE,
    id: '123abc'
  });
});

test('should remove expenses from firebase', (done) =>{
  const store = createMockStore(defaultAuthState);
  const { id } = expenses[1];
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_EXPENSE,
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('should update expense on firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const { id } = expenses[0];
  const updates = {
    description: 'Hello',
    note: 'new note'
  };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: EDIT_EXPENSE,
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      ...updates,
      amount: 195,
      createdAt: 0
    });
    done();
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
  const store = createMockStore(defaultAuthState);
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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(exepenseData);
    done();
  });
});

test('should add expense to database and store with default value', (done) => {
  const store = createMockStore(defaultAuthState);
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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: SET_EXPENSES,
      expenses
    });
    done();
  });
});
