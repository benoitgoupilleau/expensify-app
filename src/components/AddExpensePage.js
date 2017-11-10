import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// class AddExpensePage extends React.Component {
//   onSubmit = (expense) => {
//     this.props.addExpense(expense);
//     this.props.history.push('/');
//   };

//   render() {
//     return (
//       <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//           buttonMessage="Add Expense"
//           onSubmit={this.onSubmit}
//         />
//       </div>
//     );
//   }
// }

export const AddExpensePage = (props) => ( // export for test
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      buttonMessage="Add Expense"
      onSubmit={(expense) => {
        props.addExpense(expense);
        props.history.push('/');
      }}
    />
  </div>
);

export default connect(null, { addExpense })(AddExpensePage);