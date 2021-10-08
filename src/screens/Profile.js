import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {
  Button,
  Flex,
  Input,
  Center,
  Image,
  Actionsheet,
  useDisclose,
  VStack,
  FormControl,
  Select,
  ScrollView,
} from 'native-base';
import userImage from '../store/user.png';
import { profileUser, profilePhoto } from '../store/slice_profile';
import { Formik, validateYupSchema } from 'formik';
import { profileSchema } from '../schemas/schemas';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const gender = [{ gender: 'Male' }, { gender: 'Female' }];
  const age = [{ age: '<18' }, { age: '18 to 23' }, { age: '24 to 29' }, { age: '30 to 35' }];
  const [picker, setPicker] = useState({
    localUri: useSelector((state) =>
      state.auth.user.photo ? `data:image/jpeg;base64,${state.auth.user.photo}` : null,
    ),
  });
  const { isOpen, onOpen, onClose } = useDisclose();

  let openCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted == false) {
      alert('Permission to access camera is required');
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    setPicker({
      localUri: pickerResult.uri,
    });
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted == false) {
      alert('Permission to access camera is required');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    const tam = pickerResult.uri.split('.').length;
    setPicker({
      localUri: pickerResult.uri,
    });
  };

  const doSave = (values) => {
    const payload = {
      users: {
        user_profile_attributes: {
          first_name: values.firstName,
          last_name: values.lastName,
          gender: values.gender,
          phone_number: values.phoneNumber,
          age_range: values.age,
        },
      },
    };
    const payload_photo = {
      photo: picker,
    };
    dispatch(profileUser(payload));
    dispatch(profilePhoto(payload_photo));
  };

  const doHome = () => {
    navigation.dispatch(StackActions.replace('Home'));
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstName: useSelector((state) => state.profileUser.first_name),
          lastName: useSelector((state) => state.profileUser.last_name),
          gender: useSelector((state) => state.profileUser.gender),
          age: useSelector((state) => state.profileUser.age_range),
          phoneNumber: useSelector((state) => state.profileUser.phone_number),
        }}
        validationSchema={profileSchema}
        onSubmit={(values) => doSave(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
          <VStack>
            <Flex direction="column" width="full">
              <Center>
                <Button bg="#f2f2f2" onPress={onOpen}>
                  <Image
                    size="150"
                    alt="nativebase"
                    borderRadius="100"
                    source={picker.localUri !== null ? { uri: picker.localUri } : userImage}
                    fallbackSource={userImage}
                  />
                </Button>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content>
                    <Actionsheet.Item onPress={openCameraAsync}>Camera</Actionsheet.Item>
                    <Actionsheet.Item onPress={openImagePickerAsync}>Image Library</Actionsheet.Item>
                    <Actionsheet.Item onPress={onClose}>Exit</Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>
              </Center>
            </Flex>
            <Center>
              <VStack width="90%">
                <VStack width="45%" space="2">
                  <Flex direction="row" justifyContent="space-between">
                    <FormControl isInvalid={'firstName' in errors}>
                      <FormControl.Label>First Name</FormControl.Label>
                      <Input
                        variant="underlined"
                        onBlur={handleBlur('firstName')}
                        placeholder="First Name"
                        onChangeText={handleChange('firstName')}
                        value={values.firstName}
                      />
                    </FormControl>

                    <FormControl>
                      <FormControl.Label>Last Name</FormControl.Label>
                      <Input
                        variant="underlined"
                        onBlur={handleBlur('lastName')}
                        placeholder="Last Name"
                        onChangeText={handleChange('lastName')}
                        value={values.lastName}
                      />
                    </FormControl>
                  </Flex>
                  <Flex direction="row" justifyContent="space-between">
                    <FormControl>
                      <FormControl.Label>Phone Number</FormControl.Label>
                      <Input
                        variant="underlined"
                        onBlur={handleBlur('phoneNumber')}
                        placeholder="+1 (234) 56789"
                        onChangeText={handleChange('phoneNumber')}
                        value={values.phoneNumber}
                      />
                    </FormControl>

                    <FormControl>
                      <FormControl.Label>Gender</FormControl.Label>
                      <Select
                        selectedValue={values.gender}
                        variant="filled"
                        minWidth="200"
                        placeholder="Select"
                        onBlur={handleBlur('gender')}
                        onChangeText={handleChange('gender')}
                        value={values.gender}
                        onValueChange={handleChange('gender')}
                      >
                        {gender.map((item) => {
                          return <Select.Item label={item.gender} value={item.gender} />;
                        })}
                      </Select>
                    </FormControl>
                  </Flex>

                  <Flex direction="row" justifyContent="space-between">
                    <FormControl>
                      <FormControl.Label>Age range</FormControl.Label>
                      <FormControl.HelperText>(Optional)</FormControl.HelperText>
                    </FormControl>
                    <FormControl>
                      <Select
                        selectedValue={values.age}
                        variant="filled"
                        minWidth="200"
                        placeholder="30 to 35"
                        onBlur={handleBlur('age')}
                        onChangeText={handleChange('age')}
                        value={values.age}
                        onValueChange={handleChange('age')}
                      >
                        {age.map((item) => {
                          return <Select.Item label={item.age} value={item.age} />;
                        })}
                      </Select>
                    </FormControl>
                  </Flex>
                </VStack>
              </VStack>
            </Center>
            <Center>
              <VStack width="90%">
                <Button mt="2" isDisabled={!isValid} isLoading={loading} onPress={handleSubmit}>
                  {loading ? 'Save...' : 'Save'}
                </Button>
                <Button mt="2" isLoading={loading} onPress={() => navigation.navigate('Home')}>
                  {loading ? 'Back...' : 'Back'}
                </Button>
              </VStack>
            </Center>
          </VStack>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Profile;
