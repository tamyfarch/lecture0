import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postActivityGoal } from '../api';
import { format, add } from 'date-fns';

export const newActivityGoal = createAsyncThunk('activityGoal', async (values, thunkAPI) => {
  const { auth: user } = thunkAPI.getState();
  const amountOfTimeValues = ['days', 'weeks', 'months'];

  const { amount, amountOfTime, ...payload } = values;

  payload['startDate'] = format(new Date(), 'yyyy-MM-dd');
  payload['endDate'] = format(
    add(new Date(), {
      [amountOfTimeValues[amountOfTime]]: amount,
    }),
    'yyyy-MM-dd',
  );

  try {
    const response = await postActivityGoal(payload, user);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data);
  }
});

const activityGoalSlice = createSlice({
  name: 'activityGoal',
  initialState: {
    errorMessage: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: {
    [newActivityGoal.pending]: (state, action) => {
      state.loading = true;
      state.errorMessage = null;
    },
    [newActivityGoal.rejected]: (state, action) => {
      console.log('ERROR', action);
      state.loading = false;
      state.errorMessage = 'An error occurred while trying to save the data.';
      state.success = false;
    },
    [newActivityGoal.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.errorMessage = null;
    },
  },
});

export default activityGoalSlice;
