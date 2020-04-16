import React from 'react';
import MusicHall from './components/MusicHall'; 
import {Router, Scene} from "react-native-router-flux";
import Search from './components/Search';

const App = () => {
  return (
      <Router>
        <Scene key="root">
          <Scene
            key="musicHall"
            component={MusicHall}
            hideNavBar
          />
          <Scene
            key="search"
            component={Search}
            hideNavBar
          />
        </Scene>
      </Router>
  );
};

export default App;