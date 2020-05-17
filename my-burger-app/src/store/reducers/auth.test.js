import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer testing', () => {
  let wrapper;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('should set the token and user id on login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'some-token',
          localId: 'some-id',
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-id',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
