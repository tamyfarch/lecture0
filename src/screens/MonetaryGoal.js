import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import {
  Button,
  Box,
  Input,
  Flex,
  Text,
  FormControl,
  VStack,
  Select,
  ScrollView,
  Center,
  Icon,
  View,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addDays } from 'date-fns';
import { MonetaryGoalSchema } from '../schemas/schemas';
import { newMonetaryGoal } from '../store/slice_monetaryGoal';

const MonetaryGoal = ({ navigation }) => {
  const loading = useSelector((state) => state.monetaryGoal.loading);
  const dispatch = useDispatch();
  const [isValidSchema, setIsValidSchema] = useState('');
  const frequencyTypeValues = ['Daily', 'Weekly', 'Monthly'];
  const objectiveTypeValues = ['Purpose', 'Place', 'Thing'];
  const approachTypeValues = ['on my own', 'with a group', 'with a partner', 'other'];
  const methodMoneyValues = ['Physically put away', 'EFT', 'Auto-Pay'];

  const [startDate, setDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [modeStartDate, setModeStartDate] = useState('date');
  const [modeEndDate, setModeEndDate] = useState('date');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const defaultStartDate = new Date();
  const defaultEndDate = addDays(new Date(), 30);

  const showModeStartDate = () => {
    setShowStartDate(true);
    setModeStartDate('date');
  };

  const showModeEndDate = () => {
    setShowEndDate(true);
    setModeEndDate('date');
  };

  const handleStartDate = (setFieldValue, value) => {
    setShowStartDate(false);
    return setFieldValue('startDate', value.nativeEvent['timestamp']);
  };

  const handleEndDate = (setFieldValue, value) => {
    setShowEndDate(false);
    return setFieldValue('endDate', value.nativeEvent['timestamp']);
  };

  const showStartDateInString = (startDate) => {
    return startDate ? format(startDate, "MMM d',' yyyy") : format(defaultStartDate, "MMM d',' yyyy");
  };

  const showEndDateInString = (endDate) => {
    return endDate ? format(endDate, "MMM d',' yyyy") : format(defaultEndDate, "MMM d',' yyyy");
  };

  const typeOfValue = (setFieldValue, value) => {
    const valueInLowerCase = value.toLowerCase();
    return approachTypeValues.includes(valueInLowerCase)
      ? setFieldValue('approachType', approachTypeValues.indexOf(valueInLowerCase))
      : setFieldValue('approachOther', value);
  };

  const doSave = (values) => dispatch(newMonetaryGoal(values));

  return (
    <Formik
      initialValues={{
        name: '',
        savingGoal: '',
        currentSavings: 0,
        amount: 0,
        desiredFrequency: '',
        frequencyType: '',
        startDate: '',
        endDate: '',
        objectiveType: '',
        approachType: '',
        approachOther: '',
        methodType: '',
      }}
      validationSchema={MonetaryGoalSchema}
      onSubmit={(values) => doSave(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, isValid }) => (
        <ScrollView>
          <VStack>
            <FormControl mb={5}>
              <Input
                variant="underlined"
                onBlur={handleBlur('name')}
                placeholder="Goal Details"
                onChangeText={handleChange('name')}
                value={values.name}
              />
              {errors.name && <Text>{errors.name}</Text>}
            </FormControl>
            <FormControl>
              <Input
                // InputLeftElement={<Icon>0.0</Icon>}
                InputRightElement={<Text>0.0</Text>}
                keyboardType="numeric"
                onChangeText={handleChange('savingGoal')}
                value={values.savingGoal}
                placeholder="Savings Goals"
              />
              {errors.savingGoal && <Text>{errors.savingGoal}</Text>}
            </FormControl>
            {/* <VStack space="2"> */}
            {/* <Flex direction="row" justifyContent="space-between"> */}
            <FormControl>
              <Input
                InputRightElement={<Text>0.0</Text>}
                keyboardType="numeric"
                placeholder="Current Savings"
                onChangeText={handleChange('currentSavings')}
                value={values.currentSavings}
              />
              {errors.currentSavings && <Text>{errors.currentSavings}</Text>}
            </FormControl>
            <FormControl>
              <Select
                selectedValue={values.objectiveType}
                variant="filled"
                placeholder="Select a reason"
                minWidth={50}
                onValueChange={(itemValue) => setFieldValue('objectiveType', itemValue)}
              >
                {objectiveTypeValues.map((item, index) => (
                  <Select.Item key={index} label={item} value={index} />
                ))}
              </Select>
              {errors.objectiveType && <Text>{errors.objectiveType}</Text>}
            </FormControl>
            {/* </Flex> */}

            <FormControl>
              <Text>Start Date</Text>
              {!showStartDate && (
                <View>
                  <Button onPress={() => showModeStartDate()} backgroundColor="gray.300">
                    {values.startDate ? format(values.startDate, 'yyyy-MM-dd') : format(defaultStartDate, 'yyyy-MM-dd')}
                  </Button>
                </View>
              )}
              {showStartDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(value) => handleStartDate(setFieldValue, value)}
                />
              )}
            </FormControl>
            <FormControl>
              <Text>End Date</Text>
              {!showEndDate && (
                <View>
                  <Button onPress={() => showModeEndDate()} backgroundColor="gray.300">
                    {values.endDate ? format(values.endDate, 'yyyy-MM-dd') : format(defaultEndDate, 'yyyy-MM-dd')}
                  </Button>
                </View>
              )}
              {showEndDate && (
                <DateTimePicker
                  testID="dateTimePickerTwo"
                  value={endDate}
                  display="default"
                  onChange={(value) => handleEndDate(setFieldValue, value)}
                />
              )}
            </FormControl>
            {/* </VStack> */}
            <Box>
              <Text>
                {showStartDateInString(values.startDate)} - {showEndDateInString(values.endDate)}
              </Text>
            </Box>

            <Text>How & When I will Save</Text>
            <Box>
              <FormControl>
                <Input
                  keyboardType="numeric"
                  mx="3"
                  placeholder="Frecuency"
                  onChangeText={handleChange('desiredFrequency')}
                />
              </FormControl>
              <FormControl>
                <Select
                  variant="filled"
                  minWidth={150}
                  placeholder="Frequency Type"
                  selectedValue={values.frequencyType}
                  onValueChange={(itemValue) => setFieldValue('frequencyType', itemValue)}
                >
                  {frequencyTypeValues.map((item, index) => (
                    <Select.Item key={index} label={item} value={index} />
                  ))}
                </Select>
                {errors.frequencyType && <Text>{errors.frequencyType}</Text>}
              </FormControl>
              <FormControl>
                <Input
                  // InputLeftElement={<Icon>0.0</Icon>}
                  InputRightElement={<Text>0.0</Text>}
                  keyboardType="numeric"
                  onChangeText={handleChange('amount')}
                  value={values.amount}
                  placeholder="Amount per deposit"
                />
                {errors.amount && <Text>{errors.amount}</Text>}
              </FormControl>
              <FormControl>
                <Select
                  selectedValue={values.methodType}
                  variant="filled"
                  minWidth={50}
                  placeholder="Method money"
                  onValueChange={(itemValue) => setFieldValue('methodType', itemValue)}
                >
                  {methodMoneyValues.map((item, index) => (
                    <Select.Item key={index} label={item} value={index} />
                  ))}
                </Select>
                {errors.methodType && <Text>{errors.methodType}</Text>}
              </FormControl>
              <FormControl>
                <Input
                  onChangeText={(value) => typeOfValue(setFieldValue, value)}
                  placeholder="on my Own,with a group,with a partner,other"
                />
                {errors.approachType && <Text>{errors.approachType}</Text>}
                {errors.approachOther && <Text>{errors.approachOther}</Text>}
              </FormControl>
            </Box>
            <Center>
              <VStack width="90%">
                <Button mt={2} disabled={!isValid} isLoading={loading} onPress={handleSubmit}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </VStack>
            </Center>
          </VStack>
        </ScrollView>
      )}
    </Formik>
  );
};
export default MonetaryGoal;
