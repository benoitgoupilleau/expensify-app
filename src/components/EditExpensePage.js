import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export const EditExpensePage = (props) => { // export for test
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        buttonMessage="Save"
        onSubmit={(expense) => {
          props.startEditExpense(props.match.params.id, expense);
          props.history.push('/dashboard');
        }}
      />
      <button onClick={() => {
        props.startRemoveExpense({ id: props.match.params.id });
        props.history.push('/dashboard');
        }}
      >Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps, { startEditExpense, startRemoveExpense })(EditExpensePage);
