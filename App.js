import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, NavigatorIOS} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import OrderSummary from './components/OrderSummary';
import OrderbyProvinceScreen from './components/OrderbyProvinceScreen';

//Navigation Stack
const RootStack = createStackNavigator(
  {
    Home: OrderSummary,
    component: OrderbyProvinceScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
