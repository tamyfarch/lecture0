import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import auth from './slice_auth';
import recoverPassword from './slice_recoverPassword';
import profileUser from './slice_profile';
import activityGoal from './slice_activityGoal';
import monetaryGoal from './slice_monetaryGoal';
import { weSaveApi } from './slice_api';
import Reactotron from '../ReactotronConfig';

export default configureStore({
  // devTools: true,
  enhancers: [Reactotron.createEnhancer()],
  reducer: {
    auth: auth.reducer,
    profileUser: profileUser.reducer,
    recoverPassword: recoverPassword.reducer,
    activityGoal: activityGoal.reducer,
    monetaryGoal: monetaryGoal.reducer,
    [weSaveApi.reducerPath]: weSaveApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weSaveApi.middleware),
});
