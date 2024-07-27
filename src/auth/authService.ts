/**
 * This file provides the services for login, logout and token
 * manipulation in the Local Storage
**/

import { api, api_auth } from "../lib/axios";
import { jwtDecode } from 'jwt-decode'

const API_URL = api_auth


export interface TokenResponse {
  exp: number
  iss: string
  sub: string
}


export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string
  fullName: string
}

export const register = async (registerRequest: RegisterRequest) => {
  const response = await api.post<RegisterResponse>(`${API_URL}/register`, registerRequest);
  localStorage.setItem('full_name', response.data.fullName)
  return response.data;
};

// Makes a request to the API (/auth/login) and expects the token as a response
export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>(`${API_URL}/login`, { email, password })  
  return response.data
}

// Get's the token from Local Storage, decodes it and gets the user's email
export const getUserEmail = () => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log(jwtDecode<string>(token));
    return jwtDecode<TokenResponse>(token)
  }
  return null
}

// Removes the token, loging the user out
export const logout = () => {
  localStorage.removeItem('token')
  delete api.defaults.headers.common['Authorization']
}
// Creates a token in the Local Storage
export const setToken = (token: string) => {
  localStorage.setItem('token', token)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);
