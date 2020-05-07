import React from 'react';
import MusicHall from './components/MusicHall'; 
import {Router, Scene} from "react-native-router-flux";
import Search from './components/Search';
import Singer from './components/Singer';
import SingerDetail from './components/SingerDetail';
import Ranking from './components/Ranking';
import RankingDetail from './components/RankingDetail';

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
          <Scene
            key="singer"
            component={Singer}
            hideNavBar
          />
          <Scene
            key="singerdetail"
            component={SingerDetail}
            hideNavBar
          />
          <Scene
            key="ranking"
            component={Ranking}
            hideNavBar
          />
          <Scene
            key="rankingdetail"
            component={RankingDetail}
            hideNavBar
          />
        </Scene>
      </Router>
  );
};

export default App;