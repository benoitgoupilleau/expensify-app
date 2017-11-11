import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => { // Export for test
  const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';
  return (
    <div>
      <h1>Viewing {props.expenseCount} {expenseWord} totaling {numeral(props.expensesTotal / 100).format('0.00$')}</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenseCount: selectExpenses(state.expenses, state.filters).length,
  expensesTotal: getExpensesTotal(selectExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpenseSummary);

numeral.locale('fr');
