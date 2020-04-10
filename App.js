import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import MusicHall from './components/MusicHall';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <MusicHall />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;