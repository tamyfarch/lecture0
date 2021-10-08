import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postMonetaryGoal } from '../api';

export const newMonetaryGoal = createAsyncThunk('monetaryGoal', async (values, thunkAPI) => {
  const { auth: user } = thunkAPI.getState();
  try {
    const response = await postMonetaryGoal(values, user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const monetaryGoalSlice = createSlice({
  name: 'monetaryGoal',
  initialState: {
    errorMessage: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: {
    [newMonetaryGoal.pending]: (state, action) => {
      state.loading = true;
      state.errorMessage = null;
    },
    [newMonetaryGoal.rejected]: (state, action) => {
      console.log('ERROR', action);
      state.loading = false;
      state.errorMessage = 'An error occurred while trying to save the data.';
      state.success = false;
    },
    [newMonetaryGoal.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.errorMessage = null;
    },
  },
});

export default monetaryGoalSlice;
