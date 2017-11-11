import getExpensesTotal from '../../selectors/expenses-total';

import expenses from '../fixtures/expenses';

test('should correctly sum the total of all expenses', () => {
  const total = getExpensesTotal(expenses);
  expect(total).toBe(124695);
});

test('should correctly sum the total for one expense', () => {
  const total = getExpensesTotal([expenses[1]]);
  expect(total).toBe(120000);
});

test('should correctly sum the total for one expense', () => {
  const total = getExpensesTotal([]);
  expect(total).toBe(0);
});