import { loginFail, loginStart, loginSuccess, logoutSuccess } from "./userRedux";
import { clearProducts } from './cartRedux';
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail());
  }
};

export const logout = (dispatch) => {
  dispatch(logoutSuccess());
  dispatch(clearProducts());
}