import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

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
  <div className="page-container">
    <div className="page-header">
      <div className="content-container" >
        <h1 className="page-header__title">Add Expense</h1>
      </div>
    </div>
    <div className="content-container">
      <ExpenseForm
        buttonMessage="Add Expense"
        onSubmit={(expense) => {
          props.startAddExpense(expense);
          props.history.push('/dashboard');
        }}
      />
    </div>
  </div>
);

export default connect(null, { startAddExpense })(AddExpensePage);
