import moment from 'moment';

import {
  SET_TEXT_FILTER,
  SORT_BY_AMOUNT,
  SORT_BY_DATE,
  SET_START_DATE,
  SET_END_DATE
} from '../../actions/types';


import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: SET_START_DATE,
    startDate: moment(0)
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: SET_END_DATE,
    endDate: moment(0)
  });
});

test('should generate sort by amount action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: SORT_BY_AMOUNT
  });
});

test('should generate sort by date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: SORT_BY_DATE
  });
});

test('should setup text filter action object', () => {
  const action = setTextFilter('filter');
  expect(action).toEqual({
    type: SET_TEXT_FILTER,
    text: 'filter'
  });
});

test('should reset text filter action object', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: SET_TEXT_FILTER,
    text: ''
  });
});
