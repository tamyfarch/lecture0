import React from 'react';
import { Input } from 'native-base';
import { useFormikContext } from 'formik';

const IntegerInput = ({ name, ...rest }) => {
  const { handleBlur, setFieldValue, values } = useFormikContext();

  return (
    <Input
      keyboardType="numeric"
      onBlur={handleBlur(name)}
      onChangeText={(value) => setFieldValue(name, parseInt(value))}
      placeholder="0"
      value={values[name]}
      {...rest}
    />
  );
};

export default IntegerInput;
