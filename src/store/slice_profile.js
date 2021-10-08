import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postProfile, getProfile } from '../api';
import { postProfilePhoto } from '../api';

const storageKey = '@session';

export const profileUser = createAsyncThunk('profileUser', async (creds) => {
  const res = await postProfile(creds);
  return res.data;
});

export const profilePhoto = createAsyncThunk('profilePhoto', async (creds) => {
  const res = await postProfilePhoto(creds);
  try {
    if (res && res.data) {
      AsyncStorage.setItem(storageKey, JSON.stringify(res.data));
    }
  } catch (e) {
    console.log('Data not saved');
  }
  return res.data;
});

export const loadProfile = createAsyncThunk('loadProfile', async () => {
  const res = await getProfile();
  try {
    if (res && res.data) {
      AsyncStorage.setItem(storageKey, JSON.stringify(res.data));
    }
  } catch (e) {
    console.log('Data not saved');
  }
  return res.data;
});

const ProfileSlice = createSlice({
  name: 'profileUser',
  initialState: {
    success: null,
    first_name: null,
    last_name: null,
    gender: null,
    phone_number: null,
    age_range: null,
    avatar: null,
  },
  reducers: {},
  extraReducers: {
    [profileUser.fulfilled]: (state, action) => {},
    [profilePhoto.pending]: (state, action) => {},
    [profilePhoto.rejected]: (state, action) => {
      console.log('error!', action);
    },
    [profilePhoto.fulfilled]: (state, action) => {},
    [loadProfile.fulfilled]: (state, action) => {
      state.first_name = action.payload.data[0].attributes['first-name'];
      state.last_name = action.payload.data[0].attributes['last-name'];
      state.gender = action.payload.data[0].attributes['gender'];
      state.phone_number = action.payload.data[0].attributes['phone-number'];
      state.age_range = action.payload.data[0].attributes['age-range'];
    },
  },
});

export default ProfileSlice;
