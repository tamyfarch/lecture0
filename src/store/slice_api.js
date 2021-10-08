import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { deserialize } from '../serialization';
const baseUrl = 'https://wesave.elserver.xyz/api/v1/';

export const weSaveApi = createApi({
  reducerPath: 'weSaveApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { token, user } = getState().auth;
      if (user) {
        headers.set('x-user-token', token);
        headers.set('x-user-email', user.email);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => 'users',
      transformResponse: async (response) => {
        return await deserialize(response);
      },
    }),
    getGoalCategories: builder.query({
      query: () => 'goal-categories',
      transformResponse: async (response) => {
        return await deserialize(response);
      },
    }),
    getActivityGoals: builder.query({
      query: () => 'activity-goals',
      transformResponse: async (response) => {
        return await deserialize(response);
      },
    }),
  }),
});

export const { useGetUserQuery, useGetGoalCategoriesQuery, useGetActivityGoalsQuery } = weSaveApi;
