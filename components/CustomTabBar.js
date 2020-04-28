import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class CustomTabBar extends React.Component {
  render() {
    const { state } = this.props.navigation;
    const activeTabIndex = state.index;
    return (
      <View style={{flexDirection:'row',justifyContent:"space-around",alignItems:"center"}}>
        {
          state.routes.map(element => (
            <TouchableOpacity key={element.key} onPress={() => Actions[element.key]()}>
              <Text>{element.key}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}