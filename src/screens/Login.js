import React, { useState } from 'react';
import { loginUser } from '../store/slice_auth';
import { loadProfile } from '../store/slice_profile';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Input, Text, HStack, Image, Pressable, ScrollView, NetInfo, AlertDialog } from 'native-base';
import bckgnd from '../assets/20210606_62833.png';
import logo from '../assets/logo-of.png';
import show from '../assets/showIcon.png';
import hideIcon from '../assets/hideIcon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { logInSchema }from '../schemas/schemas.js'

CheckConnectivity = () => {
  // For Android devices
  if (Platform.OS === "android") {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        Alert.alert("You are online!");
      } else {
        Alert.alert("You are offline!");
      }
    });
  } else {
    // For iOS devices
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }
};

handleFirstConnectivityChange = isConnected => {
  NetInfo.isConnected.removeEventListener(
    "connectionChange",
    this.handleFirstConnectivityChange
  );

  if (isConnected === false) {
    Alert.alert("You are offline!");
  } else {
    Alert.alert("You are online!");
  }
};

const wrongPassword = useSelector((state) => state.auth.wrongPassword);
console.log('wrongpasswork', wrongPassword);

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [hide, setHide] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormReady = () => {
    if (email == '' || password == '') {
      return false;
    }

    return true;
  };

  const iconButton = () => {
    if (hide) {
      return hideIcon;
    } else {
      return show;
    }
  };

  const doLogin = () => {
    if (isFormReady()) {
      const payload = {
        email: email,
        password: password,
      };
      if (CheckConnectivity()) {
        return () => {
          dispatch(loginUser(payload));
          dispatch(loadProfile());
        }
      }
      else {
        return this.CheckConnectivity(console.error('No internet connection'));
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={logInSchema}
      >
        {({ errors, touched }) => (
        <ImageBackground source={bckgnd} style={{ width: '100%', height: '100%' }}>
          <Image height="120" width="200" resizeMode="contain" alt="logo" mt="30" source={logo} />
          <Box paddingTop="5" marginTop="165" paddingBottom="3" paddingLeft="3" paddingRight="3" backgroundColor="white" opacity="80" justifyContent="center" alignContent="center">
            <Text fontSize="20" color="blueGray.500">
              Email
            </Text>
            <Input
              mb="5%"
              color="gray.300"
              fontSize="18"
              variant="underlined"
              keyboardType="email-address"
              autoCompleteType="email"
              autoCapitalize="none"
              placeholder="example@gmail.com"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <FormControl isInvalid={touched.password && errors.password}>
              <FormControl.Label my="5">
                <Text fontSize="20" color="blueGray.500">
                  Password
                </Text>
              </FormControl.Label>
              <Input
                fontSize="18"
                color="gray.300"
                variant="underlined"
                placeholder="**************"
                secureTextEntry={hide}
                value={password}
                onChangeText={(password) => setPassword(password)}
                InputRightElement={
                  <TouchableOpacity onPress={() => setHide(!hide)}>
                    <Image size="6" mr="1" resizeMode="contain" alt="button" source={iconButton} />
                  </TouchableOpacity>
                }
              />
              {touched.password && errors.password && (
                <FormControl.ErrorMessage ml="5">{errors.password}</FormControl.ErrorMessage>
              )}
              {wrongPassword && (
                <Text ml="5" color="red.500">
                  Wrong password
                </Text>
              )}
            </FormControl>
            <Text fontSize="20" color="blueGray.500">
              Password
            </Text>
            <Input
              fontSize="18"
              color="gray.300"
              variant="underlined"
              placeholder="**************"
              secureTextEntry={hide}
              value={password}
              onChangeText={(password) => setPassword(password)}
              InputRightElement={
                <TouchableOpacity onPress={() => setHide(!hide)}>
                  <Image size="6" mr="1" resizeMode="contain" alt="button" source={iconButton} />
                </TouchableOpacity>
              }
            />
            <Button variant="unstyled" onPress={() => navigation.navigate('RecoverPassword')} justifyContent="flex-end">
              <Text color='secondGray.500' fontFamily='OpenSans_400Regular' fontSize="17px">
                Forgot password?
              </Text>
            </Button>
            <Button
              opacity="100"
              color="darkYellow.500"
              disabled={!isFormReady() || loading}
              mb="2"
              mt="2"
              isLoading={loading}
              onPress={doLogin}
            >
              <Text color="white" fontFamily='OpenSans_400Regular' fontSize="24px">
                {loading ? 'Starting...' : 'Sign In'}
              </Text>
            </Button>

            <HStack space='4.5' justifyContent="center" alignItems="center">

              <Text color='secondGray.500' fontFamily='OpenSans_400Regular' fontSize="17px" alignItems="center" justifyContent="center">
                Create an
              </Text>
              <Pressable
                direction="row"
                colorScheme="gray"
                variant="unstyled"
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text fontFamily='OpenSans_700Bold' fontSize="17px" color='secondGray.500'>
                  Account
                </Text>
              </Pressable>
            </HStack>
            <HStack space='4.5' justifyContent="center" alignItems="center" paddingTop="3">
              <Text color='secondGray.500' fontFamily='OpenSans_400Regular' fontSize="10px" alignItems="center" justifyContent="center">
                All access and to, and use of this App is subject to
              </Text>
              <Pressable
                direction="row"
                colorScheme="gray"
                variant="unstyled"
                onPress={() => navigation.navigate(null)}
              >
                <Text fontFamily='OpenSans_700Bold' fontSize="10px" color='secondGray.500'>
                  Terms of Service
                </Text>
              </Pressable>
            </HStack>
            <Box justifyContent="center" alignItems="center">
              <Text color='secondGray.500' fontFamily='OpenSans_400Regular' fontSize="10px" alignItems="center">
                (c) YGS Incorporated. All Rights Reserved.
              </Text>
            </Box>
          </Box>
        </ImageBackground>
        )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
