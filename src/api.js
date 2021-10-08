import axios from 'axios';
import FormData from 'form-data';
import { serialize } from './serialization';

const baseUrl = 'https://wesave.elserver.xyz';

export function postLogin(creds) {
  return axios.post(`${baseUrl}/api/v1/login`, creds);
}
export function postProfile(creds) {
  return axios.post(`${baseUrl}/api/v1/users/profile`, creds);
}

export function getProfile(creds) {
  return axios.get(`${baseUrl}/api/v1/user-profile`, creds);
}

export function postProfilePhoto(payload) {
  let localUri = payload.photo.localUri;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let data = new FormData();
  data.append('photo', { uri: localUri, name: filename, type });
  return axios.post(`${baseUrl}/api/v1/users/photo`, data, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data;`,
    },
  });
}

export function postSignUp(creds) {
  return axios.post(`${baseUrl}/api/v1/sign_up`, creds);
}

export function postRecoverPassword(email) {
  return axios.post(`${baseUrl}/api/v1/users/password`, email);
}

function buildHeaders(user) {
  return {
    'x-user-token': user?.authentication_token,
    'x-user-email': user?.email,
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': 'application/vnd.api+json',
  };
}

export function postActivityGoal(payload, auth) {
  const serialized = serialize('activity-goal', payload);

  return axios.post(`${baseUrl}/api/v1/activity-goals`, serialized, {
    headers: buildHeaders(auth.user),
  });
}

export function postMonetaryGoal(payload, auth) {
  const serialized = serialize('monetary-goal', payload);
  return axios.post(`${baseUrl}/api/v1/monetary-goals`, serialized, {
    headers: buildHeaders(auth.user),
  });
}
