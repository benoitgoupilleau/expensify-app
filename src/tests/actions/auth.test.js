import { login, logout } from '../../actions/auth';

import {
  LOGIN,
  LOGOUT
} from '../../actions/types';

test('should generate login action object', () => {
  const uid = '123abc';
  const action = login(uid);
  expect(action).toEqual({
    type: LOGIN,
    uid
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({ type: LOGOUT });
});
