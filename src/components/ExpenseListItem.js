import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format('LL')}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format('0.00$')}</h3>
  </Link>
);

export default ExpenseListItem;

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
  ordinal: (number) => (number === 1 ? 'er' : 'ème'),
  currency: {
    symbol: '€'
  }
});

numeral.locale('fr');
