import React from 'react';
import { signUpUser } from '../store/slice_auth';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Input, Select, VStack, FormControl, ScrollView, Text, HStack, Center } from 'native-base';
import { Formik } from 'formik';
import { signUpSchema } from '../schemas/schemas';

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const emailExistsError = useSelector((state) => state.auth.emailExistsError);
  const loading = useSelector((state) => state.auth.loading);
  const gender = [{ gender: 'Male' }, { gender: 'Female' }];
  const age = [{ age: '<18' }, { age: '18 to 23' }, { age: '24 to 29' }, { age: '30 to 35' }];

  console.log('emailexist', emailExistsError);
  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          gender: '',
          name: '',
          email: '',
          phoneNumber: '',
          password: '',
          password_confirmation: '',
          age: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => dispatch(signUpUser(values))}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <VStack backgroundColor="white">
            <Text pl="4" size="10" fontFamily="heading" color="blueGray.500" my="10" mt="20">
              Create account
            </Text>
            <VStack width="50%" space="2">
              <Flex direction="row" justifyContent="space-between">
                <FormControl isInvalid={touched.firstName && errors.firstName}>
                  <FormControl.Label>
                    <Text pl="5" fontSize="xl" color="blueGray.500">
                      First Name
                    </Text>
                  </FormControl.Label>
                  <Input
                    ml="4"
                    width="90%"
                    fontSize="lg"
                    variant="underlined"
                    onBlur={handleBlur('firstName')}
                    placeholder="First Name"
                    onChangeText={handleChange('firstName')}
                    value={values.firstName}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormControl.ErrorMessage ml="4">{errors.firstName}</FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.lastName && errors.lastName}>
                  <FormControl.Label>
                    <Text fontSize="xl" ml="1" color="blueGray.500">
                      Last Name
                    </Text>
                  </FormControl.Label>
                  <Input
                    fontSize="lg"
                    ml="1"
                    width="90%"
                    variant="underlined"
                    onBlur={handleBlur('lastName')}
                    placeholder="Last Name"
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                    error={touched.lastName && errors.lastName}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormControl.ErrorMessage ml="2">{errors.lastName}</FormControl.ErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <Flex direction="row" justifyContent="space-between">
                <FormControl isInvalid={touched.phoneNumber && errors.phoneNumber}>
                  <FormControl.Label my="5">
                    <Text pl="5" fontSize="xl" color="blueGray.500">
                      Phone Number
                    </Text>
                  </FormControl.Label>
                  <Input
                    fontSize="lg"
                    ml="4"
                    width="90%"
                    variant="underlined"
                    onBlur={handleBlur('phoneNumber')}
                    placeholder="+1 (234) 56789"
                    onChangeText={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <FormControl.ErrorMessage ml="4">{errors.phoneNumber}</FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.gender && errors.gender}>
                  <FormControl.Label colorScheme="select.500" my="5">
                    <Text fontSize="xl" ml="2" color="blueGray.500">
                      Gender
                    </Text>
                  </FormControl.Label>
                  <Select
                    fontSize="lg"
                    ml="1"
                    width="90%"
                    selectedValue={values.gender}
                    variant="filled"
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
                  {touched.gender && errors.gender && (
                    <FormControl.ErrorMessage ml="4">{errors.gender}</FormControl.ErrorMessage>
                  )}
                </FormControl>
              </Flex>
            </VStack>
            <VStack width="90%">
              <FormControl isInvalid={touched.name && errors.name}>
                <FormControl.Label my="5">
                  <Text pl="5" fontSize="xl" color="blueGray.500">
                    Create a username
                  </Text>
                </FormControl.Label>
                <Input
                  fontSize="lg"
                  width="full"
                  ml="5"
                  variant="underlined"
                  onBlur={handleBlur('name')}
                  placeholder="username"
                  onChangeText={handleChange('name')}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <FormControl.ErrorMessage ml="5">{errors.name}</FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={touched.password && errors.password}>
                <FormControl.Label my="5">
                  <Text pl="5" fontSize="xl" color="blueGray.500">
                    Create a password
                  </Text>
                </FormControl.Label>
                <Input
                  fontSize="lg"
                  ml="5"
                  width="full"
                  size="lg"
                  variant="underlined"
                  onBlur={handleBlur('password')}
                  placeholder="***************"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <FormControl.ErrorMessage ml="5">{errors.password}</FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={touched.password_confirmation && errors.password_confirmation}>
                <FormControl.Label my="5">
                  <Text pl="5" fontSize="xl" color="blueGray.500">
                    Repeat password
                  </Text>
                </FormControl.Label>
                <Input
                  fontSize="lg"
                  ml="5"
                  width="full"
                  size="lg"
                  variant="underlined"
                  onBlur={handleBlur('password_confirmation')}
                  secureTextEntry={true}
                  placeholder="***************"
                  onChangeText={handleChange('password_confirmation')}
                  value={values.password_confirmation}
                />
                {touched.password_confirmation && errors.password_confirmation && (
                  <FormControl.ErrorMessage ml="5">{errors.password_confirmation}</FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={touched.email && errors.email}>
                <FormControl.Label my="5">
                  <Text pl="5" fontSize="xl" color="blueGray.500">
                    Email
                  </Text>
                </FormControl.Label>
                <Input
                  ml="5"
                  fontSize="lg"
                  width="full"
                  variant="underlined"
                  onBlur={handleBlur('email')}
                  placeholder="email"
                  placeholderTextColor="#AFAFAF"
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <FormControl.ErrorMessage ml="5">{errors.email}</FormControl.ErrorMessage>
                )}
                {emailExistsError && (
                  <Text ml="5" color="red.500">
                    This email has already been taken
                  </Text>
                )}
              </FormControl>
              <VStack width="50%">
                <Flex direction="row">
                  <FormControl>
                    <FormControl.Label my="5">
                      <VStack>
                        <Text colorScheme="blueGray" pl="5" fontSize="xl" color="blueGray.500">
                          Age range
                        </Text>
                        <Text pl="5" size="sm" color="gray.400">
                          (Optional)
                        </Text>
                      </VStack>
                    </FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Select
                      fontSize="lg"
                      ml="6"
                      colorScheme="darkGray.500"
                      my="5"
                      selectedValue={values.age}
                      variant="filled"
                      width="full"
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
              <VStack>
                <Flex direction="column">
                  <Center>
                    <Button
                      colorScheme="blueGray"
                      my="5"
                      w="101%"
                      ml="10"
                      isDisabled={!isValid}
                      isLoading={loading}
                      onPress={handleSubmit}
                    >
                      <Text fontSize="xl" color="white">
                        {loading ? 'Signing Up...' : 'Sign Up'}
                      </Text>
                    </Button>
                  </Center>
                </Flex>
              </VStack>
              <HStack>
                <Flex direction="row">
                  <Text ml="20" my="5" fontSize="lg" color="gray.500">
                    Already have an account?
                  </Text>
                  <Button colorScheme="gray" variant="unstyled" onPress={() => navigation.navigate('Login')}>
                    <Text fontFamily="bold" fontSize="lg" color="gray.500">
                      Log In
                    </Text>
                  </Button>
                </Flex>
              </HStack>
            </VStack>
          </VStack>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;
