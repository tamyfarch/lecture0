import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Input, Flex, Text } from 'native-base';
import { sendInstructionsToUser } from '../store/slice_recoverPassword';

const RecoverPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.recoverPassword.loading);
  const success = useSelector((store) => store.recoverPassword.success);

  const [email, setEmail] = useState('');

  return (
    <Flex>
      <Box p="4">
        <Input
          value={email}
          isRequired
          autoCompleteType="email"
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={setEmail}
        />
        <Button
          mt="2"
          mb="4"
          isDisabled={email == '' || loading}
          isLoading={loading}
          onPress={() => dispatch(sendInstructionsToUser({ email }))}
        >
          {loading ? 'Loading..' : 'Send me instructions'}
        </Button>
        {success && <Text bold>Check your email for recovering your password...</Text>}
      </Box>
    </Flex>
  );
};
export default RecoverPassword;
