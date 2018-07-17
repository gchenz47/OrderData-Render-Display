import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, NavigatorIOS} from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import _ from 'lodash';
import OrderbyProvince from './OrderbyProvince';
import OrderbyYear from './OrderbyYear';

//url to access the server data
const API_url = 'https://shopicruit.myshopify.com/admin/orders.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6';

class OrderSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      orderbyProvince: {},
      orderbyYear: {},
    };
  }

  async componentDidMount() {
    try{
      const req = await fetch(API_url);
      const data = await req.json();
      data.orders.forEach(order => {
        if (!_.has(order, 'billing_address')) {
          order.billing_address = {
            province: null,
          };
        }
      });
      //group data by province property
      const groupedbyProvince = await _.groupBy(
        data.orders,
        order => order.billing_address.province
      );
      //group data by created at year property
      const groupedbyYear = await _.groupBy(data.orders, order =>
        parseInt(order.created_at)
      );

      this.setState({
        data: data,
        orderbyProvince: groupedbyProvince,
        orderbyYear: groupedbyYear,
      });
    }catch (error) {
      console.error(error);
    }

  }

  render() {
    return (
      <ScrollView
        style={styles.container} >
        <Text style={styles.title}>Order Summary</Text>
        <OrderbyProvince getData={this.state.orderbyProvince} navigation={this.props.navigation}/>
        <OrderbyYear getData={this.state.orderbyYear}/>
      </ScrollView>
    );
  }
}

export default OrderSummary;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  title: {
    margin: 2,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
