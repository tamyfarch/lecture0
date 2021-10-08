import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { initAuth } from './store/slice_auth';
import { NativeBaseProvider } from 'native-base';
import { theme } from './theme';
import { AppNavigation } from './navigation/AppNavigation';
import { AppNavigationTab } from './navigation/AppNavigation';
import useFonts from './useFonts';

const MainApp = () => {
  const dispatch = useDispatch();
  const initComplete = useSelector((state) => state.auth.initComplete);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(initAuth());
  }, []);

  const isLoaded = useFonts();

  if (!initComplete || !isLoaded) {
    return <AppLoading />;
  }

  if (!isAuthenticated) {
    return (
      <NativeBaseProvider theme={theme} config={{ strictMode: 'off' }}>
        <AppNavigation />
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider theme={theme} config={{ strictMode: 'off' }}>
        <AppNavigationTab />
      </NativeBaseProvider>
    );
  }
};

export default MainApp;
