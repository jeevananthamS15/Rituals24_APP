import {api} from './api';

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  address?: string;
};

export const loginApi = async (
  payload: LoginPayload,
) => {
  const response = await api.post(
    '/auth/login/customer',
    payload,
  );

  return response.data;
};

export const signupApi = async (
  payload: SignupPayload,
) => {
  const response = await api.post(
    '/auth/signup/customer',
    payload,
  );

  return response.data;
};