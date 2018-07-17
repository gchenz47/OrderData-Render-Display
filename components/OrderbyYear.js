import React, { Component } from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';
import Table from 'react-native-simple-table'
import _ from 'lodash';

class OrderbyYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYearOrders: false,
    };
    this.onClickYear = this.onClickYear.bind(this);
  }

  sortedData(data) {
    if (!_.isEmpty(data)) {
      var ordered = {};
      _(data)
        .keys()
        .sort()
        .each(function(key) {
          ordered[key] = data[key];
        });
      return ordered;
    } else {
      return {};
    }
  }

  onClickYear() {
    this.setState({
      showYearOrders: !this.state.showYearOrders,
    });
  }



  render() {
    //data for table display
    const data = this.sortedData(this.props.getData);
    const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: 150
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

    return (
      <View className="OrderbyYear">
        <Text onPress={this.onClickYear} style={styles.subtitle}>Order By Year</Text>
        {Object.keys(data).map(key => {
          if (key !== 'null' && key === '2017') {
            return (
              <ScrollView key={key}>
                <Text key={key} style={styles.paragraph}>
                  {data[key].length} orders created in {key}
                </Text>
                  {this.state.showYearOrders ?
                    <Table height={40*(data[key].length+1)} columnWidth={60} columns={columns} dataSource={data[key]} />
                    : null}
              </ScrollView>
            );
          }
        })}
      </View>
    );
  }
}
export default OrderbyYear;

const styles = StyleSheet.create({
  subtitle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000080',
  },
  paragraph: {
    margin: 5,
    fontSize: 16,
    textAlign: 'left',
    color: '#34495e',
  },
});
