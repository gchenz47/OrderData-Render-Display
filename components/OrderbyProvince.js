import React, { Component } from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Table from 'react-native-simple-table';
import _ from 'lodash';

class OrderbyProvince extends Component {
//sort data in alphabetic order
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

  render() {
    const data = this.sortedData(this.props.getData);
    return (
      <ScrollView className="OrderbyProvince">
        <Text
          //navigate to display a new screen
          onPress={() => this.props.navigation.navigate('component', { Parameters: data })}
          style={styles.subtitle}>Order By Province</Text>
          {Object.keys(data).map(key => {
          if (key !== 'null') {
            return (
              <View key={key}>
                <Text key={key} style={styles.paragraph}>
                  {data[key].length} of orders from {key}
                </Text>
              </View>
            );
          }
        })}
      </ScrollView>
    );
  }
}

export default OrderbyProvince;


const styles = StyleSheet.create({
  subtitle: {
    margin: 10,
    fontSize: 28,
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
