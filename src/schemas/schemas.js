import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

export const logInSchema = yup.object().shape({
  checkEmail: yup.boolean(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  checkEmail: yup.boolean(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  password_confirmation: yup
    .string()
    .min(6)
    .required()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export const profileSchema = yup.object().shape({
  // firstName: yup.string().required(),
});

export const ActivityGoalSchema = yup.object().shape({
  name: yup.string().required('Required'),
  status: yup.number().min(0).max(1).required('Required'),
  desiredFrequency: yup.number().min(1).max(31).required('Required'),
  currentFrequency: yup.number().min(1).max(31).required('Required'),
  frequencyType: yup.number().min(0).max(2).required('Required'),
  averageCost: yup.number().required('Required'),
  goalCategoryId: yup.number().required('Required'),
  amount: yup.number().min(1).max(31).required('Required'),
  amountOfTime: yup.number().min(0).max(2).required('Required'),
});

export const MonetaryGoalSchema = yup.object().shape({
  name: yup.string().required('Required'),
  savingGoal: yup.number().min(1).max(100000).required('Required'),
  currentSavings: yup.number().lessThan(yup.ref('savingGoal')),
  amount: yup.number().lessThan(yup.ref('savingGoal')).required('Required'),
  frequencyType: yup.number().min(0).max(2).required('Required'),
  objectiveType: yup.number().min(0).max(2).required('Required'),
  approachType: yup.number().min(0).max(2),
  approachOther: yup.string(),
  methodType: yup.number().min(0).max(2).required('Required'),
});
