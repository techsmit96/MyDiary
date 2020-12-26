import * as React from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';

export interface Props {}
const Drawer = createDrawerNavigator();
const SideNavigation = (props: Props) => {
  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Dashboard} />
        
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
  );
};

SideNavigation.defaultProps = {};

export default SideNavigation;
