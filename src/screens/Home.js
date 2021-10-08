import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Flex,
  Menu,
  HamburgerIcon,
  Image,
  Link,
  Box,
  Text,
  FlatList,
  Heading,
  ScrollView,
  Center,
  HStack,
} from 'native-base';
import { Pressable } from 'react-native';
import { useGetActivityGoalsQuery } from '../store/slice_api';
import { logout } from '../store/slice_auth';
import userImage from '../store/user.png';
import { calculateEstimatedSavings } from './ActivityGoals/savings';
import ActivityGoalIcon from '../svgs/ActivityGoalIcon';
import CheckListIcon from '../svgs/CheckListIcon';
import NotificationIcon from '../svgs/NotificationIcon';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, data: activityGoals = [], error } = useGetActivityGoalsQuery();

  const getJustOneName = (name) => {
    if (!name) {
      return '';
    }
    if (!name.includes(' ')) {
      return name;
    }
    return name.substring(0, name.indexOf(' '));
  };

  const doLogout = () => {
    dispatch(logout());
  };

  const doNewMonetaryGoal = () => {
    navigation.navigate('MonetaryGoal');
  };

  const doNewActivityGoal = () => {
    navigation.navigate('ActivityGoal');
  };

  const doProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScrollView bg="gray.500">
      {isLoading && (
        <Center>
          <Text>Loading..</Text>
        </Center>
      )}
      {!isLoading && (
        <Box flex="1" justify="center" rounded="lg">
          <Box bg="white" w="full" p="5%" borderBottomRadius={45}>
            <Flex direction="row" align="center" justifyContent="space-between">
              <Menu
                trigger={(triggerProps) => {
                  return (
                    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <HamburgerIcon />
                    </Pressable>
                  );
                }}
              >
                <Menu.Item>Example 1</Menu.Item>
                <Menu.Item>Example 2</Menu.Item>
                <Menu.Item>
                  <Link onPress={doLogout}>LOGOUT</Link>
                </Menu.Item>
              </Menu>
              <HStack alignItems="center">
                <Link onPress={doProfile}>
                  <Image
                    size="35"
                    alt="userPicture"
                    borderRadius="100"
                    source={user.photo !== null ? { uri: `data:image/png;base64,${user.photo}` } : userImage}
                    fallbackSource={userImage}
                  />
                </Link>
                <Link ml="4">
                  <NotificationIcon pending={true} iconHeight={32} iconWidth={32} />
                </Link>
              </HStack>
            </Flex>
            <Box pt="8" pl="5" pb="12">
              <Text fontSize="3xl" color="gray.200" fontFamily="montserrat">
                Hi {getJustOneName(user.name)},
              </Text>
              <Text fontSize="4xl" color="blueGray.500" fontWeight="semibold" fontFamily="montserrat">
                Welcome back
              </Text>
            </Box>
            <Flex direction="row" justify="center">
              <Button
                startIcon={<ActivityGoalIcon color="#E1DED3" iconWidth={36} iconHeight={36} />}
                bg="orange.500"
                size={'lg'}
                pr="7"
                pl="7"
                mr="1"
                onPress={doNewActivityGoal}
              >
                <Text color="blueGray.500" fontWeight="bold" fontFamily="montserrat">
                  Add {'\n'}Activity {'\n'}Goal
                </Text>
              </Button>
              <Button
                startIcon={<ActivityGoalIcon color="#AABC96" iconWidth={36} iconHeight={36} />}
                bg="green.300"
                size={'lg'}
                rounded="xl"
                pr="7"
                pl="7"
                ml="1"
                onPress={doNewMonetaryGoal}
              >
                <Text color="blueGray.500" fontWeight="bold" fontFamily="montserrat">
                  Add {'\n'}Monetary {'\n'}Goal
                </Text>
              </Button>
            </Flex>
            <Link>
              <Box borderRadius="6" bg="gray.500" w="full" py="4" mt="5" mb="3" alignItems="center" flexDirection="row">
                <CheckListIcon iconWidth={32} iconHeight={32} ml="4" />
                <Text flex="1" color="gray.200" fontSize="lg" textAlign="center">
                  What kind of spender am I?
                </Text>
              </Box>
            </Link>
          </Box>
          <Box pt="3" pl="2" pr="2">
            <Heading fontSize="13" color="gray.300" ml="5">
              List of Activities
            </Heading>
            <FlatList
              data={activityGoals}
              renderItem={({ item }) => (
                <Box my="1" mx="4" bg="white" rounded="xl" py="4" px="6">
                  <Text size="sm" color="black" mb="1">
                    {item.name}
                  </Text>
                  <Flex direction="row">
                    <Text bold flex="1" fontFamily="heading" fontSize="3xl" color="blueGray.500">
                      {calculateEstimatedSavings(item)} $
                    </Text>
                    <Text fontSize="sm">{Math.floor(Math.random() * (100 - 1)) + 1}% Left</Text>
                  </Flex>
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
          </Box>
        </Box>
      )}
    </ScrollView>
  );
};

export default Home;
