import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export const EditExpensePage = (props) => { // export for test
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="content-container" >
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm
          expense={props.expense}
          buttonMessage="Save Expense"
          onSubmit={(expense) => {
            props.startEditExpense(props.match.params.id, expense);
            props.history.push('/dashboard');
          }}
        />
        <button
          className="button button--secondary"
          onClick={() => {
            props.startRemoveExpense({ id: props.match.params.id });
            props.history.push('/dashboard');
          }}
        >Remove Expense
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps, { startEditExpense, startRemoveExpense })(EditExpensePage);
