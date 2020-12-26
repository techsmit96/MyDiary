import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login';
import Dashboard from '../../screens/Dashboard';
import {PrimaryTheme} from '../../styles/Themes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ViewDiaryItem from '../../screens/ViewDiaryItem';
import EditOrAddItem from '../../screens/EditOrAddItem';
import SideNavigation from '../../components/SideNavigation';

const Stack = createStackNavigator();

export enum ScreenNames {
  LOGIN = 'Login',
  DASHBOARD = 'Dashboard',
  VIEW_DIARY_ITEM = 'View Diary Item',
  EDIT_ADD_DIARY_ITEM = 'Add Or Edit Diary Item',
}

export const authStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.LOGIN}>
      <Stack.Screen name={ScreenNames.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export const appStack = () => {
  return (
    <>
    {/* <SideNavigation /> */}
      <Stack.Navigator
        initialRouteName={ScreenNames.DASHBOARD}
        screenOptions={{
          headerStyle: {
            backgroundColor: PrimaryTheme.$PRIMARY_COLOR,
            height: hp('7%'),
          },
          headerTitleStyle: {
            color: 'white',
          },
          title: 'My Diary',
        }}>
        <Stack.Screen name={ScreenNames.DASHBOARD} component={Dashboard} />
        <Stack.Screen
          options={{title: 'View', headerTintColor: 'white'}}
          name={ScreenNames.VIEW_DIARY_ITEM}
          component={ViewDiaryItem}
        />
        <Stack.Screen
          options={({route}) => {
            // we can write also (data)=>{data.route}
            return {
              title: (route.params as any).diaryItem ? 'Edit' : 'Add',
              headerTintColor: 'white',
            };
          }}
          name={ScreenNames.EDIT_ADD_DIARY_ITEM}
          component={EditOrAddItem}
        />
      </Stack.Navigator>
    </>
  );
};
// {title: 'Edit', headerTintColor: 'white'}
