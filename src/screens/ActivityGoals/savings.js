import { differenceInDays, differenceInWeeks, differenceInMonths, add, parseISO } from 'date-fns';

export const calculateEstimatedSavings = (values) => {
  const { desiredFrequency, currentFrequency, averageCost, amount, amountOfTime } = values;
  const amountOfTimeValues = ['days', 'weeks', 'months'];
  const frequencyTypeInNumber = ['daily', 'weekly', 'monthly'];

  const frequencyType =
    typeof values.frequencyType === 'number'
      ? values.frequencyType
      : frequencyTypeInNumber.indexOf(values.frequencyType);

  const startDate = values.startDate ? parseISO(values.startDate) : new Date();

  const endDate = values.endDate
    ? parseISO(values.endDate)
    : add(new Date(), {
        [amountOfTimeValues[amountOfTime]]: amount,
      });

  const goalDuration = {
    0: differenceInDays(endDate, startDate),
    1: differenceInWeeks(endDate, startDate),
    2: differenceInMonths(endDate, startDate),
  };

  const currentCost = averageCost * currentFrequency;
  const goal = averageCost * desiredFrequency;
  const saving = currentCost - goal;
  const estimatedSavings = saving * goalDuration[frequencyType];

  return estimatedSavings;
};
