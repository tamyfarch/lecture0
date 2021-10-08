import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({}) // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1/,
    },
  }) // add all built-in react native plugins
  .connect(); // let's connect!

export default reactotron;
