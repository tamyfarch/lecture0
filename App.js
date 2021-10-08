import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/index';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import MainApp from './src/MainApp';

if (__DEV__) {
  import('./src/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  return (
    <Provider store={store}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <MainApp />
      </TouchableWithoutFeedback>
    </Provider>
  );
}
