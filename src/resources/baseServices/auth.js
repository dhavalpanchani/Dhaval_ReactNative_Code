import { callApiGet, callApiPost } from './baseApi';
import API from '../../constants/baseApi';

export const login = (data = {}) => callApiPost({ url: API.LOGIN, data });

export const register = (data = {}) => callApiPost({ url: API.REGISTER, data });

export const getUsersPostDetails = (data = {}) =>
  callApiGet({ url: API.GET_POST_DETAILS, data });
