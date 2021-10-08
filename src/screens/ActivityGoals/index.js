import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Button, Box, Input, Flex, Text, FormControl, VStack, Select, ScrollView, Center } from 'native-base';
import { ActivityGoalSchema } from '../../schemas/schemas';
import { calculateEstimatedSavings } from './savings';
import { useGetGoalCategoriesQuery } from '../../store/slice_api';
import IntegerInput from '../../components/IntegerInput';
import { newActivityGoal } from '../../store/slice_activityGoal';

const ActivityGoal = ({ navigation }) => {
  const statusValues = ['Active', 'Inactive'];
  const frequencyTypeValues = ['Daily', 'Weekly', 'Monthly'];
  const amountOfTimeValues = ['Day', 'Week', 'Month'];
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.activityGoal.loading);
  const [isValidSchema, setIsValidSchema] = useState('');
  const { isLoading, data: categories = [], error } = useGetGoalCategoriesQuery();

  const validatingSchema = async (values) => {
    if (await ActivityGoalSchema.isValid(values)) {
      return setIsValidSchema(true);
    }
  };

  const estimatedSavings = (values) => {
    validatingSchema(values);
    if (isValidSchema) {
      return calculateEstimatedSavings(values);
    }
    return 0.0;
  };

  const doSave = (values) => dispatch(newActivityGoal(values));

  const doHome = () => navigation.navigate('Home');

  return (
    <Formik
      initialValues={{
        desiredFrequency: 0,
        currentFrequency: 0,
        frequencyType: '',
        averageCost: 0,
        goalCategoryId: '',
        amount: '',
        amountOfTime: '',
        name: '',
        status: '',
      }}
      validationSchema={ActivityGoalSchema}
      onSubmit={(values) => doSave(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, isValid }) => (
        <ScrollView>
          {isLoading && (
            <Center>
              <Text>Loading..</Text>
            </Center>
          )}
          {!isLoading && (
            <VStack>
              <FormControl mb="5">
                <Text bold>About the activity</Text>
                <Input
                  variant="underlined"
                  onBlur={handleBlur('name')}
                  placeholder="Name of the activity"
                  onChangeText={handleChange('name')}
                  value={values.name}
                />
                {errors.name && <Text>{errors.name}</Text>}
              </FormControl>
              <VStack width="50%" space="2">
                <Flex direction="row" justifyContent="space-between">
                  <FormControl>
                    <Select
                      selectedValue={values.status}
                      variant="filled"
                      minWidth="50"
                      placeholder="Type of the activity"
                      onValueChange={(itemValue) => setFieldValue('status', itemValue)}
                    >
                      {statusValues.map((item, index) => (
                        <Select.Item key={index} label={item} value={index} />
                      ))}
                    </Select>
                    {errors.status && <Text>{errors.status}</Text>}
                  </FormControl>
                  <FormControl>
                    <Select
                      variant="filled"
                      minWidth="50"
                      selectedValue={values.goalCategoryId}
                      onValueChange={(itemValue) => setFieldValue('goalCategoryId', itemValue)}
                      placeholder="Category"
                    >
                      {categories.map((category) => (
                        <Select.Item key={category.id} label={category.name} value={category.id} />
                      ))}
                    </Select>
                    {errors.goalCategoryId && <Text>{errors.goalCategoryId}</Text>}
                  </FormControl>
                </Flex>

                <FormControl>
                  <Flex direction="row" justifyContent="space-between">
                    <FormControl.Label m="3">Average Cost</FormControl.Label>
                    <IntegerInput name="averageCost" ml="20" variant="underlined" />
                  </Flex>
                  {errors.averageCost && <Text>{errors.averageCost}</Text>}
                </FormControl>

                <FormControl>
                  <Flex direction="row" justifyContent="space-between">
                    <FormControl.Label m="3">Current Frequency</FormControl.Label>
                    <IntegerInput variant="outline" keyboardType="numeric" name="currentFrequency" />
                    <Select
                      variant="filled"
                      minWidth="150"
                      placeholder="Frequency"
                      selectedValue={values.frequencyType}
                      onValueChange={(itemValue) => setFieldValue('frequencyType', itemValue)}
                    >
                      {frequencyTypeValues.map((item, index) => (
                        <Select.Item key={index} label={item} value={index} />
                      ))}
                    </Select>
                  </Flex>
                  {errors.currentFrequency && <Text>{errors.currentFrequency}</Text>}
                  {errors.frequencyType && <Text>{errors.frequencyType}</Text>}
                </FormControl>
                <Text bold>Activity Goal</Text>
                <FormControl>
                  <Flex direction="row" justifyContent="space-between">
                    <FormControl.Label m="3">Goal</FormControl.Label>
                    <IntegerInput ml="3" variant="outline" keyboardType="numeric" name="desiredFrequency" />
                    <Select
                      variant="filled"
                      minWidth="150"
                      placeholder="Frequency"
                      selectedValue={values.frequencyType}
                      onValueChange={(itemValue) => setFieldValue('frequencyType', itemValue)}
                    >
                      {frequencyTypeValues.map((item, index) => (
                        <Select.Item key={index} label={item} value={index} />
                      ))}
                    </Select>
                  </Flex>
                  {errors.desiredFrequency && <Text>{errors.desiredFrequency}</Text>}
                  {errors.frequencyType && <Text>{errors.frequencyType}</Text>}
                </FormControl>

                <FormControl>
                  <Flex direction="row" justifyContent="space-between">
                    <FormControl.Label m="3">Duration</FormControl.Label>
                    <IntegerInput variant="outline" keyboardType="numeric" name="amount" />
                    <Select
                      variant="filled"
                      minWidth="150"
                      placeholder="Duration Goal"
                      selectedValue={values.amountOfTime}
                      onValueChange={(itemValue) => setFieldValue('amountOfTime', itemValue)}
                    >
                      {amountOfTimeValues.map((item, index) => (
                        <Select.Item key={index} label={item} value={index} />
                      ))}
                    </Select>
                  </Flex>
                  {errors.amountOfTime && <Text>{errors.amountOfTime}</Text>}
                  {errors.amount && <Text>{errors.amount}</Text>}
                </FormControl>
                <Flex direction="column" justifyContent="space-between">
                  <Text m="3">Estimated saving</Text>
                  <Box bg="grey" p="4">
                    <Text fontSize="md" fontWeight="bold" color="white">
                      {estimatedSavings(values)}$
                    </Text>
                  </Box>
                </Flex>
              </VStack>
              <Center>
                <VStack width="90%">
                  <Button mt="2" disabled={!isValid} isLoading={loading} onPress={handleSubmit}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                  <Button mt="2" onPress={doHome}>
                    Back
                  </Button>
                </VStack>
              </Center>
            </VStack>
          )}
        </ScrollView>
      )}
    </Formik>
  );
};
export default ActivityGoal;
