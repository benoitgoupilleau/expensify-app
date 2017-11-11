import React from 'react';
import { shallow } from 'enzyme';
import numeral from 'numeral';

import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';
import getExpensesTotal from '../../selectors/expenses-total';

test('should render ExpenseSummary correctly', () => {
  const expenseCount = expenses.length;
  const expensesTotal = getExpensesTotal(expenses);
  const wrapper = shallow(<ExpenseSummary expenseCount={expenseCount} expensesTotal={expensesTotal} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary correctly with 2 expenses', () => {
  const expenseCount = expenses.length;
  const expensesTotal = getExpensesTotal(expenses);
  const wrapper = shallow(<ExpenseSummary expenseCount={expenseCount} expensesTotal={expensesTotal} />);
  expect(wrapper).toMatchSnapshot();
});


numeral.register('locale', 'fr', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal : function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: '€'
  }
});
