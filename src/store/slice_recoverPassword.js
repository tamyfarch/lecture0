import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRecoverPassword } from '../api';

export const sendInstructionsToUser = createAsyncThunk('recoverPassword', async (email) => {
  await postRecoverPassword(email);
});

const recoverPasswordSlice = createSlice({
  name: 'recoverPassword',
  initialState: {
    errorMessage: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: {
    [sendInstructionsToUser.pending]: (state, action) => {
      state.loading = true;
      state.errorMessage = null;
    },
    [sendInstructionsToUser.rejected]: (state, action) => {
      console.log('ERROR', action);
      state.loading = false;
      state.errorMessage = 'An error occurred while trying to save the data.';
      state.success = false;
    },
    [sendInstructionsToUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.errorMessage = null;
    },
  },
});

export default recoverPasswordSlice;
