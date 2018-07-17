import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, NavigatorIOS} from 'react-native';
import { Constants } from 'expo';
import Table from 'react-native-simple-table';
import { createStackNavigator } from 'react-navigation';

class OrderbyProvinceScreen extends Component {

  render(){
    //data for table display
    const data = this.props.navigation.state.params.Parameters;
    const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: 100
    },
    {
      title: 'Price',
      dataIndex: 'total_price'
    },
    {
      title: 'Currency',
      dataIndex: 'currency'
    },
    ];

    return(
      <ScrollView>
        {Object.keys(data).map(key => {
          if (key !== 'null') {
            return (
              <View key={key}>
                <Text key={key} style={styles.subtitle}>
                  {key}
                </Text>
                  <Table height={40*(data[key].length+1)} columnWidth={80} columns={columns} dataSource={data[key]} />
              </View>
            );
          }
        })}
      </ScrollView>
    );
  }
}

export default OrderbyProvinceScreen;

const styles = StyleSheet.create({
  subtitle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000080',
  },
  paragraph: {
    margin: 10,
    fontSize: 16,
    textAlign: 'left',
    color: '#34495e',
  },
});
