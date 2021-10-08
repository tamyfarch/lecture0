import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postLogin, postSignUp } from '../api';
import { deserialize } from '../serialization';
import { AlertDialog } from 'native-base';

const storageKey = '@session';

export const loginUser = createAsyncThunk('loginUser', async (creds, { rejectWithValue }) => {
  try {
    const res = await postLogin(creds);
    if (res && res.data ) {
      const user = await deserialize(res.data);
      await AsyncStorage.setItem(storageKey, JSON.stringify(user));
      return user;
    }
  } catch (e) {
    console.log('Data not saved');
    return (
      <AlertDialog>
        <Text>
          Wrong password
        </Text>
      </AlertDialog>
    );
  }
});

// lee de localstorage el state
export const initAuth = createAsyncThunk('initAuth', async () => {
  const storageData = await AsyncStorage.getItem(storageKey);
  const payload = storageData ? JSON.parse(storageData) : null;
  return payload;
});

export const logout = createAsyncThunk('logout', async () => {
  await AsyncStorage.removeItem(storageKey);
});

export const signUpUser = createAsyncThunk('signUpUser', async (creds, { rejectWithValue }) => {
  let res2;
  try {
    res2 = await postSignUp(creds);
  } catch (e) {
    console.log(e.response, 'signup user response');
    return rejectWithValue(e.response.data);
  }

  try {
    if (res2 && res2.data) {
      AsyncStorage.setItem(storageKey, JSON.stringify(res2.data));
    }
  } catch (e) {
    console.log('Data not saved');
  }
  return res2.data;
});

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    initComplete: false, // determina si la app termino de cargar
    user: null,
    errorMessage: null,
    loading: false,
    isAuthenticated: false,
    token: null,
  },
  reducers: {},
  extraReducers: {
    [logout.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    [initAuth.fulfilled]: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.token = action.payload.authenticationToken;
        state.isAuthenticated = true;
      }
      state.initComplete = true;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, action) => {
      console.log('error!', action);
      state.loading = false;
      state.errorMessage = 'Error logging in';
      state.errors = action.payload.errors;
      if (action.payload.errors.password[0].match('already')) {
        state.emailExistsError = true;
      } else {
        state.emailExistsError = false;
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      state.errorMessage = null;
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.authenticationToken;
      state.isAuthenticated = true;
      state.photo = action.payload.photo;
    },
    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload.errors;
      if (action.payload.errors.email?.length > 0 && action.payload.errors.email[0].match('already')) {
        state.emailExistsError = true;
      } else {
        state.emailExistsError = false;
      }
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.errorMessage = null;
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.auth_token;
      state.isAuthenticated = true;
    },
  },
});

export default loginSlice;
